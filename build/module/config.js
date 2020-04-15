const config = require( '../global/config' );

module.exports = {
	...config,
	output: {
		filename     : 'splide-extension-video.esm.js',
		library      : 'Splide',
		libraryTarget: 'umd',
	},
};