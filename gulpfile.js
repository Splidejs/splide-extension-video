'use strict';

/*
 * Dependencies.
 */
const gulp          = require( 'gulp' );
const rename        = require( 'gulp-rename' );
const sass          = require( 'gulp-sass' );
const sassGlob      = require( 'gulp-sass-glob' );
const postcss       = require( 'gulp-postcss' );
const autoprefixer  = require( 'autoprefixer' );
const cssnano       = require( 'cssnano' );
const webpackStream = require( 'webpack-stream' );

/*
 * Webpack config paths.
 */
const js = {
	global: {
		path: './build/global/config',
		dest: './dist/js',
	},
	minified: {
		path: './build/global/config-min',
		dest: './dist/js',
	},
	module: {
		path: './build/module/config',
		dest: './dist/js',
	},
};

/*
 * Path definitions.
 */
const css = {
	main: {
		path: './src/sass/splide-extension-video.scss',
		dest: './dist/css',
	},
};

/*
 * Build a script file.
 */
gulp.task( 'build:js', done => {
	Object.values( js ).forEach( settings => {
		webpackStream( { config: require( settings.path ) } )
			.pipe( gulp.dest( settings.dest ) );
	} );

	done();
} );

/*
 * Build sass files.
 */
gulp.task( 'build:sass', done => {
	Object.values( css ).forEach( settings => {
		gulp.src( settings.path )
			.pipe( sassGlob() )
			.pipe( sass() )
			.pipe( postcss( [
				cssnano( { reduceIdents: false } ),
				autoprefixer( { overrideBrowserslist: [ '> 5%' ] } )
			] ) )
			.pipe( rename( { suffix: '.min' } ) )
			.pipe( gulp.dest( settings.dest ) );
	} );

	done();
} );