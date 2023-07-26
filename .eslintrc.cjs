/* eslint-env node */
module.exports = {
  root: true,
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unicorn'],
  rules: {
    'no-console': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'import/prefer-default-export': 'off',
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-await-in-loop': 'off',
  },
};
