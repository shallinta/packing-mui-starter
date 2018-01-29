module.exports = {
  extends: [
    'eslint-config-qunar'
  ].map(require.resolve),
  rules: {
    'import/extensions': 0,
    'react/prefer-stateless-function': 0,
    'react/sort-comp': 0,
    'react/forbid-prop-types': 0,
    'jsx-a11y/label-has-for': 0
  }
};
