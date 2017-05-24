const webpack = require('webpack');
const configure = require('@dosomething/webpack-config');
const path = require('path');

// Load any environment variables from `.env`.
require('dotenv').config();

// Configure Webpack using `@dosomething/webpack-config`.
module.exports = configure({
  entry: {
    app: './resources/assets/init.js',
  },
  output: {
    // Override output path for Laravel's "public" directory.
    path: path.join(__dirname, '/public/next/assets'),
  },

  module: {
    loaders: [
      { enforce: 'pre', test: /\.js$/, use: 'eslint-loader', exclude: /node_modules/ }
    ],
  },

  plugins: [
    // Inline Service URLs into the build.
    new webpack.DefinePlugin({
      services: {
        GLADIATOR_URL: JSON.stringify(process.env.GLADIATOR_URL) || null,
        NORTHSTAR_URL: JSON.stringify(process.env.NORTHSTAR_URL) || null,
        PHOENIX_URL: JSON.stringify(process.env.PHOENIX_URL) || null,
        PHOENIX_LEGACY_URL: JSON.stringify(process.env.PHOENIX_LEGACY_URL) || null,
        KEEN_PROJECT_ID: JSON.stringify(process.env.KEEN_PROJECT_ID) || null,
        KEEN_WRITE_KEY: JSON.stringify(process.env.KEEN_WRITE_KEY) || null,
        SIXPACK_ENABLED: JSON.stringify(process.env.SIXPACK_ENABLED) || false,
        SIXPACK_BASE_URL: JSON.stringify(process.env.SIXPACK_BASE_URL) || null,
        SIXPACK_COOKIE_PREFIX: JSON.stringify(process.env.SIXPACK_COOKIE_PREFIX) || null,
        SIXPACK_TIMEOUT: JSON.stringify(process.env.SIXPACK_TIMEOUT) || null,
      },
    }),
  ],
});
