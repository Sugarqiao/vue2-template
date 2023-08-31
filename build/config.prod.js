const config = require('../config')
const publicPath = config.CDN_ENTRY_PATH + '/'

const conf = {
  publicPath: './' + publicPath,
  css: {
    extract: true
  },
}

module.exports = conf
