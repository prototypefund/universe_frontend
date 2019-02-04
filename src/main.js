import Vue from 'vue'
import App from './App.vue'
import router from './router'

export const authBus = new Vue();
export const modalBus = new Vue();
export const applicationBus = new Vue();

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
