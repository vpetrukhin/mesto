//Подключение плагинов
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

//Настройки
module.exports = {
  plugins: [
    autoprefixer,
    cssnano({ preset: 'default' })
  ]
};