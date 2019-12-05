const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    screens: {
      xs: '360px',
      sm: '480px',
      md: '760px',
      lg: '960px',
      xl: '1060px',
      xxl: '1280px',
    },
    colors: {
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      gray: {
        '100': '#f6f6f6',
        '200': '#d7d7d7',
        '300': '#c8c8c8',
        '400': '#b9b9b9',
        '500': '#a9a9a9',
        '600': '#9a9a9a',
        '700': '#8a8a8a',
        '800': '#7b7b7b',
        '900': '#626262',
      },
      blue: {
        '100': '#86dfff',
        '200': '#6bd6ff',
        '300': '#52ccff',
        '400': '#3ac2ff',
        '500': '#23b7fb',
        '600': '#1a9adf',
        '700': '#127fbf',
        '800': '#0c659f',
        '900': '#074c80',
      },
      blurple: {
        '500': '#141493',
      },
      green: {
        '300': '#42d86f',
        '500': '#0cc242',
        '700': '#02983a',
      },
      orange: {
        '100': '#ff6e4a',
        '200': '#ff6640',
        '300': '#ff5e36',
        '400': '#ff562b',
        '500': '#ff4d22',
        '600': '#e5461e',
        '700': '#cc3e1b',
        '800': '#b33617',
        '900': '#992f14',
      },
      purple: {
        '100': '#c861ff',
        '200': '#c354ff',
        '300': '#be49fc',
        '400': '#ab42e3',
        '500': '#983ac9',
        '600': '#8433b0',
        '700': '#712c96',
        '800': '#5e247d',
        '900': '#4b1d63',
      },
      red: {
        '300': '#ff6d69',
        '500': '#ff4540',
        '700': '#bf3929',
      },
      teal: {
        '100': '#8cfff9',
        '200': '#66fff7',
        '300': '#40fff5',
        '400': '#35fcf2',
        '500': '#30e3da',
        '600': '#2ac9c1',
        '700': '#25b0a9',
        '800': '#209691',
        '900': '#1a7d78',
      },
      yellow: {
        '100': '#ffe894',
        '200': '#ffe27a',
        '300': '#ffdd61',
        '400': '#ffd747',
        '500': '#fcce2f',
        '600': '#e3bb29',
        '700': '#c9a624',
        '800': '#b09120',
        '900': '#967c1b',
      },
    },
    fontFamily: {
      'source-sans': [
        '"Source Sans Pro"',
        '"Helvetica Neue"',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
      'league-gothic': [
        '"League Gothic"',
        'Impact',
        '"Franklin Gothic Bold"',
        '"Arial Black"',
        'sans-serif',
      ],
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '18px',
      lg: '22px',
      xl: '28px',
      '2xl': '35px',
      '3xl': '44px',
      '4xl': '55px',
      '5xl': '69px',
      '6xl': '84px',
    },
    extend: {
      padding: {
        '1/4': '25%',
        '1/3': '33.333333333%',
        '1/2': '50%',
      },
    },
  },
  variants: {},
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
      };

      addUtilities(newUtilities);
    },
  ],
};
