const config       = require( './config' );
const TerserPlugin = require( 'terser-webpack-plugin' );

module.exports = {
	...config,
	output      : {
		filename: 'splide-extension-video.min.js',
	},
	optimization: {
		minimize : true,
		minimizer: [ new TerserPlugin( {
			terserOptions  : {
				format: {
					comments: /^\**!|@preserve|@license|@cc_on/i,
				},
			},
			extractComments: false,
		} ) ],
	},
};