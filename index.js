var through = require('through2');
var gutil = require('gulp-util');
var utils = require('uo-node-utils');
var cssbeautify = require('cssbeautify');
var PluginError = gutil.PluginError;
var opts, regexs;

const PLUGIN_NAME = 'gulp-rem-to-px-cleanup';

module.exports = function (userOpts) {
  opts = {
    trim: userOpts.trim || false,
    baseFontSize: userOpts.baseFontSize || 16
  };

  return through.obj(function (file, enc, cb) {
    if (!file.isBuffer()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Only buffers are supported!'));
      return cb();
    }

    file.contents = transform(file.contents);
    this.push(file);
    cb();
  });
};

function transform (file) {
  var atRules = [];
  var data = file.toString('utf8');

  regexs = {
    declaration: /(\S+(?:,?\s\S*)*?\s*\{)([\s\S]+?)\}+\s?}?/g,
    remValue: /(-?[0-9]?[.]?[0-9]*)(rem)/g,
    at: /(@[\s\S]+?{)([\s\S]+?\})([\s]+?)\}/g
  };

  data = storeAtRules(data);
  data = convert(data);
  data += atRules.join('\n');

  if (opts.format)
    data = cssbeautify(data, {
      indent: '  '
    });

  return new Buffer(data);
};

function storeAtRules (data) {
  return data.replace(regexs.at, function (base, selecteurs, declarations) {
    selecteurs = toPx(selecteurs);
    declarations = convert(declarations);

    if (utils.trim(declarations).length)
    atRules.push(selecteurs + declarations + '\n}');

    return '';
  });
};

function convert (data) {
  return data.replace(regexs.declaration, function (base, selecteurs, declarations) {
    declarations = filter(declarations);
    declarations = toPx(declarations);

    if (!utils.trim(declarations).length)
    return '';

    return selecteurs + '\n' + declarations + '\n}';
  });
};

function filter (declarations) {
  var arr = declarations.split('\n');

  arr = arr.filter(function (entry) {
    var hasREM = entry.indexOf('rem') !== -1;
    var isEmpty = utils.trim(entry).length

    return isEmpty && hasREM;
  });

  return arr.join('\n');
};

function toPx (str) {
  return str.replace(regexs.remValue, function (base, remValue) {
    return parseFloat(remValue * opts.baseFontSize) + 'px';
  });
};
