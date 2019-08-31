<template>
    <b-row>
        <b-col md="10">
            <b-card no-body>
            <b-tabs card>
                <b-tab title="Nuevo" active>
                    <b-form @submit.prevent="createUser" @reset.prevent="cleanForm" show>
                        <b-form-row>
                            <b-col md="6">
                                <b-form-group label="Nombre del usuario:">
                                    <b-form-input type="text" v-model="form.name" required placeholder="Nombre del usuario"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col md="6">
                                <b-form-group label="Apellido paterno*:">
                                    <b-form-input type="text" v-model="form.surname" placeholder="Apellido del usuario"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-form-row>
                        <b-form-row>
                            <b-col md="6">
                                <b-form-group label="Nickname:">
                                    <b-form-input type="text" v-model="form.nickname" required placeholder="NickName"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col md="6">
                                <b-form-group label="Tipo de usuario:">
                                    <b-form-select :options="UsersTypes" v-model="form.rol"></b-form-select>
                                </b-form-group>
                            </b-col>
                        </b-form-row>
                        <b-form-group label="Correo electrónico:">
                            <b-form-input type="email" v-model="form.email" placeholder="Correo electrónico"></b-form-input>
                        </b-form-group>
                        <b-form-row>
                            <b-col md="12">
                                <b-form-group label="Contraseña:">
                                    <b-form-input type="password" v-model="form.password" placeholder="Contraseña"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <!-- <b-col md="6">
                                <b-form-group label="Confirmar contraseña:">
                                    <b-form-input type="password" v-model="password" required placeholder="Confirmar contraseña"></b-form-input>
                                </b-form-group>
                            </b-col> -->
                        </b-form-row>
                        <b-row align-h="end">
                            <b-button variant="danger" type="reset" class="mr-2">Cancelar</b-button>
                            <b-button variant="primary" type="submit" class="mr-2">Registrar</b-button>
                        </b-row>
                    </b-form>
                </b-tab>
                <b-tab title="Con teléfono">
                    <b-row>
                        <b-col md="4" class="my-1">
                            <b-form-group>
                                <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col md="8" class="my-1">
                            <b-form-group label-cols-sm="3" label="Buscador">
                                <b-input-group>
                                    <b-form-input v-model="filter" placeholder="Nombre"></b-form-input>
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
                    :items="disavailable"
                    :fields="fields"
                    :current-page="currentPage"
                    :per-page="perPage"
                    :filter="filter"
                    @filtered="onFilteredAvailable"
                    selectable
                    @row-selected="rowSelected"
                    select-mode="single"
                    >
                        <template slot="name" slot-scope="row">
                            {{row.value}}
                        </template>
                        <template slot="surname" slot-scope="row">
                            {{row.value}}
                        </template>
                    </b-table>
                    <b-row>
                        <b-col md="6" class="my-1">
                            <b-pagination
                            v-model="currentPage"
                            :total-rows="totalRowsDisavailable"
                            :per-page="perPage"
                            class="my-0"
                            ></b-pagination>
                        </b-col>
                    </b-row>
                </b-tab>
                <b-tab title="Sin teléfono">
                    <b-row>
                        <b-col md="4" class="my-1">
                            <b-form-group>
                                <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col md="8" class="my-1">
                            <b-form-group label-cols-sm="3" label="Buscador">
                                <b-input-group>
                                    <b-form-input v-model="filter" placeholder="Nombre"></b-form-input>
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
                    :items="available"
                    :fields="fields"
                    :current-page="currentPage"
                    :per-page="perPage"
                    :filter="filter"
                    @filtered="onFilteredDisavailable"
                    selectable
                    @row-selected="rowSelected"
                    select-mode="single"
                    >
                        <template slot="name" slot-scope="row">
                            {{row.value}}
                        </template>
                        <template slot="surname" slot-scope="row">
                            {{row.value}}
                        </template>
                    </b-table>
                    <b-row>
                        <b-col md="6" class="my-1">
                            <b-pagination
                            v-model="currentPage"
                            :total-rows="totalRowsAvailable"
                            :per-page="perPage"
                            class="my-0"
                            ></b-pagination>
                        </b-col>
                    </b-row>
                </b-tab>
            </b-tabs>
        </b-card>
        </b-col>
    </b-row>
</template>
<script>
import User from '../services/API/User'
export default {
    data(){
        return{
            fields:[
                {key: 'name', label: 'Nombre',  sorteable: true, sortDirection: 'desc'},
                {key: 'surname', label: 'Apellidos',  sorteable: true, sortDirection: 'desc'},
            ],
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 10, 15, 20],
            filter: null,
            selected: [],
            UsersTypes: [
                {value: 'Administrador', text: 'Administrador'},
                {value: 'Vendedor', text: 'Vendedor'},
                {value: 'Bodeguero', text: 'Bodeguero'}
            ],
            form:{
                name: '',
                surname: '',
                nickname: '',
                rol: '',
                email: '',
                password: ''
            },
            password: '',
            show: true
        }
    },
    computed:{
        available: function(){
            return this.$store.state.user.available
        },
        disavailable: function(){
            return this.$store.state.user.disavailable
        },
        totalRowsAvailable:function (){
            return this.$store.state.user.available.length
        },
        totalRowsDisavailable: function(){
            return this.$store.state.user.disavailable.length
        }
    },
    methods:{
        onFilteredAvailable(filteredtItems){
            this.totalRowsSinAsignar = filteredItems.length
            //this.currentPage = 1
        },
        onFilteredDisavailable(filteredtItems){
            this.totalRowsSinAsignar = filteredItems.length
            //this.currentPage = 1
        },
        rowSelected(items){
            this.selected = items;
        },
        createUser(){
            User.tryCreate(this.form).then(res=>{
                if(res){
                    alert('Usuario registrado exitosamente!');
                    this.cleanForm();
                    User.trygetAll().then(res=>{
                        this.$store.commit('storeUserData', res);
                    }).catch(err=>{
                        console.log(err);
                    });
                }else{
                    console.log(res);
                    alert('No se ha podido registrar al usuario');
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        cleanForm(){
            this.form.name= '';
            this.form.surname= '';
            this.form.nickname= '';
            this.form.rol= '';
            this.form.email= '';
            this.form.password= '';
            //this.password= '';
            this.show = false;
            this.$nextTick(() => {
            this.show = true;
            });
        },
    }
}
</script>
