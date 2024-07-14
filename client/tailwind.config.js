module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          100: '#e5f2ff',
          200: '#b3d7ff',
          300: '#80bcff',
          400: '#4da2ff',
          500: '#1a87ff',
          600: '#006ee6',
          700: '#0055b3',
          800: '#003d80',
          900: '#00254d',
        },
        red: {
          100: '#ffe7e5',
          200: '#ffb7b3',
          300: '#ff8680',
          400: '#ff564d',
          500: '#ff261a',
          600: '#e60c00',
          700: '#b30900',
          800: '#800700',
          900: '#4d0400',
        },
        green: {
          100: '#ebfaef',
          200: '#c2efce',
          300: '#9ae5ad',
          400: '#71da8c',
          500: '#49cf6b',
          600: '#30b651',
          700: '#258e3f',
          800: '#1a652d',
          900: '#103d1b',
        },
        brand: {
          300: '#8F8FF7',
          400: '#6A6AB8',
          500: '#6363ac',
          600: '#545491',
          700: '#3E3E6B',
        },
      },
      animation: {
        loading: 'rotate 1s linear infinite',
      },
    },
    fontFamily: {
      sans: ['Rubik', 'sans-serif'],
    },
  },
  plugins: [],
};
