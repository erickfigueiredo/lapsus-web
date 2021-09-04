module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lemon: {
          100: '#CDFF41',
          200: '#DAFF42',
          300: '#E7FF43',
          400: '#E4EE3F',
          500: '#C0C835',
          600: '#8F9427',
          700: '#5D6119',
          800: '#4B4C13',
          900: '#2C2D0B',
        },
        cerulean: {
          100: '#E2E9F1',
          200: '#C4D2E3',
          300: '#A7BCD5',
          400: '#89A5C8',
          500: '#6C8FBA',
          600: '#5078AA',
          700: '#42648C',
          800: '#355070',
          900: '#2E4561',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
