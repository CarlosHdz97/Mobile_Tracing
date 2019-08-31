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
  form.form{
    border-radius: 5px 5px 15px 15px;
    box-shadow: 0px 5px 15px #d6d6d6;
  }
</style>

<script>
export default {
  data(){
    return{
    }
  },
  created(){
    this.recoverySessionData();
  },
  computed:{
    authenticate(){
      return this.$store.state.auth.authenticate;
    }
  },
  methods:{
    recoverySessionData(){
      this.$store.commit('checkSession');
    },
    logOut(){
      this.$store.commit('deleteSession');
      this.$router.push({path:'/'});
    }
  }
}
</script>
