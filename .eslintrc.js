/*
 * @Author: your name
 * @Date: 2019-11-28 18:50:31
 * @LastEditTime: 2019-12-05 16:19:32
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \blog3.0\.eslintrc.js
 */
// const fabric = require('@umijs/fabric');

// module.exports = {
//   ...fabric.default,
//   rules: {
//     ...fabric.default.rules,
//     stylelint: false,
//   },
//   globals: {
//     ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
//     page: true,
//   },
// };

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'plugin:compat/recommended'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    APP_TYPE: true,
    page: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'import/no-unresolved': [
      2,
      {
        ignore: [
          '^@/',
          '^umi/',
          '^dva',
          '^assets/',
          '^pages/',
          '^components/',
          '^utils/',
          '^services/',
          '^models/',
          '^themes/',
        ],
      },
    ],
    'import/no-extraneous-dependencies': [0, { optionalDependencies: true, devDependencies: true }],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        labelComponents: [],
        labelAttributes: [],
        controlComponents: [],
        assert: 'either',
        depth: 25,
      },
    ],
    'linebreak-style': 0,
  },
  settings: {
    polyfills: ['fetch', 'promises', 'url'],
  },
};
