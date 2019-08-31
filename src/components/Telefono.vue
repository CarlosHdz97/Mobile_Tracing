<template>
    <b-row>
        <b-col md="11">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Nuevo" active>
                        <b-form show @submit.prevent="createMobile" @reset="cleanForm">
                            <b-form-group label="Modelo: ">
                                <b-form-input type="text" v-model="form.modelo" placeholder="Ingrese el modelo" required></b-form-input>
                                <b-form-invalid-feedback :state="validationSerie">
                                    {{err.serie}}
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group label="Número de serie: ">
                                <b-form-input type="text" v-model="form.serie" placeholder="Ingrese el # de serie" required></b-form-input>
                            </b-form-group>
                            <b-form-group label="EMEI: ">
                                <b-form-input type="text" v-model="form.emei" placeholder="Ingrese el IMEI" required></b-form-input>
                                <b-form-invalid-feedback :state="validationEmei">
                                    {{err.emei}}
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group label="Accesorios:">
                                <b-form-checkbox-group v-model="form.accesorios">
                                    <b-form-checkbox value="Cable">Cable</b-form-checkbox>
                                    <b-form-checkbox value="Eliminador de corriente">Eliminador de corriente</b-form-checkbox>
                                    <b-form-checkbox value="Funda">Funda</b-form-checkbox>
                                </b-form-checkbox-group>
                            </b-form-group>
                            <div class="text-right">
                                <b-button-group>
                                    <b-button  type="reset" variant="danger" class="mr-2">Cancelar</b-button>
                                    <b-button type="submit" variant="primary" class="mr-2">Aceptar</b-button>
                                </b-button-group>
                            </div>
                        </b-form>
                    </b-tab>
                    <b-tab title="Sin asignar">
                        <b-card-text>
                            <b-row>
                                <b-col md="4" class="my-1">
                                    <b-form-group>
                                        <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                                    </b-form-group>
                                </b-col>
                                <b-col md="8" class="my-1">
                                    <b-form-group label-cols-sm="3" label="Buscador">
                                        <b-input-group>
                                            <b-form-input v-model="filter" placeholder="Serie o IMEI"></b-form-input>
                                            <b-input-group-append>
                                            <b-button :disabled="!filter" @click="filter = ''" variant="danger"><font-awesome-icon icon="trash-alt"/></b-button>
                                            </b-input-group-append>
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-table
                            show-empty
                            stacked="md"
                            :items="sinAsignar"
                            :fields="fields"
                            :current-page="currentPage"
                            :per-page="perPage"
                            :filter="filter"
                            @filtered="onFilteredAsignado"
                            selectable
                            @row-selected="rowSelected"
                            select-mode="single"
                            >
                                <template slot="modelo" slot-scope="row">
                                    {{row.value}}
                                </template>
                                <template slot="serie" slot-scope="row">
                                    {{row.value}}
                                </template>
                                <template slot="emei" slot-scope="row">
                                    {{row.value}}
                                </template>
                            </b-table>
                            <b-row>
                                <b-col md="6" class="my-1">
                                    <b-pagination
                                    v-model="currentPage"
                                    :total-rows="totalRowsSinAsignar"
                                    :per-page="perPage"
                                    class="my-0"
                                    ></b-pagination>
                                </b-col>
                            </b-row>
                        </b-card-text>
                    </b-tab>
                    <b-tab title="Asignados">
                        <b-card-text>
                            <b-row>
                                <b-col md="4" class="my-1">
                                    <b-form-group>
                                        <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                                    </b-form-group>
                                </b-col>
                                <b-col md="8" class="my-1">
                                    <b-form-group label-cols-sm="3" label="Buscador">
                                        <b-input-group>
                                            <b-form-input v-model="filter" placeholder="Serie o IMEI"></b-form-input>
                                            <b-input-group-append>
                                            <b-button :disabled="!filter" @click="filter = ''" variant="danger"><font-awesome-icon icon="trash-alt"/></b-button>
                                            </b-input-group-append>
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-table
                            show-empty
                            stacked="md"
                            :items="asignado"
                            :fields="fields"
                            :current-page="currentPage"
                            :per-page="perPage"
                            :filter="filter"
                            @filtered="onFilteredSinAsignar"
                            selectable
                            @row-selected="rowSelected"
                            select-mode="single"
                            >
                                <template slot="modelo" slot-scope="row">
                                    {{row.value}}
                                </template>
                                <template slot="serie" slot-scope="row">
                                    {{row.value}}
                                </template>
                                <template slot="emei" slot-scope="row">
                                    {{row.value}}
                                </template>
                            </b-table>
                            <b-row>
                                <b-col md="6" class="my-1">
                                    <b-pagination
                                    v-model="currentPage"
                                    :total-rows="totalRowsAsignado"
                                    :per-page="perPage"
                                    class="my-0"
                                    ></b-pagination>
                                </b-col>
                            </b-row>
                        </b-card-text>
                    </b-tab>
                    <b-tab title="Perdidos">
                        <b-row>
                                <b-col md="4" class="my-1">
                                    <b-form-group>
                                        <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                                    </b-form-group>
                                </b-col>
                                <b-col md="8" class="my-1">
                                    <b-form-group label-cols-sm="3" label="Buscador">
                                        <b-input-group>
                                            <b-form-input v-model="filter" placeholder="Serie o IMEI"></b-form-input>
                                            <b-input-group-append>
                                            <b-button :disabled="!filter" @click="filter = ''" variant="danger"><font-awesome-icon icon="trash-alt"/></b-button>
                                            </b-input-group-append>
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-table
                            show-empty
                            stacked="md"
                            :items="perdido"
                            :fields="fields"
                            :current-page="currentPage"
                            :per-page="perPage"
                            :filter="filter"
                            @filtered="onFilteredPerdido"
                            selectable
                            @row-selected="rowSelected"
                            select-mode="single"
                            >
                                <template slot="modelo" slot-scope="row">
                                    {{row.value}}
                                </template>
                                <template slot="serie" slot-scope="row">
                                    {{row.value}}
                                </template>
                                <template slot="emei" slot-scope="row">
                                    {{row.value}}
                                </template>
                            </b-table>
                            <b-row>
                                <b-col md="6" class="my-1">
                                    <b-pagination
                                    v-model="currentPage"
                                    :total-rows="totalRowsPerdido"
                                    :per-page="perPage"
                                    class="my-0"
                                    ></b-pagination>
                                </b-col>
                            </b-row>
                    </b-tab>
                    <b-tab title="En reparación">
                        <b-row>
                                <b-col md="4" class="my-1">
                                    <b-form-group>
                                        <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                                    </b-form-group>
                                </b-col>
                                <b-col md="8" class="my-1">
                                    <b-form-group label-cols-sm="3" label="Buscador">
                                        <b-input-group>
                                            <b-form-input v-model="filter" placeholder="Serie o IMEI"></b-form-input>
                                            <b-input-group-append>
                                                <b-button :disabled="!filter" @click="filter = ''" variant="danger"><font-awesome-icon icon="trash-alt"/></b-button>
                                            </b-input-group-append>
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-table
                            show-empty
                            stacked="md"
                            :items="enReparacion"
                            :fields="fields"
                            :current-page="currentPage"
                            :per-page="perPage"
                            :filter="filter"
                            @filtered="onFilteredEnReparacion"
                            selectable
                            @row-selected="rowSelected"
                            select-mode="single"
                            >
                            <template slot="modelo" slot-scope="row">
                                {{row.value}}
                            </template>
                            <template slot="serie" slot-scope="row">
                                {{row.value}}
                            </template>
                            <template slot="emei" slot-scope="row">
                                {{row.value}}
                            </template>
                            </b-table>
                            <b-row>
                                <b-col md="6" class="my-1">
                                    <b-pagination
                                    v-model="currentPage"
                                    :total-rows="totalRowsEnReparacion"
                                    :per-page="perPage"
                                    class="my-0"
                                    ></b-pagination>
                                </b-col>
                            </b-row>
                    </b-tab>
                </b-tabs>
            </b-card>
            <b-button v-b-modal.historico variant="primary">lg modal</b-button>
            <b-modal id="historico" size="lg" title="Historico del teléfono">
                <div v-if="selected.length>0">
                    <b-row class="justify-content-between px-5" >
                        <span><strong>Modelo: </strong> {{selected[0].modelo}}</span>
                        <span><strong># de serie: </strong>{{selected[0].serie}}</span>
                        <span><strong>IMEI: </strong>{{selected[0].emei}}</span>
                    </b-row>
                    <b-row class="pt-3">
                        <div class="col-md-12">
                            <div class="main-timeline">
                                <div v-for="historic in selected[0].historic" v-bind:key="historic.id">
                                    <div class="timeline" v-if="historic.action=='Registro'">
                                        <div class="timeline-icon">
                                            <font-awesome-icon icon="star"/>
                                        </div>
                                        <div class="timeline-content">
                                            <h2 class="title">Registro</h2>
                                            <p class="description">
                                                <strong>Registro: </strong> {{historic.entrego}}<br>
                                                <strong>Modelo: </strong> {{selected[0].modelo}}<br>
                                                <strong>Número de serie: </strong>{{selected[0].serie}}<br>
                                                <strong>IMEI: </strong>{{selected[0].emei}}<br>
                                                <strong>Accesorios actuales: </strong>{{historic.accesorios}}<br>
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
                                            <p class="description"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-row>
                </div>
            </b-modal>
        </b-col>
    </b-row>
