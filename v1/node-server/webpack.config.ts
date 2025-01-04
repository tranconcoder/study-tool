import webpack from 'webpack';
import 'webpack-dev-server';
import path from 'path';

// Plugins
import NodemonPlugin from 'nodemon-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const config: webpack.Configuration = {
	target: 'node',
	watch: true,
	mode: 'development',
	devtool: 'inline-source-map',
	entry: './server.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	resolve: {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: ['.ts', '.js'],
		// Add support for TypeScripts fully qualified ESM imports.
		extensionAlias: {
			'.js': ['.js', '.ts'],
			'.cjs': ['.cjs', '.cts'],
			'.mjs': ['.mjs', '.mts'],
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new NodemonPlugin(),
		new CopyPlugin({
			patterns: [
				{
					from: path.join(__dirname, './src'),
					to: path.join(__dirname, './dist'),
					globOptions: {
						dot: true,
						gitignore: true,
						ignore: ['*.ts'],
					},
				},
			],
		}),
	],
};

export default config;
