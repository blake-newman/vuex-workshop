module.exports = {
  root: true,
  extends: ['plugin:vue/recommended', 'standard', 'prettier', 'prettier/standard'],
  rules: {
    // Checked via tsc
    'no-undef': 0,
    'no-unused-vars': 0,
    'no-use-before-define': 0,
    'no-useless-constructor': 0,
    'space-infix-ops': 0,
    'no-shadow-restricted-names': 0,
    camelcase: 0,

    // Vue
    'vue/html-self-closing': 0,
    'vue/attributes-order': 0,
    'vue/html-end-tags': 0,
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 3,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
  },
  plugins: ['json'],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module',
  },
}
