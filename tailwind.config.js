import colors from 'tailwindcss/colors';

module.exports = {
  purge: ['./**/*.html', './**/*.svelte'],

  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '767px',
      md: '992px',
      lg: '1280px',
      xl: '1850px'
    },

    colors: {
      ...colors,
      coolGray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        1000: '#e5e7eb'
      },
      transparent: '#00000000',

      gray: {
        ...colors.gray,
        softGray: '#e8e8e8',
        darkerGray: '#666767',
        commonGray: '#f3f4f6'
      },
      black: {
        light: '#e5e7eb',
        dark: '#000000',
        DEFAULT: '#000000'
      },
      blue: {
        ...colors.lightBlue,
        medium: '#0186D1',
        ctoBlue: '#2abaff'
      },
      red: {
        ...colors.red,
        light: '#900218',
        DEFAULT: '#ac1212',
        dark: '#900218'
      },
      pink: colors.fuchsia,
      indigo: colors.indigo,
      green: {
        light: '#195e1f',
        dark: '#195e1f',
        DEFAULT: '#043fa7'
      },

      white: {
        light: '#ffffff',
        dark: '#ffffff',
        DEFAULT: '#ffffff'
      }
    },

    fontFamily: {
      sans: ['futura-pt', 'sans-serif'],
      serif: ['futura-pt', 'serif']
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem'
      },
      colors: {
        bdaBlue: '#284b63'
      },
      width: {
        checkboxMd: '25px',
        sidebarDesktop: '300px',
        28: '7rem',
        32: '8rem',
        40: '10rem',
        44: '11rem',
        50: '50rem'
      },
      height: {
        checkboxMd: '25px',
        xxl: '600px',
        4: '45px',
        500: '500px',
        550: '550px',
        475: '475px',
        450: '450px',
        410: '410px',
        24: '6rem',
        50: '13rem',
        56: '14rem',
        60: '16rem',
        xl: '400px',
        lg: '250px',
        srpSearch: '55px',
        mdFormField: '50px',
        mdHomeSearchContainer: '90px',
        homeSearchDesktop: '148px',
        homeSearchMobile: '275px',
        srpBaseImageMd: '250px',
        srpBaseImageSm: '160px',
        mobileHomeSearchContainer: '500px',
        desktopHomeSearchContainer: '450px',
        screen: '100vh',
        largeCardImage: '188px',
        loadingLine: '25px'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms'), require('daisyui')],
  daisyui: {
    styled: true,
    themes: true,
    base: false,
    utils: true,
    logs: true,
    rtl: false
  }
};
