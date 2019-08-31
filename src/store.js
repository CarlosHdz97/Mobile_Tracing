import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const auth = {
  state: {
    authenticate : false,
    token: '',
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
        state.token = localStorage.getItem("token");
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
    id: null,
    modelo: '',
    serie: '',
    emei: '',
    accesorios:[],
    status: null
  },
  mutations: {
    storeMobileData(state, data){
      state.id = data.id;
      state.modelo = data.modelo;
      state.serie = data.serie;
      state.emei = data.emei;
      state.accesorios = data.accesorios.split(',');
      state.status = data.status;
    },
    deleteMobileData(state){
      state.id = null,
      state.modelo = '',
      state.serie = '',
      state.emei = '',
      state.accesorios = [],
      state.status = null
    }
  },
  actions: {
  }
}

const accesory = {
  state: {
    id: null,
    name: '',
    existencia: 0,
    stockMin: 0,
    stockMax: 0
  },
  mutations: {
    storeAccesoryData(state, data){
      state.id = data.id;
      state.name = data.name;
      state.existencia = data.existencia;
      state.stockMin = data.stockMin;
      state.stockMax = data.stockMax;
    },
    deleteAccesoryData(state){
      state.id = null,
      state.name = '',
      state.existencia = 0,
      state.stockMin = 0,
      state.stockMax = 0
    }
  },
  actions: {
  }
}

const user = {
  state: {
    available: [],
    disavailable: [],
    selected: []
  },
  mutations:{
    storeUserData(state, data){
      state.available = data.available;
      state.disavailable = data.disavailable;
    },
    storeSelectedData(state, data){
      state.selected = data;
    }
  }
}
export default new Vuex.Store({
  modules: {
    auth: auth,
    mobile: mobile,
    accesory: accesory,
    user: user
  }
})
