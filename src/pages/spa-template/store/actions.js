export const actStateA = ({ commit, state }, data) => {
  return new Promise((resolve, reject) => {
    // 获取数据相关逻辑
    commit('SET_STATE_X', data)
  })
}
