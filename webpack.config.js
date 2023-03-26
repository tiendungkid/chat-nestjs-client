const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'production',
	entry: {
		app: './src/index.tsx',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../chat-nest/public'),
		clean: false,
	},
	devtool: 'inline-source-map',
	devServer: {
		static: path.resolve(__dirname, '../chat-nest/public'),
		hot: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/static/index.html',
			filename: 'index.html',
			minify: true,
			cache: true,
			favicon: './src/static/logo.png'
		}),
	],
	module: {
		rules: [
			{
				test: /\.(js|tsx|ts)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							'@babel/preset-typescript',
						],
					},
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {outputStyle: 'expanded'}
						}
					}
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		modules: [
			path.join(__dirname, 'node_modules'),
			'src'
		]
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			filename: 'vendors.js'
		}
	}
}
