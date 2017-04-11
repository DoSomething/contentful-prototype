var webpack = require('webpack');
var dotenv = require('dotenv').config();
var ManifestPlugin = require('webpack-manifest-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var configurator = require('@dosomething/webpack-config');

var config = configurator({
  entry: {
    'app': './resources/assets/init.js'
  },
});

// Override output path.
config.output.filename = '[name]-[hash].js';
config.output.path = './public/next/assets';

// Expose Service URLs
config.plugins.push(
  new webpack.DefinePlugin({
    'services': {
      'GLADIATOR_URL': JSON.stringify(process.env.GLADIATOR_URL) || null,
      'NORTHSTAR_URL': JSON.stringify(process.env.NORTHSTAR_URL) || null,
      'PHOENIX_URL': JSON.stringify(process.env.PHOENIX_URL) || null,
      'PHOENIX_LEGACY_URL': JSON.stringify(process.env.PHOENIX_LEGACY_URL) || null,
      'KEEN_PROJECT_ID': JSON.stringify(process.env.KEEN_PROJECT_ID) || null,
      'KEEN_WRITE_KEY': JSON.stringify(process.env.KEEN_WRITE_KEY) || null,
    }
  })
);

// Add revision hash to extracted CSS files.
config.plugins = config.plugins.filter(plugin => ! plugin instanceof ExtractTextPlugin);
config.plugins.push(new ExtractTextPlugin('[name]-[hash].css'));

config.plugins.push(new ManifestPlugin({
  fileName: 'rev-manifest.json',
}));


module.exports = config;
