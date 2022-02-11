import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/assets/icons/index'
// global css
import './assets/styles/index.scss'
import service from "@/utils/request";

Vue.config.productionTip = false
Vue.prototype.$request = service

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
