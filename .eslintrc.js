module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': 'off',
    'class-methods-use-this': 'off',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'no-undef': 'warn',
    'max-classes-per-file': 'off',
    'no-param-reassign': 'off',
  },
  ignorePatterns: ['**/precompiled/*', 'handlebars.runtime.min.js']
};
