const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const { baseWebpackConfig } = require('./webpack.base')
const { PATH, ENV, OUTPUT } = require('./index')

const baseConfig = baseWebpackConfig('node')

const ssrWebpackConfig = {
  ...baseConfig,

  // Target node
  target: 'node',

  // Use sourcemap for better tracing
  devtool: '#source-map',

  // SSR entry point
  entry: PATH.entry.ssr,

  externals: [
    nodeExternals({
      whitelist: [/\.css$/],
    }),
  ],

  // SSR output
  output: {
    ...baseConfig.output,
    path: OUTPUT.dist,
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
  },

  plugins: [
    // Define env variables
    new webpack.EnvironmentPlugin({ ...ENV, VUE_ENV: 'server' }),
    // Vue SSR client plugin
    new VueSSRServerPlugin({
      filename: OUTPUT.manifest.ssr,
    }),
  ],
}

module.exports = ssrWebpackConfig
