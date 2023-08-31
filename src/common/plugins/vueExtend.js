import { Message } from 'element-ui'

export default {
  install: function (Vue, options) {
    // 全局 toast
    Vue.prototype.$message = Message
    Vue.prototype.$pipe = new Vue()
  }
}
