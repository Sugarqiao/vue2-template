/**
 * 解析网页链接，生成参数表
 * @param {String} [url=location.href] 解析地址链接
 */
export function resolveUrlParams(url = location.href) {
  const search = url.slice(url.indexOf('?'))
  const regExp = /[^?&]*=[^#&]*/g
  const paramList = search.match(regExp) || []
  let params = {}

  for (let param of paramList) {
    const paramPair = param.split('=')
    params[paramPair[0]] = paramPair[1]
  }

  return params
}

export const urlParamsObj = resolveUrlParams()

export const urlParamsObj2Str = (urlParamsObj) => {
  const urlParamsArr = []
  for (const key in urlParamsObj) {
    if (Object.hasOwnProperty.call(urlParamsObj, key)) {
      const value = urlParamsObj[key]
      const paramStr = `${key}=${value}`
      urlParamsArr.push(paramStr)
    }
  }
  return urlParamsArr.join('&')
}
