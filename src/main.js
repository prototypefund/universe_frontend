import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  applications: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

export const authBus = new Vue();
export const modalBus = new Vue();
export const applicationBus = new Vue();
export const alertBus = new Vue();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
