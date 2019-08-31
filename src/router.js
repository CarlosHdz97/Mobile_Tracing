import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'
Vue.use(Router)


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
      path: '/welcome',
      name: 'welcome',
      component: () => import('./views/Welcome.vue')
    },
    {
      path: '/home',
      component: () => import('./views/Init.vue')
    },
    {
      path: '/user',
      name: 'users',
      component: () => import('./views/User.vue')
    },
    {
      path: '/inventory',
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
          path: 'createAccesory',
          component: () => import('./components/AccesoryForm.vue')
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
