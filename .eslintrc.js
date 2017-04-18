module.exports = {
  'extends': '@dosomething/eslint-config',

  'rules': {
    // Allow `console.log` so we can include logging
    // in development builds.
    'no-console': 'off',

    // Require space before "!" unary operator to conform to
    // our PHP code style:
    'space-unary-ops': ['error', {
      words: true,
      nonwords: false,
      overrides: {
        '!': true,
      },
    }],

    // We prefer not to use the .jsx file extension.
    'react/jsx-filename-extension': 'off'
  }
};
