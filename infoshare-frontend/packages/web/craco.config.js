const path = require('path');
const rewireBabelLoader = require('craco-babel-loader');

module.exports = {
  plugins: [
    {
      plugin: rewireBabelLoader,
      options: {
        includes: [path.resolve(__dirname, '..', 'utils'), path.resolve(__dirname, '..', 'i18n')],
      },
    },
  ],
};
