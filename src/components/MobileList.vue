<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <p class="text-center text-info h2 mb-2 mt-3 mb-md-5">Inventario</p>
    <b-row align-h="center">
      <b-col md="12">
        <b-tabs content-class="mt-3" fill>
          <b-tab title="Telefonos" active>
            <b-col cols="12" class="text-right">
              <b-button-group>
                <b-button @click="addMobile" variant="info" size="lg">Añadir</b-button>
              </b-button-group>
            </b-col>
            <b-col>
              <!--<b-table striped hover :items="inventory" class="mt-4"></b-table>-->
            </b-col>
          </b-tab>
          <b-tab title="Accesorios">
            <b-col cols="12" class="text-right">
              <b-button-group>
                <b-button variant="info" size="lg">Añadir</b-button>
              </b-button-group>
            </b-col>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      addMobile(){
        this.$router.push({path :'inventory/create'});
      }
    }
  }
</script>