// .eslintrc.js
module.exports = {
  root: true,
  env: {
    'node': true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    'parser': 'babel-eslint'
  },
  rules: {
    // 不能有未定义的变量
    'no-unused-vars': 'off',
    'no-debugger': process.env.NODE_ENV === 'development' ? 'off' : 'error'
  },
  globals: {
    qing: true
  }
}
