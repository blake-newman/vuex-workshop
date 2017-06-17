const webpack = require('webpack')
const merge = require('webpack-merge')
const vueConfig = require('./vue-loader')
const base = require('./webpack.base')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const config = merge(base, {
  entry: {
    app: './src/entry/client.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig('client')
      },
      {
        test: /\.js$/,
        loader: `babel-loader?forceEnv=client`,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"',
      'process.env.PORT_HTTPS': JSON.stringify(process.env.PORT_HTTPS || 3443)
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return /node_modules/.test(module.context)
      }
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new VueSSRClientPlugin()
  ]
})

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'vuex-workshop',
      filename: 'service-worker.js',
      minify: true,
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst'
        },
        {
          urlPattern: '/checkout',
          handler: 'networkFirst'
        },
        {
          urlPattern: '/checkout/confirmation',
          handler: 'networkFirst'
        }
      ]
    })
  )
}

module.exports = config
