const webpack = require('webpack')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const { baseWebpackConfig } = require('./webpack.base')
const { PATH, OUTPUT, ENV, getAssetPosixPath } = require('./index')

const baseConfig = baseWebpackConfig('client')

const SWPrecachePlugin = require('sw-precache-webpack-plugin')

const clientWebpackConfig = {
  ...baseConfig,

  // Souremap
  devtool:
    process.env.NODE_ENV === 'production'
      ? '#nosources-source-map'
      : '#cheap-module-eval-source-map',

  // Client entry point
  entry: PATH.entry.client,

  // Output paths
  output: {
    ...baseConfig.output,
    filename: getAssetPosixPath('js/[name].[chunkhash].js'),
    chunkFilename: getAssetPosixPath('js/[name].[chunkhash].js'),
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: PATH.nodeModules,
          name: 'vendor',
          enforce: true,
        },
        commons: {
          chunks: 'initial',
          minChunks: 3,
          name: 'commons',
          enforce: true,
        },
      },
    },
  },

  // Client plugins
  plugins: [
    // Define env variables
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${ENV.NODE_ENV}"`,
        VUE_ENV: `"client"`,
      },
    }),
    new VueSSRClientPlugin({
      filename: OUTPUT.manifest.client,
    }),
  ],
}

if (process.env.NODE_ENV === 'production') {
  clientWebpackConfig.plugins.push(
    new SWPrecachePlugin({
      cacheId: 'attest-maker-fe',
      filename: 'sw.js',
      verbose: process.env.NODE_ENV !== 'production',
      minify: process.env.NODE_ENV === 'production',
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
      staticFileGlobs: ['/static/**/*', '/dist/assets/**/*'],
      replacePrefix: '/dist',
      runtimeCaching: [
        {
          urlPattern: /^\/(assets\/images|static)\/.*/,
          handler: 'fastest',
        },
        {
          urlPattern: /^\/(assets\/js|assets\/css)\/.*/,
          handler: 'cacheFirst',
        },
        {
          default: 'networkFirst',
        },
      ],
    }),
  )
}

module.exports = clientWebpackConfig
