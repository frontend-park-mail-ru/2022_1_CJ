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
  },
  ignorePatterns: ['**/precompiled/*', 'handlebars.runtime.min.js']
};
