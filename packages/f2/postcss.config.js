const postcssPresetEnv = require('postcss-preset-env')
module.exports = {
  plugins: [postcssPresetEnv({
    browsers: [
      'Android >= 4.0',
      'iOS >= 8',
    ],
  })],
}
