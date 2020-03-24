/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    // We use this Apollo Gatsby "theme" to pre-render GraphQL
    // queries wherever possible.
    {
      resolve: 'gatsby-theme-apollo',
    },
    // We use PostCSS for Tailwind, Autoprefixer, & compiled imports.
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          require('postcss-import'),
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
  ],
};
