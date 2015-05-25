var gulp = require('gulp');
var remToPx = require('../index.js');
var rename = require('gulp-rename');

gulp.task('default', function () {
	gulp.src(['app.css', 'app_2.css'])
		.pipe(remToPx({
			baseFontSize: 14
		}))
		.pipe(rename({
			suffix: '-ie'
		}))
		.pipe(gulp.dest('./'))
});
