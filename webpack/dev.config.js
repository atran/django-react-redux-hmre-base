var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var BundleTracker = require('webpack-bundle-tracker');
var ip = require('ip');

var config = require('./common.config.js');

var serverIp = 'localhost'; //ip.address();
var serverUrl = ['http://', serverIp, ':3000'].join('');

config.entry = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?' + serverUrl,
  'webpack/hot/only-dev-server',
  './../static/src/index'
];

config.devtool = 'eval-source-map';

config.stats = 'none';

// override django's STATIC_URL for webpack bundles
config.output.publicPath = serverUrl + '/static/bundles/';

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
  new BundleTracker({filename: './webpack-stats.json'}),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
]);

config.module.rules.push(
  {
    test: /\.s?css$/,
    loaders: [
      'style-loader',
      'css-loader?sourceMap',
      'resolve-url-loader',
      'postcss-loader?sourceMap',
      'sass-loader?sourceMap'
    ]
  }
);

module.exports = config;
