var path = require('path'),
	webpack = require('webpack'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	nodeExternals = require('webpack-node-externals'),// For excluding node_modules from bundle
	precss       = require('precss'),
	autoprefixer = require('autoprefixer'),


	/**
	 * Used by the ExtractTextPlugin in "plugins" for determining output location and name of the compiled css file
	 */
	NON_WORDPRESS_CLIENT = '../main.css';

require('core-js');

module.exports = {
	//target: 'node',
	context: path.join(__dirname,'./'),
	resolve: {
		// When requiring in a file, search scss
		modulesDirectories: ["scss"],
		extensions: ["",".scss"]
	},
	entry: {
		index: [
			__dirname + "/scss/main.scss"
		]
	},
	devtool: "source-map",
	output: {
		//path: __dirname + '/scripts/',//Absolute path
		//publicPath: '/scripts/',//on client, served from  e.g. /scripts/index.js
		//filename: "[name].js",
		sourceMapFilename: "[file].map"
	},
	module: {
		loaders: [
			/** SCSS compiling 7 css autoprefixing **/
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader?pack=cleaner!sass-loader?sourceMap=true&sourceMapContents=true')
			},

			/** URL loader for font includes **/
				{ test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
		]
	},
	postcss: function () {
		return {
			defaults: [precss, autoprefixer],
			cleaner:  [autoprefixer({browsers: ["last 2 versions"]})]
		};
	},
	plugins: [
		new ExtractTextPlugin(NON_WORDPRESS_CLIENT)
	]
};