import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vueExtend from 'common/plugins/vueExtend'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconcool/iconcool.css'
import 'common/styles/index.less'

Vue.use(vueExtend)

new Vue({
  render: (h) => h(App),
  router,
  store
}).$mount('#app')
