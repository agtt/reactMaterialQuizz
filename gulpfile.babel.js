/* global process */

'use strict';

/**
 * NOTE :
 * 
 * 1- default task (sass compile and bundles js/css non minified )
 * $ gulp
 * 
 * 2- dist task (same as default except all minified)
 * $ gulp dist
 * 
 * 3- dev task (sass compile and jshint but no js bundle)
 * $ gulp dev
 * 
 */

import gulp         from 'gulp';
import react				from 'gulp-react';
import cache				from 'gulp-cached';
import jshint 			from 'gulp-jshint';
import jshintJsx    from  'jshint-jsx'
import eslint       from 'gulp-eslint';
import concat 			from 'gulp-concat';
import cssmin 			from 'gulp-cssmin';
import sass 				from 'gulp-sass';
import notify			  from 'gulp-notify';
import sourcemaps	  from 'gulp-sourcemaps';
import connect			from 'gulp-connect';
import childprocess from 'child_process';
import config 			from './src/gulp/gulpConfig';
   
const exec = childprocess.exec;

/**
 * SASS 2 CSS - no min
 */
gulp.task('app:sass', () => {	 		 
	gulp.src(config.css.sources, { cwd: config.base.root })
		.pipe(sass().on('error', notify.onError(error => 'Error: ' + error.message)))
		.pipe(concat(config.css.dest.filename))
		.pipe(gulp.dest(config.css.dest.dir, { cwd: config.base.root }));	 
 });
/**
 * SASS 2 CSS - min
 */
gulp.task('app:sass:min', () => {
	gulp.src(config.css.sources, { cwd: config.base.root })
		.pipe(sass().on('error', notify.onError(error => 'Error: ' + error.message)))
		.pipe(concat(config.css.dest.filename))
		.pipe(cssmin())         
		.pipe(gulp.dest(config.css.dest.dir, { cwd: config.base.root }));
});


/**
 * eslint JSX and ES6   - uses .eslintrc file
 */
gulp.task('eslint:jsx:es6', () => {
  return gulp.src(config.jsHint.sources)
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


/**
 * jspm bundle sfx (non minified)
 */
gulp.task('app:bundle:sfx', ['eslint:jsx:es6', 'app:sass'],  cb => {
  exec([
		'jspm bundle-sfx ', 
		config.jspm.main,
		' ',
		config.jspm.dest
	].join(' '), function (err, stdout, stderr) {
      cb(err);
			console.log(stdout);
  });
});
/**
 * jspm bundle sfx (minified)
 */
gulp.task('app:bundle:sfx:min', ['eslint:jsx:es6', 'app:sass'],  cb => {
  exec([
		'jspm bundle-sfx ', 
		config.jspm.main,
		' ',
		config.jspm.dest,
		' ',
		'--minify'
	].join(' '),  (err, stdout, stderr) => {
      cb(err);
			console.log(stdout);
  });
});



/**
 * default task
 */
gulp.task('default', [
  'eslint:jsx:es6', 
	'app:sass',
	'app:bundle:sfx',
]);


/**
 * dev task
 */
gulp.task('dev', [
	'eslint:jsx:es6', 
	'app:sass'
]);




/**
 * dist task
 */
gulp.task('dist', [
	'app:bundle:sfx:min',
]);


/**
 * server (other than jspm-server)
 */
gulp.task('connect', [], () => {
  connect.server({
    port: 8080,
    root: ['public', 'jspm_packages'],
  });
});

