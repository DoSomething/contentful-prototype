const variables = require('./tailwind.variables');

module.exports = {
  theme: {
    ...variables,
    extend: {
      padding: {
        '1/4': '25%',
        '1/3': '33.333333333%',
        '1/2': '50%',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'active', 'hover', 'focus'],
    borderColor: ['responsive', 'active', 'hover', 'focus'],
    textColor: ['responsive', 'active', 'hover', 'focus'],
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.clear-both': {
          clear: 'both',
        },
        '.clear-left': {
          clear: 'left',
        },
        '.clear-right': {
          clear: 'right',
        },
        '.clear-none': {
          clear: 'none',
        },
        '.clip-padding-box': {
          backgroundClip: 'padding-box',
        },
        '.z-max': {
          zIndex: '10000',
        },
        '.z-500': {
          zIndex: '500',
        },
        '.z-1000': {
          zIndex: '1000',
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
