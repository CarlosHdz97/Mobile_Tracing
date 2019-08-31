<template>
    <b-row align-v="center"  align-h="center" style="min-height:80vh;">
      <b-col md="12" class="h2 text-dark text-center mb-4">Teléfonos</b-col>
      <Home class="col-md-6"/>
      <Telefono class="col-md-6"/>
    </b-row>
</template>

<script>
// @ is an alias to /src
import Home from '@/components/Home.vue'
import Telefono from '@/components/Telefono.vue'

export default {
  name: 'home',
  components: {
    Home,
    Telefono
  }
}
</script>
