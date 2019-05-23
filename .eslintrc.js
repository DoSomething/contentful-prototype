module.exports = {
  // Extend our DoSomething.org code style.
  // https://github.com/dosomething/eslint-config
  extends: ['@dosomething/eslint-config/browser', 'plugin:cypress/recommended'],

  plugins: ['cypress'],

  env: {
    'cypress/globals': true,
  },

  rules: {
    // Allowing 'object' since we've deemed that warning more of a nuisance.
    'react/forbid-prop-types': ['warn', { forbid: ['any', 'array'] }],

    // For now, disable the following linters:
    'jsx-a11y/click-events-have-key-events': 'off',
    'import/no-cycle': 'off',

    // Allow TypeScript's triple-slash directives:
    'spaced-comment': ['error', 'always', { markers: ['/'] }],

    // Don't complain about using devDependencies in tests:
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'resources/**/__tests__/*.js',
          'resources/**/*.test.js',
          'resources/**/*.spec.js',
          'cypress/**/*.js',
        ],
      },
    ],
  },
};
