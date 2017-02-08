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

config.devtool = 'cheap-module-source-map';

// override django's STATIC_URL for webpack bundles
config.output.publicPath = serverUrl + '/static/bundles/';

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
  new BundleTracker({filename: './webpack-stats.json'}),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
]);

config.module.rules.push(
  {
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap']
  }
);

module.exports = config;
