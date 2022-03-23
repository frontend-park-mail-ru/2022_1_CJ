module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-undef': 'warn',
    'no-unused-vars': ['warn'],
    'no-useless-escape': ['warn']
  },
  ignorePatterns: ['**/precompiled/*', 'handlebars.runtime.min.js']
};
