<template>
    <b-row align-h="center">
        <b-col md="6">
            <b-form class="p-4 form" @submit.prevent="onSubmit" @reset.prevent="onReset" v-if="show">
                <h3 class="text-center text-dark">{{msg_form}}</h3>
                <b-form-group label="Nombre: ">
                    <b-form-input type="text" v-model="form.name" placeholder="Ingrese el nombre" required></b-form-input>
                    <b-form-invalid-feedback :state="validationName">
                        {{err.name}}
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Existencia: ">
                    <b-form-input type="number" v-model="form.existencia" placeholder="Ingrese la existencia" required></b-form-input>
                </b-form-group>
                <b-form-group label="Stock mínimo: ">
                    <b-form-input type="number" v-model="form.stockMin" placeholder="Ingrese el stock mínimo" required></b-form-input>
                </b-form-group>
                <b-form-group label="Stock máximo: ">
                    <b-form-input type="number" v-model="form.stockMax" placeholder="Ingrese el stock máximo" required></b-form-input>
                </b-form-group>
                <div class="text-right">
                    <b-button-group>
                        <b-button  type="reset" variant="danger">Cancelar</b-button>
                        <b-button type="submit" variant="primary">Guardar</b-button>
                    </b-button-group>
                </div>
            </b-form>
        </b-col>
    </b-row>
</template>
<script>
import {mapMutations} from 'vuex'
import Accesory from '../services/API/Accesory.js'
export default {
    data(){
        return {
            err:{
                name: ''
            },
            show: true,
            form:{
                name: '',
                existencia: null,
                stockMin: null,
                stockMax: null
            },
            msg_form: this.$store.state.accesory.id ? 'Actualización de datos del accesorio' : 'Registro de accesorios'
        }
    },
    mounted(){
        this.getData();
    },
    computed:{
        validationName(){
            return this.err.name ? false: true
        }
    },
    methods:{
        clearForm(){
            this.form.name = '',
            this.form.existencia = null,
            this.form.stockMin = null,
            this.form.stockMax = null
        },
        onSubmit(){
            if(this.$store.state.accesory.id){
                Accesory.tryUpdate(this.form).then(res=>{
                    this.$store.commit('deleteAccesoryData');
                    alert("Accesorio actualizado");
                    this.$router.push({path :'/inventory'});
                }).catch(err=>{
                    console.log(err);
                })
            }else{
                Accesory.tryCreate(this.form).then(res=>{
                    alert("Accesorio agregado correctamente");
                    this.clearForm();
                    this.$router.push({path :'/inventory'});
                }).catch(err=>{
                   alert("No se ha podido registrar el accesorio!!");
                   this.err.name = err.response.data.name[0];
                })
            }
        },
        onReset(){
            this.$router.push({path :'/inventory'});   
        },
        getData(){
            this.form.id = this.$store.state.accesory.id;
            this.form.name = this.$store.state.accesory.name;
            this.form.existencia = this.$store.state.accesory.existencia;
            this.form.stockMin = this.$store.state.accesory.stockMin;
            this.form.stockMax = this.$store.state.accesory.stockMax;
        }
    }
}
</script>
