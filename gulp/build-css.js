const { src, dest } = require( 'gulp' );
const sass         = require( 'gulp-dart-sass' );
const postcss      = require( 'gulp-postcss' );
const rename       = require( 'gulp-rename' );
const cssnano      = require( 'cssnano' );
const autoprefixer = require( 'autoprefixer' );

function buildCss() {
	return src( './src/css/index.scss' )
		.pipe( sass() )
		.pipe( postcss( [
			cssnano( { reduceIdents: false } ),
			autoprefixer(),
		] ) )
    .pipe( rename( 'splide-extension-video.min.css' ) )
    .pipe( dest( 'dist/css' ) );
}

exports.buildCss = buildCss;
