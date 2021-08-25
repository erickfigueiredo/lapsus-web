module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lemon: {
          100: '#C0C835',
          200: '#C0C835',
          300: '#C0C835',
          400: '#C0C835',
          500: '#C0C835',
          600: '#C0C835',
          700: '#C0C835',
          800: '#C0C835',
          900: '#C0C835',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
