import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './route-config'
const { publicPath } = require('../../../../project.config')

Vue.use(Router)

const options = {
  base: publicPath,
  mode: 'hash',
  routes
}

const router = new Router(options)

export default router
