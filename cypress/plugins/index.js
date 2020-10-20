// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
//
// You can read more here:
// https://on.cypress.io/plugins-guide

const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const defaults = webpackPreprocessor.defaultOptions;

/**
 * Use our Babel preset when compiling Cypress test files.
 * @see https://git.io/JTRF1
 */
module.exports = on => {
  delete defaults.webpackOptions.module.rules[0].use[0].options.presets;
  on('file:preprocessor', webpackPreprocessor(defaults));
};
