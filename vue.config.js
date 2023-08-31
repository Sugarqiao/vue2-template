// build配置 https://cli.vuejs.org/config/#configuration-reference
const merge = require('webpack-merge')
const config_base = require('./build/config.base')
const config_dev = require('./build/config.dev')
const config_prod = require('./build/config.prod')

const config = merge(
  config_base,
  process.env.NODE_ENV === 'development' ? config_dev : process.env.NODE_ENV === 'production' ? config_prod : {}
)

module.exports = config
