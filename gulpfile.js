
var gulp = require("gulp");
var ts = require("gulp-typescript");
var mocha = require('gulp-mocha');
var tsProject = ts.createProject("tsconfig.json");
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");
var path = require("path");

/* Test Tasks
WARNING:  GULP MOCHA task is a work in progress and currently has issue.
NPM Script "Test" (package.json) currently more reliable
 */
gulp.task('test', function(){
	return gulp.src('./test/**/*.ts')
	.pipe(tsProject()).js
	.pipe(gulp.dest('.'))
	.pipe(mocha({
		reporter: 'progress'
	}))
})

/* Cleanup the DIST folder before compiling */
gulp.task('clean', function(){
	return del('dist/**/*');
})

/* Compile the Typescript */
/* IMPORTANT: The Sourcemaps settings here are important or the sourcemap url and source path in the source
maps will not be correct and your breakpoints will not hit - this is especially important for subfolders in the dist folder   */
gulp.task('compile', ['clean'], function () {
var result = tsProject.src()
					.pipe(sourcemaps.init())
					.pipe(tsProject()).js
					.pipe(sourcemaps.write('.', {includeContent:false, sourceRoot: '.'})) 
					.pipe(gulp.dest('dist'));
});

/* The default task will allow us to just run "gulp" from the command line to build everything */
gulp.task('default', ['compile']);