const uglify  = require( 'uglifyjs-webpack-plugin' );

module.exports = {
	entry: './build/global/global.js',
	output: {
		filename: 'splide-extension-video.min.js',
	},
	module: {
		rules: [
			{
				test   : /.js$/,
				loader : 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	optimization: {
		minimizer: [ new uglify() ],
	},
	mode: 'production',
};