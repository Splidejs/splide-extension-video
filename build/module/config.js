const uglify  = require( 'uglifyjs-webpack-plugin' );

module.exports = {
	entry: './src/js/splide-extension-video.js',
	output: {
		filename     : 'splide-extension-video.js',
		library      : 'Splide',
		libraryTarget: 'umd',
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
	// plugins: [
	// 	new webpack.BannerPlugin( {
	// 		banner: require( '../banner' ),
	// 		raw   : true,
	// 	} ),
	// ],
	optimization: {
		minimize: false,
	},
	mode: 'production',
};