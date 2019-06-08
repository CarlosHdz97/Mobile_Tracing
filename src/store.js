import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const auth = {
  state: {
    authenticate : false,
    jwt: '1111',
    rol: [],
    permissions: [],
    name: '',
    surname: ''
  },
  mutations: {
    authentication(state, data){
      state.authenticate = data.authenticate;
      localStorage.setItem("authenticate",state.authenticate);
      state.token = data.token;
      localStorage.setItem("token",state.token);
      state.rol.unshift(data.rol);
      localStorage.setItem("rol",JSON.stringify(state.rol));
      state.permissions.unshift(data.permissions);
      localStorage.setItem("permissions",JSON.stringify(state.permissions));
      state.name = data.name;
      localStorage.setItem("name",state.name);
      state.surname = data.surname;
      localStorage.setItem("surname",state.surname);
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
      state.name = '';
      localStorage.removeItem("name");
      state.surname = '';
      localStorage.removeItem("surname");
    },
    checkSession(state){
      let active = localStorage.getItem("authenticate");
      if(active){
        state.authenticate = localStorage.getItem("authenticate");
        state.jwt = localStorage.getItem("jwt");
        state.name = localStorage.getItem("name");
        state.surname = localStorage.getItem("surname");
      }
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
  }
}

export default new Vuex.Store({
  modules: {
    auth: auth,
    mobile: mobile
  }
})
