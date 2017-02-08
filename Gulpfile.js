var gulp = require('gulp');
var sass = require('gulp-sass');

var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

var input = './css/scss/**/*.scss';
var output = './css/';

var inputResume = './resume/css/scss/**/*.scss';
var outputResume = './resume/css/';


gulp.task('css-main', function() {
	return gulp
		.src(input)
		.pipe(sass().on('error', sass.logError))
		// .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest(output));
});

gulp.task('css-resume', function() {
    return gulp
        .src(inputResume)
        .pipe(sass().on('error', sass.logError))
        // .pipe(autoprefixer())
        // .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(outputResume));
});

//Watch Resume
gulp.task('css-resume-watch', ['css-resume'], function() {
    // watch for any changes
    return gulp.watch(inputResume,['css-resume']);
});

//Watch Main
gulp.task('css-main-watch', ['css-main'], function() {
    // watch for any changes
    return gulp.watch(input,['css-main']);
});

//Watch task
gulp.task('default', ['css-main'], function() {
	// watch for any changes
	return gulp.watch(input,['css-main']);
});

