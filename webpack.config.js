const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'production',
	entry: {
		app: './src/index.tsx',
	},
	devtool: 'inline-source-map',
	devServer: {
		static: './dist',
		hot: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
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
	output: {
		filename: 'app.bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
}
