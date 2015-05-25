# rem-to-px-cleanup for Gulp

## Example

#### Gulpfile.js

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



#### Input (app.css)

```css
.Component {
  width: 40rem;
  height: 20px;
  margin: 0 auto;
}

.Component-child {
  padding: 0 2rem;
  background-color: blue;
}

.OtherComponent {
  display: inline-block;
  width: 50%;
  margin: 0 auto;
}

@media screen and (max-width: 30rem) {
  .Component {
    width: 80%;
    padding: 1rem;
  }

  .Component-child {
    width: 100%;
    padding: 0;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
    width: 1rem;
  }

  100% {
    transform: rotate(360deg);
    width: 2rem;
  }
}

```



#### Output

```css
.Component {
  width: 560px;
}

.Component-child {
  padding: 0 28px;
}

@media screen and (max-width: 420px) {
  .Component {
    padding: 14px;
  }
}

@keyframes spin {
  0% {
    width: 14px;
  }

  100% {
    width: 28px;
  }
}
```

## Options

```js
{
  baseFontSize: 16 // number
}
```
