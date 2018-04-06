const webpack = require('webpack');
const configure = require('@dosomething/webpack-config');
const path = require('path');

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
    rules: [
      { enforce: 'pre', test: /\.js$/, use: 'eslint-loader', include: path.join(__dirname, '/resources/assets') },
    ],
  },

  resolve: {
    alias: {
      // HACK: This module's ES entry point causes a strange module
      // resolution error on Webpack 4. Forcing CJS fixes!
      '@researchgate/react-intersection-observer':
        '@researchgate/react-intersection-observer/lib/js',
    },
  },
});
