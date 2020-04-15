module.exports = {
	entry: './build/global/global.js',
	output: {
		filename: 'splide-extension-video.js',
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
		minimize: false,
	},
	mode: 'production',
};