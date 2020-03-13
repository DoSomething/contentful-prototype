/* eslint-disable no-param-reassign */

module.exports = {
  webpack(config, options) {
    const { isServer } = options;

    // Fix issue with Tailwind & server-side rendering. <https://git.io/JvK2b>
    config.node = {
      fs: 'empty',
    };

    // Add 'url-loader' for image and webfont imports:
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          fallback: require.resolve('file-loader'),
          publicPath: `/_next/static/chunks/assets/`,
          outputPath: `${isServer ? '../' : ''}static/chunks/assets/`,
        },
      },
    });

    return config;
  },
};
