const { generateThreadAndCacheLoaders } = require('./index')

function vueConfig(babelEnv) {
  const babelLoader = [
    ...generateThreadAndCacheLoaders(babelEnv, true),
    {
      loader: 'babel-loader',
      options: {
        forceEnv: babelEnv,
      },
    },
  ]

  return {
    // postcss options
    cssSourceMap: process.env.NODE_ENV !== 'production',
    loaders: {
      js: babelLoader,
      jsx: babelLoader,
    },
    // Support webpack loading svg sprites with use attribute
    transformToRequire: { img: 'src', image: 'xlink:href', use: 'xlink:href' },
  }
}

module.exports = {
  vueConfig,
}
