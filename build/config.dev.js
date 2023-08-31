const { publicPath, devServerPort } = require('../project.config')

let target = 'https://dev.kdweibo.cn'
if (process.env.PROXY_ENV == 'devtest') {
  target = 'https://devtest.kdweibo.cn'
} else if (process.env.PROXY_ENV == 'private') {
  target = 'https://private.kdweibo.cn/'
} else if (process.env.PROXY_ENV == 'kdtest') {
  target = 'https://kdtest.kdweibo.cn/'
}

const config = {
  publicPath,
  devServer: {
    port: devServerPort,
    proxy: {
      '/': {
        target,
        changeOrigin: true,
        ws: true,
        autoRewrite: true,
        protocolRewrite: 'http',
        cookieDomainRewrite: {
          '*': ''
        },
        onProxyReq: (proxyReq) => {
          proxyReq.setHeader('accept-encoding', 'identity');
        },
        onProxyRes: (proxyResponse, req, res) => {
          if (proxyResponse.headers['set-cookie']) {
            const cookies = proxyResponse.headers['set-cookie'].map((cookie) => {
              return cookie.replace(/;secure/gi, '').replace(/;SameSite=\w+/gi, '')
            });
            proxyResponse.headers['set-cookie'] = cookies;
          }

          // 兼容接口重定向 res header location host错误问题
          var location = proxyResponse.headers['location']
          if (location) {
            location = location.replace(/\/\/localhost\//, `//${req.headers['host']}/`)
            location = location.replace(/^https/, 'http')
            proxyResponse.headers['location'] = location
          }

          const contentType = proxyResponse.headers['content-type']
          if (
            !/\/ticket\/terminal\/lappAccess/.test(req.url) &&
            (!contentType
              || (
                contentType.indexOf('text/') == -1
                && contentType.indexOf('javascript') == -1
              ))
          ) {
            return
          }

          const _write = res.write;
          const _end = res.end;

          var body = '';
          proxyResponse.on('data', function (data) {
            data = data.toString('utf-8');
            body += data;
          });
          res.write = () => { }
          res.end = (...endArgs) => {
            // 替换body的域名为localhost
            body = body.replace(new RegExp(target.replace(/([\:\/\.])/g, '\\$1'), 'g'), '')
            // body = body.replace(new RegExp(target.replace(/http[s]?:\/\//, '//'), 'g'), '/')
            res.setHeader('content-length', Buffer.byteLength(body))
            _end.apply(res, [body])
          }
        },
        headers: {
          referer: target
        },
      }
    }
  },
  configureWebpack: {
    devtool: 'eval-source-map'
  }
}

module.exports = config
