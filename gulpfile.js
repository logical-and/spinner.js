///
///  spinner.js
///
///  https://github.com/marando/zoomable.js/
///
///
///  Copyright (c) Ashley Marando
///  Released under the GNU2 license
///
///


var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var concat      = require('gulp-concat');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var header      = require('gulp-header');


/**
 * Builds the project.
 *
 *   1. Copy spinner.js to dist folder
 *   2. Create minified spinner.js
 *   3. Copies jQuery and spinner.min.js to the demo folder
 *
 */
gulp.task('build', function() {

  // Generate license header for minified file
  var bowerPkg = require('./bower.json');
  var banner   = '/*! spinner.js v<%= pkg.version %> | (c) Ashley Marando | ' +
                 'github.com/marando/spinner.js */\n';

	var js_src = 'src/**/*.js';  // JavaScript source folder
	var dist   = 'dist';         // Destination distribution folder

  gulp.src(js_src)
  	  .pipe(concat('spinner.js'))      // > Copy spinner.js to
  	  .pipe(gulp.dest(dist))					 //     the dist directory
  	  .pipe(rename('spinner.min.js'))  // > Rename to spinner.min.js
      .pipe(uglify())                  // > Minify
      .pipe(header(banner, {pkg: bowerPkg}))
      .pipe(gulp.dest(dist))           // > Save in dist folder
      .pipe(gulp.dest('demo/js/'));    // > Also save in demo/js folder

  // Make sure jQuery is in the demo folder
	gulp.src('node_modules/jquery/dist/jquery.min.js')
	  .pipe(gulp.dest('demo/js/'));

});

/**
 * Runs BrowserSync on the demo directory
 */
gulp.task('browser-sync', function() {

  browserSync.init({
    server: {
    	baseDir: "demo"
    },
    open: false  // Prevent browser from loading by default
  });

});

/**
 * Watches the demo directory for HTML changes and the src directory for
 * JavaScript changes then rebuilds the project and triggers a BrowserSync
 * reload.
 */
gulp.task('watch', ['browser-sync'], function () {

	// Files to watch
	var files = [
		'src/*.js',
    'demo/js/demo.js',
    'demo/js/examples.js',
		'demo/*.html'
	];

	// On change build project and reload BrowserSync
	gulp.watch(files, ['build', browserSync.reload]);

  // Inject CSS changes
  gulp.watch('demo/css/*.css', function() {
    gulp.src('demo/css/*.css')
        .pipe(browserSync.stream());
  });

});


