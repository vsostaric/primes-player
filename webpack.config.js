module.exports = {
	entry: './src/App.js',

	output: {
		path: 'public/build',
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.js/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]

	}
}