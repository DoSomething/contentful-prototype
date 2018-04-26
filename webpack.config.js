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
    publicPath: '/next/assets/',
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'eslint-loader',
        include: path.join(__dirname, '/resources/assets'),
      },
      {
        include: path.resolve('node_modules', 'date-fns'),
        // Fix incorrect 'sideEffects' flag in 'date-fns'.
        // <https://git.io/vpIaT>
        sideEffects: false,
      },
    ],
  },

  externals: {
    // Exclude dependency on Node.js 'buffer' module.
    buffer: 'root Buffer',
    // Exclude dependency on 'readable-stream' module.
    'readable-stream': 'root Stream',
  },

  // Remove unnecessary Node built-ins.
  node: {
    process: false,
    Buffer: false,
  },

  resolve: {
    alias: {
      // HACK: This module's ES entry point causes a strange module
      // resolution error on Webpack 4. Forcing CJS fixes!
      '@researchgate/react-intersection-observer':
        '@researchgate/react-intersection-observer/lib/js',
      // Force 'lodash-es' for tree-shaking Lodash:
      lodash: 'lodash-es',
    },
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
});
