"use strict";

var gulp         = require( 'gulp' ),
    concat       = require( 'gulp-concat' ),
    uglify       = require( 'gulp-uglify' ),
    rename       = require( 'gulp-rename' ),
    sass         = require( 'gulp-sass' )(require('sass')),
    cleanCSS     = require( 'gulp-clean-css' ),
    del          = require( 'del' );

var path = {
  SCSS_PUB        : 'scss/main.scss',
  CSS_DIR         : 'assets/css',
  JS_DIR          : 'assets/js',
  JS_FILES        : [],
  CSS_FILES       : 'assets',
};

/**
 * Public scripts
 */
gulp.task( 'concatScripts', function() {
  return gulp.src( path.JS_FILES )
    .pipe( concat( 'app.js' ) )
    .pipe( gulp.dest( path.JS_DIR ) );
});

/**
 * Public sass
 */
gulp.task( 'compileSass', function() {
  return gulp.src( path.SCSS_PUB )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( rename( 'styles.css' ) )
    .pipe( gulp.dest( path.CSS_DIR ) )
});

/**
 * Public css
 */
gulp.task( 'cc', gulp.series('compileSass', function() {
  return gulp.src( path.CSS_FILES )
    .pipe( cleanCSS( { compatibility: 'ie8' } ) )
    .pipe( concat( 'pub-styles.css' ) )
    .pipe( gulp.dest( path.CSS_DIR ) );
}));
