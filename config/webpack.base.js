const { PATH, OUTPUT, getAssetPosixPath, generateThreadAndCacheLoaders } = require('./index')
const { vueConfig } = require('./vue')

// Base webpack configuration
function baseWebpackConfig(babelEnv) {
  return {
    mode: process.env.NODE_ENV || 'development',

    // Default output configuration
    output: {
      path: OUTPUT.dist,
      publicPath: OUTPUT.public,
      filename: '[name].js',
      chunkFilename: '[name].js',
      globalObject: 'this',
    },

    // Webpack performance options
    performance: {
      hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
      maxEntrypointSize: 320000,
    },

    // Resolving strategies for files
    resolve: {
      extensions: ['.js', '.jsx', '.vue', '.css'],
      modules: [PATH.src, PATH.nodeModules],
    },

    // Defualt loaders for all targets
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          exclude: /node_modules/,
          options: vueConfig(babelEnv),
        },
        {
          test: /\.jsx?$/,
          exclude: [PATH.nodeModules],
          use: [
            ...generateThreadAndCacheLoaders(babelEnv, true),
            {
              loader: 'babel-loader',
              options: {
                forceEnv: babelEnv,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/,
          use: [
            ...generateThreadAndCacheLoaders(babelEnv, false),
            {
              loader: 'url-loader',
              options: {
                limit: 3000,
                name: '[name].[hash:7].[ext]',
                outputPath: getAssetPosixPath('images/'),
              },
            },
          ],
        },
      ],
    },
  }
}

module.exports = {
  baseWebpackConfig,
}
