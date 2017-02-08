var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleTracker = require('webpack-bundle-tracker');

var config = require('./common.config.js');

config.output.path = require('path').resolve('./static/dist');
config.output.publicPath = '//s3-us-west-2.amazonaws.com/app/public/';

config.plugins = config.plugins.concat([
  new CleanWebpackPlugin(['dist'], {
    root: process.cwd() + '/assets',
    verbose: true,
    dry: false
  }),

  new BundleTracker({filename: './webpack-stats-prod.json'}),

  // removes a lot of debugging code in React
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
  }}),

  new webpack.optimize.DedupePlugin(),

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
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: ['css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap']
  })
});

module.exports = config;
