var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var input = './css/scss/**/*.scss';
var output = './css/';


gulp.task('compile-css', function() {
	return gulp
		.src(input)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest(output));
});

//Watch task
gulp.task('default', ['compile-css'], function() {
	// watch for any changes
	return gulp.watch(input,['compile-css']);
});

