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
              <b-table striped hover :items="items" class="mt-4"></b-table>
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
        items: [
          { '# serie': 46554645, 'Modelo': 'Moto E5 plus', 'EMEI': 'werwe-788' },
          { '# serie': 46554645, 'Modelo': 'Moto E5 plus', 'EMEI': 'dqwdq-4488' },
          { '# serie': 21454654, 'Modelo': 'Moto E5', 'EMEI': 'wef-46465' },
          { '# serie': 89455465, 'Modelo': 'Moto E5 plus', 'EMEI': 'wefwefw6-fw' },
          { '# serie': 38465464, 'Modelo': 'Moto E5', 'EMEI': 'wefw-4698' }
        ]
      }
    },
    methods: {
      addMobile(){
        this.$router.push({path :'mobile/create'});
      }
    }
  }
</script>