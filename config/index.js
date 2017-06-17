const path = require('path')

const root = path.join(__dirname, '..')
const src = path.join(root, 'src')
const nodeModules = path.join(root, 'node_modules')

const PATH = {
  root,
  src,
  nodeModules,

  entry: {
    client: path.join(src, 'entry', 'client.js'),
    ssr: path.join(src, 'entry', 'ssr.js'),
  },
}

const OUTPUT = {
  dist: path.join(root, 'dist'),
  assets: path.join(root, 'dist', 'assets'),
  service_worker: path.join(root, 'dist', 'sw.js'),
  manifest: {
    client: 'vue-client-manifest.json',
    ssr: 'vue-ssr-manifest.json',
  },

  index: path.join(root, 'dist', 'index.html'),
  static: path.join(root, 'static'),
  robots: path.join(root, 'static', 'robots.txt'),
  public: '/',
}

function getAssetPosixPath(subpath) {
  return path.posix.join('assets', subpath)
}

const NODE_ENV = process.env.NODE_ENV || 'development'
const CACHE_LOADER_DIRECTORY = path.join(PATH.nodeModules, '.cache', 'cache-loader')

function generateThreadAndCacheLoaders(babelEnv, enableThreading) {
  const loaders = []

  loaders.push({
    loader: 'cache-loader',
    options: {
      cacheIdentifier: `${NODE_ENV}:${babelEnv}`,
      cacheDirectory: CACHE_LOADER_DIRECTORY,
    },
  })

  if (enableThreading) {
    loaders.push('thread-loader')
  }

  return loaders
}

module.exports = {
  PATH,
  OUTPUT,
  ENV: { NODE_ENV },
  getAssetPosixPath,
  generateThreadAndCacheLoaders,
}
