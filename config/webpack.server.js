const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base')
const vueConfig = require('./vue-loader')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(base, {
  target: 'node',
  devtool: '#source-map',
  entry: './src/entry/server.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig('server')
      },
      {
        test: /\.js$/,
        loader: `babel-loader?forceEnv=server`,
        exclude: /node_modules/
      }
    ]
  },
  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: nodeExternals(),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"',
      'process.env.PORT_HTTPS': JSON.stringify(process.env.PORT_HTTPS || 3443)
    }),
    new VueSSRServerPlugin()
  ]
})
