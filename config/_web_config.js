const { publicPath, devServerPort } = require('../project.config')

const DATA = {
  APP_NAME: {
    development: '云之家',
    production: '云之家',
    private: '${APPNAME}'
  },
  WEB_CONFIG_CDN: {
    development: '',
    production: '${PROTOCOL}://${CDN_HOST}',
    private: ''
  },
  CDN_ENTRY_PATH: {
    development: `http://localhost:${devServerPort}${publicPath}`,
    production: `\${PROTOCOL}://\${CDN_HOST}${publicPath}`,
    private: publicPath
  },
}


module.exports = function (item) {
  let ret = {}
  Object.keys(DATA).forEach((k) => {
    ret[k] = DATA[k][item]
  })
  return ret
}
