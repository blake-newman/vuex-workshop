module.exports = {
  'custom-syntax': 'postcss-html',
  fix: true,
  extends: [
    'stylelint-config-standard',
    'stylelint-config-idiomatic-order',
    'stylelint-config-prettier',
  ],
  rules: {
    'no-empty-source': null,
    'custom-property-empty-line-before': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extend'],
      },
    ],
    'selector-type-no-unknown': null,
    'no-descending-specificity': null,
    'declaration-empty-line-before': null,
    'at-rule-name-space-after': null,
    'function-calc-no-unspaced-operator': null,
  },
}
