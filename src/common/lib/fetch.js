import axios from 'axios'
import { Message } from 'element-ui'
import { urlParamsObj } from 'common/utils/urlUtils'

// defalut config
axios.defaults.timeout = 60000

// create axios instance
const instance = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

export default function(options, defalutOptions = {
  buid: true
}) {
  return new Promise((resolve, reject) => {
    const { buid } = urlParamsObj
    let { url } = options
    if (defalutOptions.buid) {
      if (options.method.toLowerCase() === 'post') {
        // 兼容lappAccess接口传参格式
        if (options.headers && options.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
          options.data += '&buid=' + buid
        } else {
          options.data.buid = buid
        }
      } else if (options.method.toLowerCase() === 'get') {
        url = url.indexOf('?') === -1 ? `${url}?buid=${buid}` : `${url}&buid=${buid}`
      }
    }

    instance({
      ...options,
      url
    }).then(resp => {
      const { data, status, request } = resp

      // 处理文件下载等情况
      if (status === 200 && request.responseType !== 'json' && data.toString() !== '[object Object]') {
        resolve(resp)
        return
      }

      if (/^true$/.test(data.success)) {
        // 成功处理
        resolve({
          ...data,
          success: true
        })
      } else {
        // 失败处理
        // 忽略系统级提示信息
        if (!options.ignoreSysMsg) {
          if ((data.errorCode !== 20000016)) {
            Message({
              type: 'error',
              message: data.error || '系统故障！'
            })
          }
        }
        reject({
          ...data,
          _o: options
        })
      }
    }).catch(error => {
      // 忽略系统级提示信息
      if (!options.ignoreSysMsg) {
        Message({
          type: 'error',
          message: error || '系统故障！'
        })
      }
      throw error
    })
  })
}
