module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', '@stylistic/js'],

  rules: {
    'no-await-in-loop': 'error',
    'no-duplicate-imports': 'error',
    '@stylistic/js/no-trailing-spaces': 'error',
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'max-params': ['error', 4],
    'no-console': ['off'],
    '@stylistic/js/eol-last': ['error', 'always'],
    '@stylistic/js/max-len': ['error', {code: 80, comments: 65}],
    '@stylistic/js/no-multiple-empty-lines': ['error', {max: 2, maxEOF: 1}],
  },
}
