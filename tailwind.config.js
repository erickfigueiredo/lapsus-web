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
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
