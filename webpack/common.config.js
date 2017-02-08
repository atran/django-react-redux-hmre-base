var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  context: __dirname,

  entry: process.cwd() + '/static/src',

  output: {
    path: path.resolve('static/bundles/'),
    filename: "[name]-[hash].js",
  },

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
    new webpack.ProvidePlugin({
      'React':      'react',
      '_':          'lodash',
      'ReactDOM':   'react-dom',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
  ],

  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'babel-loader!svg-react'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=1000'
      },
      {
        test: /\.ttf?$/,
        loader: 'base64-font-loader'
      }
    ],
  },

  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
    },
    modules: ['../node_modules'],
    extensions: ['.js', '.jsx']
  }
};
