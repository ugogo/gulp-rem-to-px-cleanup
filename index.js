var gutil = require('gulp-util');
var through = require('through2');
var remToPx = require('rem-to-px-cleanup');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-rem-to-px-cleanup';

module.exports = function (userOpts) {
  userOpts.type = 'stream';

  var data;
  var converter = new remToPx(userOpts);

  return through.obj(function (file, enc, cb) {
    if (!file.isBuffer()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Only buffers are supported!'));
      return cb();
    }

    data = file.contents.toString('utf8');
    data = converter.convert(data);
    data = new Buffer(data);

    file.contents = data;

    this.push(file);
    cb();
  });
};
