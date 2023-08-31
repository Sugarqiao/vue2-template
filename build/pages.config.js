const { title } = require('../project.config')

module.exports = {
  index: {
    title,
    entry: "src/pages/index/main.js",
    template: "public/index.html",
    chunks: ['chunk-vendors', 'chunk-common', 'index'], // 默认值，chunks:['chunk-vendors', 'chunk-common', 'chunk-name']
  }
}
