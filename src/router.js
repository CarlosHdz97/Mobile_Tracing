import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'
Vue.use(Router)

function beforeEnter (to, from, next) {
  let active = localStorage.getItem("authenticate");
  if(to.matched.some(record=>record.meta.reqAuth)){
    if(active){
      next()
    }else{
      next({path: '/'})
    }
  }else{
    next()
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/recoveryPassword',
      name: 'recoveryPassword',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/RecoveryPassword.vue')
    },
    {
      path: '/mobile',
      meta: {reqAuth: true},
      redirect: '/',
      beforeEnter : beforeEnter,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Mobile.vue'),
      children : [
        {
          path: '',
          component: () => import('./components/MobileList.vue')
        },
        {
          path: 'create',
          component: () => import('./components/MobileForm.vue')
        },
        {
          path: 'assign',
          component: () => import('./components/AssignMobileForm.vue')
        },{
          path: 'devolution',
          component: () => import('./components/DevolutionMobileForm.vue')
        }
      ]
    }
  ]
})
