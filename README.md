# rem-to-px-cleanup for Gulp

## Example

```js
var gulp = require('gulp');
var remToPx = require('../index.js');

gulp.task('default', function () {
	gulp.src('app.css')
		.pipe(remToPx({
			baseFontSize: 14
		}))
		.pipe(gulp.dest('./'))
});
```

## Options

```js
{
  baseFontSize: 16 // number
}
```
