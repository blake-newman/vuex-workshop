module.exports = {
  extends: ['vue'],
  plugins: ['vue'],
  env: {
    es6: true,
    browser: true,
  },
  rules: {
    'no-var': 2,
    'prefer-const': 2,
    'object-curly-spacing': [2, 'always'],
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      ecmaVersion: 2017,
      experimentalObjectRestSpread: true,
    },
  }
}