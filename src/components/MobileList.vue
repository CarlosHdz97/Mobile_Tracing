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
              <b-row fluid class="p-4">
                <b-col md="6">
                  <b-form-group label-cols-sm="3" label="Buscador: ">
                    <b-input-group>
                      <b-form-input v-model="filter" placeholder="Ingrese algun dato"/>
                      <b-input-group-append>
                        <b-button :disabled="!filter" @click="filter = ''" variant="danger"><font-awesome-icon icon="trash-alt"/></b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label-cols-sm="3" label="Per page">
                    <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-table striped hover 
              :items="Mobiles" 
              :fields="fields" 
              :current-page="currentPage" 
              :per-page="perPage" 
              :filter="filter" 
              @filtered="onFiltered">
              <template slot="modelo" slot-scope="row">
                {{row.value}}
              </template>
              <template slot="serie" slot-scope="row">
                {{row.value}}
              </template>
              <template slot="emei" slot-scope="row">
                {{row.value}}
              </template>
              <template slot="accesorios" slot-scope="row">
                {{row.value}}
              </template>
              <template slot="status" slot-scope="row">
                {{row.value ? 'Asignado': 'Sin asignar'}}
              </template>
              <template slot="id" slot-scope="row">
                <b-button variant="primary" @click="editMobile(row.value)" class="mx-1"><font-awesome-icon icon="pencil-alt"/></b-button>
                <b-button variant="danger" @click="deleteMobile(row.value)"><font-awesome-icon icon="trash-alt"/></b-button>
                <b-button variant="dark" class="mx-1" v-b-modal.modal-mobile><font-awesome-icon icon="history"/></b-button>
              </template>
              </b-table>
              <b-modal id="modal-mobile" size="lg" title="Historico del teléfono">
                <p class="my-4">Número de serie:</p>
                <p class="my-4">Modelo:</p>
                <p class="my-4">IMEI:</p>
                <p class="my-4">Status:</p>
                <p class="my-4">Accesorios:</p>
                <p class="my-4">Operaciones:</p>
                
              </b-modal>
              <b-row>
                <b-col md="6" class="my-1">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    class="my-0"
                  ></b-pagination>
                </b-col>
              </b-row>
            </b-col>
          </b-tab>
          <b-tab title="Accesorios">
            <b-col cols="12" class="text-right">
              <b-button-group>
                <b-button @click="addAccesory" variant="info" size="lg">Añadir</b-button>
              </b-button-group>
            </b-col>
            <b-col>
              <b-row fluid class="p-4">
                <b-col md="6">
                  <b-form-group label-cols-sm="3" label="Buscador: ">
                    <b-input-group>
                      <b-form-input v-model="filter" placeholder="Ingrese algun dato"/>
                      <b-input-group-append>
                        <b-button :disabled="!filter" @click="filter = ''" variant="danger"><font-awesome-icon icon="trash-alt"/></b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label-cols-sm="3" label="Per page">
                    <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-table striped hover 
              :items="Accesory" 
              :fields="fieldsAccesory" 
              :current-page="currentPageAccesory" 
              :per-page="perPageAccesory" 
              :filter="filterAccesory" 
              @filtered="onFilteredAccesory">
              <template slot="name" slot-scope="row">
                {{row.value}}
              </template>
              <template slot="existencia" slot-scope="row">
                {{row.value}}
              </template>
              <template slot="stockMin" slot-scope="row">
                {{row.value}}
              </template>
              <template slot="stockMax" slot-scope="row">
                {{row.value}}
              </template>
              <template slot="id" slot-scope="row">
                <b-button variant="primary" @click="editAccesory(row.value)" class="mx-1"><font-awesome-icon icon="pencil-alt"/></b-button>
                <b-button variant="danger" @click="deleteAccesory(row.value)"><font-awesome-icon icon="trash-alt"/></b-button>
                <b-button variant="dark" @click="editMobile(row.value)" class="mx-1"><font-awesome-icon icon="history"/></b-button>
              </template>
              </b-table>
              <b-row>
                <b-col md="6" class="my-1">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    class="my-0"
                  ></b-pagination>
                </b-col>
              </b-row>
            </b-col>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapMutations} from 'vuex'
import Mobile from '../services/API/Mobile.js'
import Accesory from '../services/API/Accesory.js'
  export default {
    created(){
      this.getMobiles();
      this.getAccesory();
    },
    data() {
      return {
        fieldsAccesory: [{
            key: 'name',
            label : 'Nombre',
            sortable: true,
          },{
            key: 'existencia',
            label : 'Existencia',
            sortable: true,
          },{
            key: 'stockMin',
            label : 'Stock Mínimo',
            sortable: true,
          },{
            key: 'stockMax',
            label : 'Stock Máximo',
            sortable: true,
          },{
            key: 'id',
            label : 'Operaciones',
          }],
        fields: [{
            key: 'modelo',
            label : 'Modelo',
            sortable: true,
          },{
            key: 'serie',
            label : '# de serie',
            sortable: true,
          },{
            key: 'emei',
            label : 'IMEI',
            sortable: true,
          },{
            key: 'status',
            label : 'Status',
            sortable: true,
          },{
            key: 'accesorios',
            label : 'Accesorios',
            sortable: true,
          },{
            key: 'id',
            label : 'Operaciones',
          }],
        Accesory: null,
        Mobiles: null,
        totalRowsAccesory:1,
        totalRows:1,
        currentPageAccesory:1,
        currentPage:1,
        perPageAccesory: 5,
        perPage: 5,
        pageOptions:[5,10,15,20],
        filterAccesory: null,
        filter: null
      }
    },
    methods: {
      ...mapMutations(['storeMobileData', 'storeAccesoryData']),
      addMobile(){
        this.$router.push({path :'inventory/create'});
      },
      addAccesory(){
        this.$router.push({path :'inventory/createAccesory'});
      },
      getMobiles(){
        Mobile.tryget().then(res=>{
          this.Mobiles = res;
          this.totalRows = this.Mobiles.length;
        }).catch(err=>{
          console.log(err);
        });
      },
      getAccesory(){
        Accesory.tryget().then(res=>{
          this.Accesory = res;
          this.totalRowsAccesory = this.Accesory.length;
        }).catch(err=>{
          console.log(err);
        });
      },
      onFiltered(filteredItems){
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },
      onFilteredAccesory(filteredItems){
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },
      editMobile(id){
        Mobile.tryfind(id)
        .then(res=>{
          this.$store.commit('storeMobileData', res);
          this.addMobile();
        })
        .catch(err=>{
          console.log(err);
        });
      },
      editAccesory(id){
        Accesory.tryfind(id)
        .then(res=>{
          this.$store.commit('storeAccesoryData', res);
          this.addAccesory();
        })
        .catch(err=>{
          console.log(err);
        });
      },
      deleteMobile(id){
        let answer = window.confirm('¿Desea eliminar el articulo?');
        if(answer){
          Mobile.tryDelete(id).then(res=>{
            alert("Se ha eliminado el Teléfono con éxito");
              let element = this.Mobiles.filter( mobile =>{
                return mobile.id != id
              });
              this.Mobiles = element;
          }).catch(err=>{
            console.log(err);
          });
        }
      },
      deleteAccesory(id){
        let answer = window.confirm('¿Desea eliminar el articulo?');
        if(answer){
          Accesory.tryDelete(id).then(res=>{
            alert("Se ha eliminado el accesorio con éxito");
              let element = this.Accesory.filter( accesory =>{
                return accesory.id != id
              });
              this.Accesory = element;
          }).catch(err=>{
            console.log(err);
          });
        }
      }
    }
  }
</script>