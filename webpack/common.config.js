var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var BundleTracker = require('webpack-bundle-tracker');
var Dotenv = require('dotenv-webpack');

module.exports = {
  context: __dirname,

	entry: {
		main: path.join(__dirname, '../static/src/'),
	},

  output: {
    path: path.resolve('static/bundles/'),
    filename: "[name]-[hash].js",
  },

  plugins: [
		new Dotenv(),

		// Extract all 3rd party modules into a separate 'vendor' chunk
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function(module) {
				return /node_modules/.test(module.resource);
			}
		}),
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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
				query: {
					cacheDirectory: true, //speed boost
				},
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
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
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
