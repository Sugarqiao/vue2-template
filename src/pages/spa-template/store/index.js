import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import state from './state'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const store = new Store({
  state,
  getters,
  actions,
  mutations
})

export default store