</template>
<script>
import Mobile from '../services/API/Mobile'
export default {
    data(){
        return{
            statemodal:true,
            fields: [
                {key: 'modelo', label:'Modelo', sorteable: true, sortDirection:'desc'},
                {key: 'serie', label:'Modelo', sorteable: true, sortDirection:'desc'},
                {key: 'emei', label:'IMEI', sorteable: true, sortDirection:'desc'}
            ],
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 10, 15, 20],
            filter: null,
            sinAsignar: [],
            asignado: [],
            enReparacion: [],
            perdido: [],
            selected: [],
            form: {
                modelo: '',
                serie: '',
                emei: '',
                accesorios: [],
                entrego: `${this.$store.state.auth.name} ${this.$store.state.auth.surname}`
            },
            err:{
                emei: '',
                serie: ''
            },
            show: true
        }
    },
    created(){
        this.getMobiles();
    },
    computed:{
        validationEmei(){
            return this.err.emei ? false : true
        },
        validationSerie(){
            return this.err.serie ? false : true
        },
        totalRowsSinAsignar: function(){
            return this.sinAsignar.length
        },
        totalRowsAsignado: function(){
            return this.asignado.length
        },
        totalRowsEnReparacion: function(){
            return this.enReparacion.length
        },
        totalRowsPerdido: function(){
            return this.perdido.length
        },
    },
    methods: {
      onFilteredSinAsignar(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRowsSinAsignar = filteredItems.length
        this.currentPage = 1
      },
      onFilteredAsignado(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRowsAsignado = filteredItems.length
        this.currentPage = 1
      },
      onFilteredEnReparacion(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRowsEnReparacion = filteredItems.length
        this.currentPage = 1
      },
      onFilteredPerdido(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRowsPerdido = filteredItems.length
        this.currentPage = 1
      },
      getMobiles(){
          Mobile.trygetQuantity().then(res=>{
              this.sinAsignar = res.sinAsignar;
              this.asignado = res.asignado;
              this.perdido = res.perdido;
              this.enReparacion = res.enReparacion;
          }).catch(err=>{
              console.log(err);
          });
      },
      rowSelected(items) {
        this.selected = items;
      },
      cleanForm(){
            this.form.modelo = '';
            this.form.serie = '';
            this.form.emei = '';
            this.form.accesorios = [];
            this.show = false;
            this.$nextTick(() => {
            this.show = true;
            });
      },
      createMobile(){
          Mobile.tryCreate(this.form).then(res=>{
              if(res){
                  alert('Teléfono registrado exitosamente!');
                  this.cleanForm();
              }
          }).catch(err=>{
                console.log(err);
                this.err.emei = err.response.data.emei[0];
                this.err.serie = err.response.data.serie[0];
                alert("No se han podido registrar el teléfono");
          });
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