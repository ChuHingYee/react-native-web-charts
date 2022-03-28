const postcssPresetEnv = require('postcss-preset-env')
const autoprefixer = require('autoprefixer')
module.exports = {
  plugins: [autoprefixer, postcssPresetEnv({
    browsers: [
      'Android >= 4.0',
      'iOS >= 8',
    ],
  })],
}
