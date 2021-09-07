const { src, dest } = require( 'gulp' );
const sass         = require( 'gulp-dart-sass' );
const postcss      = require( 'gulp-postcss' );
const cssnano      = require( 'cssnano' );
const autoprefixer = require( 'autoprefixer' );

function buildCss() {
	return src( './src/css/splide-extension-video.scss' )
		.pipe( sass() )
		.pipe( postcss( [
			cssnano( { reduceIdents: false } ),
			autoprefixer(),
		] ) )
		.pipe( dest( 'dist/css' ) )
}

exports.buildCss = buildCss;
