module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'eslint-config-airbnb-base',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:import/recommended',
  ],
  rules: {
    'vue/component-definition-name-casing': 'off',
    'vue/component-name-in-template-casing': 'error',
    'newline-before-return': 'error',
    'import/prefer-default-export': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
