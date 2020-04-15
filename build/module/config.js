const config = require( '../global/config' );

module.exports = {
	...config,
	entry: './src/js/splide-extension-video.js',
	output: {
		filename     : 'splide-extension-video.esm.js',
		library      : 'Splide',
		libraryTarget: 'umd',
	},
};