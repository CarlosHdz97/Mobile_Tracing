import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const auth = {
  state: {
    authenticate : false,
    jwt: '',
    rol: [],
    permissions: []
  },
  mutations: {

  },
  actions: {
    authentication(state, data){
      if(data!=''){
        state.authenticate = true;
        state.token = ''
      }
    }
  }
}

const mobile = {
  state: {
    modelo: '',
    serie: '',
    emei: '',
    accesorios:[],
    status: null
  },
  mutations: {

  },
  actions: {
    authentication(state, data){
      if(data!=''){
        state.authenticate = true;
        state.token = ''
      }
    }
  }
}

export default new Vuex.Store({
  modules: {
    auth: auth,
    mobile: mobile
  }
})
