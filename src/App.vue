<template>
  <div id="app" class="container-fluid">
    <b-row align-h="end">
      <b-col cols="6" md="2">
        <b-button pill variant="outline-info" class="mt-4"  v-if="authenticate" @click="logOut">Cerrar Sesión</b-button>
      </b-col>
    </b-row>
    <router-view/>
  </div>
</template>

<style>
  form{
    border-radius: 5px 5px 15px 15px;
    box-shadow: 0px 5px 15px #d6d6d6;
  }
</style>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  data(){
    return{
      authenticate : this.$store.state.auth.authenticate
    }
  },
  created(){
    this.recoverySessionData();
    this.validateSesion();
  },
  methods:{
    ...mapMutations(['authentication', 'deleteSession']),
    recoverySessionData(){
      let authenticate = JSON.parse(localStorage.getItem("authenticate"));
      let jwt = JSON.parse(localStorage.getItem("jwt"));
      let rol = JSON.parse(localStorage.getItem("rol"));
      let permissions = JSON.parse(localStorage.getItem("permissions"));
      console.log(authenticate);
      if(authenticate!=false){
        this.$store.state.auth.authenticate = authenticate; 
        this.$store.state.auth.jwt = jwt; 
        this.$store.state.auth.rol = rol; 
        this.$store.state.auth.permissions = permissions; 
        this.authenticate = authenticate;
      }
    },
    validateSesion(){
      this.authenticate = this.$store.state.auth.authenticate;
    },
    logOut(){
      this.$store.commit('deleteSession');
      this.validateSesion();
      this.$router.push({path:'/'});
    }
  }
}
</script>
