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
              <b-row fluid class="pb-3">
                <b-button variant="success" class="mx-2" disabled></b-button> Sin asignar
                <b-button variant="warning" class="mx-2" disabled></b-button> Asignado
                <b-button variant="danger" class="mx-2" disabled></b-button> Perdido
                <b-button variant="info" class="mx-2" disabled></b-button> En reparación
              </b-row>
              <b-table striped hover 
              :items="Mobiles" 
              :fields="fields" 
              :current-page="currentPage" 
              :per-page="perPage" 
              :filter="filter" 
              @filtered="onFiltered"  class="table-responsive-md">
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
                {{row.value}}

              </template>
              <template slot="id" slot-scope="row">
                <b-button variant="primary" @click="editMobile(row.value)" class="mx-1"><font-awesome-icon icon="pencil-alt"/></b-button>
                <b-button variant="danger" @click="deleteMobile(row.value)"><font-awesome-icon icon="trash-alt"/></b-button>
                <b-button variant="dark" class="mx-1" v-b-modal.modal-mobile @click="historyMobile(row.value)"><font-awesome-icon icon="history"/></b-button>
              </template>
              </b-table>
              <b-modal id="modal-mobile" size="lg" title="Historico del teléfono">
                <p class="text-right h3"><strong>Estatus:</strong><span class="text-info"> {{MobileData.status}}</span></p>
                <div class="mb-3">
                  <b-button-group>
                    <b-button v-b-modal.modal-form-action variant="info" :disabled="is_active_btn_prestamo">Prestamo</b-button>
                    <b-button v-b-modal.modal-form-action variant="info" :disabled="is_active_btn_devolucion">Devolución</b-button>
                    <b-button v-b-modal.modal-form-action variant="info" :disabled="is_active_btn_reparacion">Reparación</b-button>
                    <b-button v-b-modal.modal-form-action variant="info" :disabled="is_active_btn_perdida">Perdida</b-button>
                    <b-modal id="modal-form-action" size="md" title="Prestamo" hide-footer>
                        <HistoricForm/>
                    </b-modal>
                  </b-button-group>
                </div>
                <div class="demo">
                  <div class="container">
                      <div class="row">
                          <div class="col-md-12">
                              <div class="main-timeline">
                                <div v-for="historic in historico" v-bind:key="historic.id">
                                  <div class="timeline" v-if="historic.action=='Registro'">
                                    <div class="timeline-icon">
                                      <font-awesome-icon icon="star"/>
                                    </div>
                                    <div class="timeline-content">
                                      <h2 class="title">Registro</h2>
                                      <p class="description">
                                        <strong>Registro: </strong> {{historic.entrego}}<br>
                                        <strong>Modelo: ss </strong> {{MobileData.modelo}}<br>
                                        <strong>Número de serie: </strong>{{MobileData.serie}}<br>
                                        <strong>IMEI: </strong>{{MobileData.emei}}<br>
                                        <strong>Accesorios actuales: </strong>{{MobileData.accesorios}}<br>
                                        <strong>Notas: </strong> {{historic.notes}}<br>
                                        <strong>fecha: </strong>{{historic.fecha}}
                                      </p>
                                    </div>
                                  </div>
                                  <div class="timeline" v-else-if="historic.action=='Devuelto'">
                                      <div class="timeline-icon">
                                        <font-awesome-icon icon="arrow-left"/>
                                      </div>
                                      <div class="timeline-content">
                                        <h2 class="title">Devolución</h2>
                                        <p class="description">
                                          <strong>Sucursal: </strong>{{historic.sucursal}}<br>
                                          <strong>Devolvio: </strong>{{historic.responsable}}<br>
                                          <strong>Recibio: </strong>{{historic.entrego}}<br>
                                          <strong>Se devolvio con : </strong>{{historic.accesorios ? historic.accesorios : '-'}}<br>
                                          <strong>Notas: </strong> {{historic.notes}}<br>
                                          <strong>Fecha del movimiento: </strong>{{historic.fecha}}<br>
                                        </p>
                                      </div>
                                  </div>
                                  <div class="timeline" v-else-if="historic.action=='Asignado'">
                                    <div class="timeline-icon">
                                      <font-awesome-icon icon="arrow-right"/>
                                    </div>
                                    <div class="timeline-content right">
                                      <h2 class="title">Prestamo</h2>
                                      <p class="description">
                                        <strong>Sucursal: </strong>{{historic.sucursal}}<br>
                                        <strong>Notas: </strong>{{historic.notes}}<br>
                                        <strong>Entrego: </strong>{{historic.entrego}}<br>
                                        <strong>Responsable del equipo: </strong>{{historic.responsable}}<br>
                                        <strong>Fecha del movimiento: </strong>{{historic.date}}
                                      </p>
                                    </div>
                                  </div>
                                  <div class="timeline" v-else-if="historic.action=='En reparación'">
                                    <div class="timeline-icon">
                                      <font-awesome-icon icon="tools"/>
                                    </div>
                                    <div class="timeline-content right">
                                      <h2 class="title">En reparación</h2>
                                      <p class="description">
                                        <strong>Notas: </strong>{{historic.notes}}<br>
                                        <strong>Responsable del equipo: </strong>{{historic.responsable}}<br>
                                        <strong>Costo: </strong>{{historic.costo}}<br>
                                        <strong>Fecha del movimiento: </strong>{{historic.date}}<br>
                                      </p>
                                    </div>
                                  </div>
                                  <div class="timeline" v-else-if="historic.action=='Perdido'">
                                    <div class="timeline-icon">
                                      <font-awesome-icon icon="exclamation"/>
                                    </div>
                                    <div class="timeline-content right">
                                      <h2 class="title">Perdido</h2>
                                      <p class="description">
                                        <strong>Notas: </strong>{{historic.notes}}<br>
                                        <strong>Responsable del equipo: </strong>{{historic.responsable}}<br>
                                        <strong>Costo: </strong>{{historic.costo}}<br>
                                        <strong>Fecha del movimiento: </strong>{{historic.date}}<br>
                                      </p>
                                    </div>
                                  </div>
                                  <div class="timeline" v-else>
                                    <div class="timeline-icon">
                                      <font-awesome-icon icon="question"/>
                                    </div>
                                    <div class="timeline-content">
                                      <h2 class="title">404</h2>
                                      <p class="description">
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
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
              <b-row fluid class="pb-3">
                <b-button variant="success" class="mx-2" disabled></b-button> Ok
                <b-button variant="warning" class="mx-2" disabled></b-button> Stock bajo 
                <b-button variant="danger" class="mx-2" disabled></b-button> Exceso de stock 
              </b-row>
              <b-table striped hover 
              :items="Accesory" 
              :fields="fieldsAccesory" 
              :current-page="currentPageAccesory" 
              :per-page="perPageAccesory" 
              :filter="filterAccesory" 
              @filtered="onFilteredAccesory" class="table-responsive-md">
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
                <!-- @click="historyAccesory(row.value)" -->
                <b-button variant="dark"  disabled class="mx-1"><font-awesome-icon icon="history"/></b-button>
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
import HistoricForm from '@/components/ActionForm.vue'
  export default {
    components: {
    HistoricForm
  },
    created(){
      this.getMobiles();
      this.getAccesory();
    },
    data() {
      return {
        MobileData : {
          id: null,
          modelo: '',
          serie: '',
          emei: '',
          accesorios:[],
          status: null
        },
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
        filter: null,
        timeLine : '',
        historico : '',
        is_active_btn_prestamo: false,
        is_active_btn_devolucion: false,
        is_active_btn_reparacion: false,
        is_active_btn_perdida: false
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
      },
      historyMobile(id){
        Mobile.tryfind(id).then(res=>{
          this.timeLine = '';
          this.historico = res.historic;
          this.MobileData.id = res.id;
          this.MobileData.serie = res.serie;
          this.MobileData.modelo = res.modelo;
          this.MobileData.emei = res.emei;
          this.MobileData.status = res.status;
          this.MobileData.accesorios = res.accesorios;
          if(this.MobileData.status=='Sin asignar'){
            this.is_active_btn_reparacion = false;
            this.is_active_btn_perdida = false;
            this.is_active_btn_prestamo = false;
            this.is_active_btn_devolucion = true;
          }else if(this.MobileData.status=='Asignado'){
            this.is_active_btn_reparacion = false;
            this.is_active_btn_perdida = false;
            this.is_active_btn_prestamo = true;
            this.is_active_btn_devolucion = false;
          }else if(this.MobileData.status=='En reparación'){
            this.is_active_btn_reparacion = true;
            this.is_active_btn_perdida = false;
            this.is_active_btn_prestamo = true;
            this.is_active_btn_devolucion = false;
          }else if(this.MobileData.status=='Perdido'){
            this.is_active_btn_reparacion = false;
            this.is_active_btn_perdida = false;
            this.is_active_btn_prestamo = false;
            this.is_active_btn_devolucion = true;
          }else{
            this.is_active_btn_prestamo = false;
            this.is_active_btn_devolucion = false;
            this.is_active_btn_reparacion = false;
            this.is_active_btn_perdida = false;
          }
        }).catch(err=>{
          alert("Se ha producido un error, intente de nuevo");
          console.log(err);
        });
      },
      historyAccesory(id){
        alert(id);
      }
    }
  }
