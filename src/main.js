import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/fontawesome'
import './plugins/bootstrap-vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:8008'

Vue.use(VueAxios,axios)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
