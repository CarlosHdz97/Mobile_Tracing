import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const auth = {
  state: {
    authenticate : false,
    jwt: 'aaaa',
    rol: [],
    permissions: []
  },
  mutations: {
    authentication(state, data){
      state.authenticate = data.auth;
      localStorage.setItem("authenticate",state.authenticate);
      state.token = data.token;
      localStorage.setItem("token",state.token);
      state.rol.unshift(data.rol);
      localStorage.setItem("rol",JSON.stringify(state.rol));
      state.permissions.unshift(data.permissions);
      localStorage.setItem("permissions",JSON.stringify(state.permissions));
    },
    deleteSession(state){
      state.authenticate = false;
      localStorage.removeItem("authenticate");
      state.token = ''; 
      localStorage.removeItem("token");
      state.rol = []; 
      localStorage.removeItem("rol");
      state.permissions = []; 
      localStorage.removeItem("permissions");
    }
  },
  actions: {
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
