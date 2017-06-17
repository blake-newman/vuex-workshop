module.exports = function ceateVueConfig (target) {
  return {
    preserveWhitespace: false,
    postcss: [
      require('autoprefixer')({
        browsers: ['last 3 versions']
      })
    ],
    loaders: {
      js: `babel-loader?forceEnv=${target}`
    }
  }
}
