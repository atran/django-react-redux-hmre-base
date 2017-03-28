var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleTracker = require('webpack-bundle-tracker');

var config = require('./common.config.js');

config.output.path = require('path').resolve('./static/dist');
config.output.publicPath = '/static/dist/';

config.plugins = config.plugins.concat([
  new CleanWebpackPlugin(['dist'], {
    root: process.cwd() + '/static',
    verbose: true,
    dry: false
  }),

  new BundleTracker({filename: './webpack-stats-prod.json'}),

  // removes a lot of debugging code in React
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
  }}),

  // minifies your code
  new webpack.optimize.UglifyJsPlugin({
    comments: false,
    compressor: {
      warnings: false
    }
  }),

  new ExtractTextPlugin({
    filename: 'main-[hash].css',
    allChunks: true
  })

]);

config.module.rules.push({
  test: /\.s?css$/,
  loader: ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
		loader: ['css-loader?sourceMap', 'resolve-url-loader', 'postcss-loader?sourceMap', 'sass-loader?sourceMap']
  }),
});

module.exports = config;
