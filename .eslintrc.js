module.exports = {
  env: {
    jest: true,
  },

  parser: 'babel-eslint',

  'extends': '@dosomething/eslint-config',

  'rules': {
    // Allow `console.log` so we can include logging
    // in development builds. Warn on `debugger`.
    'no-console': 'off',
    'no-debugger': 'warn',

    // For now, only warn on missing alt tags.
    'jsx-a11y/img-has-alt': 'warn',

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
