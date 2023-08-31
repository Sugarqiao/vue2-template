import Cookie from 'js-cookie'

const curNetworkId = Cookie.get('sync_networkid')
const curUserId = Cookie.get('sync_userid')

/**
 * 轮询检测是否切圈，重新刷新页面
 */
export function loopCheckNetworkChange (cb) {
  const check = () => {
    const sessionNetworkId = Cookie.get('sync_networkid')
    const sessionUserId = Cookie.get('sync_userid')

    if (
      (curNetworkId && curNetworkId != sessionNetworkId)
      || (curUserId && curUserId != sessionUserId)
    ) {
      if (cb) cb()
      clearInterval(timer)
      return
    }
  }

  const timer = setInterval(check, 2 * 1000)
  check()
}
