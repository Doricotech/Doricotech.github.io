module.exports = {
  purge: {
    enabled: true,
    content: ['./*.html', './js/*.js'],
  },
  // purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screen: {
        xs: '350px',
      },
      colors: {
        'primary-color': '#F53F85',
      },
      height: {
        hero: '50vh',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
