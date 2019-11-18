const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		d4: './index.js'
	},
	output: {
		filename: '[name].js', //-[hash]
		path: path.resolve(__dirname, "build"),
		publicPath: "build"
	},
	module: {
		rules: [{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				],
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['*', '.js']
	},
	performance: {
		hints: false
	},
	devtool: '#source-map'
}

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	])
}
