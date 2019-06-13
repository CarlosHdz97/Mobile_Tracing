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
router.beforeEach((to, from, next) => {
  let active = localStorage.getItem("authenticate");
  if((active && to.path!='/') || (!active && to.path=='/')){
    next()
  }else if(!active && to.path!='/'){
    next('/')
  }else{
    next('/inventory')
  }
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
