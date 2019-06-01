<template>
  <div id="app" class="container-fluid">
    <b-row align-h="end">
      <v-col cols="6" md="2">
        <b-button pill variant="outline-info" class="mt-4"  v-if="authenticate">Cerrar Sesión</b-button>
      </v-col>
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
export default {
  data(){
    return{
      authenticate : false
    }
  },
  created(){
    this.recoverySessionData()
    this.validateSesion()
  },
  mounted(){
  },
  methods:{
    recoverySessionData(){
      this.$store.state.auth.authenticate = false;
    },
    validateSesion(){
      this.authenticate = this.$store.state.auth.authenticate;
    }
  }
}
</script>