</script>

<style>
  .demo{ background: transparent; }
  .main-timeline{
      position: relative;
      -webkit-transition: all 0.4s ease 0s;
      -moz-transition: all 0.4s ease 0s;
      -ms-transition: all 0.4s ease 0s;
      transition: all 0.4s ease 0s;
  }
  .main-timeline:before{
      content: "";
      width: 3px;
      height: 100%;
      background: #4b4b4b;
      position: absolute;
      top: 0;
      left: 50%;
  }
  .main-timeline .timeline{
      margin-bottom: 50px;
      position: relative;
  }
  .main-timeline .timeline:before,
  .main-timeline .timeline:after{
      content: "";
      display: block;
      width: 100%;
      clear: both;
  }
  .main-timeline .timeline-icon{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: black;
      overflow: hidden;
      margin-left: -23px;
      position: absolute;
      top: 0;
      left: 50%;
      text-align: center;
  }
  .main-timeline .timeline-icon svg{
      margin-top:8px;
      font-size: 30px;
      line-height: 50px;
      color: #fff;
  }
  .main-timeline .timeline-content{
      width: 45%;
      padding: 20px 20px 5px 20px;
      border-radius: 5px;
      background: #fff;
      -webkit-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);
      -moz-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);
      -ms-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);
      box-shadow: 0 3px 0 rgba(0, 0, 0, 0.1);
      -webkit-transition: all 0.3s ease 0s;
      -moz-transition: all 0.3s ease 0s;
      -ms-transition: all 0.3s ease 0s;
      transition: all 0.3s ease 0s;
  }
  .main-timeline .timeline-content:before{
      content: "";
      border-left: 10px solid #1abc9c;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      position: absolute;
      left: 45%;
      top: 20px;
  }
  .main-timeline .title{
      font-size: 30px;
      font-weight: 300;
      color: #fff;
      padding: 10px;
      background: #1abc9c;
      border-radius: 3px 3px 0 0;
      margin: -20px -20px 10px;
  }
  .main-timeline .description{
      font-size: 14px;
      color: #726f77;
  }
  .main-timeline .read-more{
      display: inline-block;
      font-size: 12px;
      color: #64d8c1;
      text-transform: uppercase;
      padding: 5px 15px;
      border: 2px solid #64d8c1;
      position: relative;
      border-radius: 5px;
      -webkit-box-shadow: 2px 2px 0 #64d8c1;
      -moz-box-shadow: 2px 2px 0 #64d8c1;
      -ms-box-shadow: 2px 2px 0 #64d8c1;
      box-shadow: 2px 2px 0 #64d8c1;
  }
  .main-timeline .read-more:hover{
      top: 2px;
      left: 2px;
      box-shadow: none;
  }
  .main-timeline .timeline-content.right{
      float: right;
  }
  .main-timeline .timeline-content.right:before{
      content: "";
      right: 45%;
      left: inherit;
      border-left: 0;
      border-right: 7px solid #1abc9c;
  }
  @media only screen and (max-width: 990px){
      .main-timeline .title{
          font-size: 25px;
      }
      .main-timeline .timeline-content::before{
          top: 16px;
      }
  }
  @media only screen and (max-width: 767px){
      .main-timeline{ margin-left: 20px; }
      .main-timeline:before{ left: 0; }
      .main-timeline .timeline-content{
          width: 90%;
          float: right;
      }
      .main-timeline .timeline-content:before,
      .main-timeline .timeline-content.right:before{
          left: 10%;
          right: inherit;
          margin-left: -6px;
          border-left: 0;
          border-right: 17px solid transparent;
      }
      .main-timeline .timeline-icon{
          left: 0;
      }
  }
  @media only screen and (max-width: 479px){
      .main-timeline .timeline-content{
          width: 85%;
      }
      .main-timeline .timeline-content:before,
      .main-timeline .timeline-content.right:before{
          left: 15%;
      }
      .main-timeline .title{
          font-size: 20px;
      }
      .main-timeline .timeline-content:before{
          top: 13px;
      }
  }
</style>