module.exports = {
  plugins: [
    require('postcss-easy-import')(),
    require('postcss-custom-properties')({ preserve: true }),
    require('postcss-color-function')(),
    require('autoprefixer')(),
  ],
}
