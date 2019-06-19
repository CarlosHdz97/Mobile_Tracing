<template>
<b-row align-h="center">
    <b-col md="6">
        <b-form class="p-4" @submit="onSubmit" @reset="onReset" v-if="show">
            <h3 class="text-center text-dark">{{msg_form}}</h3>
            <b-form-group label="Modelo: ">
                <b-form-input type="text" v-model="form.modelo" placeholder="Ingrese el modelo" required></b-form-input>
            </b-form-group>
            <b-form-group label="Número de serie: ">
                <b-form-input type="text" v-model="form.serie" placeholder="Ingrese el # de serie" required></b-form-input>
                <b-form-invalid-feedback :state="validationSerie">
                    {{err.serie}}
                </b-form-invalid-feedback>
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
            <b-form-group label="Status: ">
                <b-form-select v-model="form.status" :options="options_status" @change="statusChange" required></b-form-select>
            </b-form-group>
            <div class="text-right">
                <b-button-group>
                    <b-button  type="reset" variant="danger">Cancelar</b-button>
                    <b-button type="submit" variant="primary">{{btn_txt}}</b-button>
                </b-button-group>
            </div>
        </b-form>
    </b-col>
</b-row>
</template>
<script>
import {mapMutations} from 'vuex'
import Mobile from '../services/API/Mobile.js'
export default {
    data(){
        return{
            form: {
                id: '',
                modelo: '',
                serie: '',
                emei: '',
                status: null,
                accesorios : [],
                log:[]
            },
            show: true,
            btn_txt :'Guardar',
            options_status : [
                {value: 1, text: "Asignado"},
                {value: 0, text: "Sin asignar"}
            ],
            err:{
                emei: '',
                serie: ''
            },
            msg_form: this.$store.state.mobile.id ? 'Actualización de datos del teléfono' : 'Registro de teléfonos'
        }
    },
    mounted(){
        this.getData();
    },
    computed:{
        validationEmei(){
            return this.err.emei ? false : true
        },
        validationSerie(){
            return this.err.serie ? false : true
        }
    },
    methods:{
        ...mapMutations(['deleteMobileData']),
        onSubmit(evt) {
            evt.preventDefault();
            if(this.btn_txt=='Guardar'){
                if(this.$store.state.mobile.id){
                    Mobile.tryUpdate(this.form).then(res=>{
                        this.$store.commit('deleteMobileData');
                        alert("Teléfono actualizado exitosamente");
                        this.$router.push({path :'/inventory'});
                    }).catch(err=>{
                        this.err.emei = err.response.data.emei[0];
                        this.err.serie = err.response.data.serie[0];
                        alert("No se han podido actualizar los datos  del teléfono");
                    })
                }else{
                    Mobile.tryCreate(this.form).then(res=>{
                    if(res){
                        alert("Teléfono agregado exitosamente");
                        this.form.modelo = '';
                        this.form.serie = '';
                        this.form.emei = '';
                        this.form.status = '';
                        this.form.accesorios = [];
                        this.form.log = '';
                        }
                    }).catch(err=>{
                        this.err.emei = err.response.data.emei[0];
                        this.err.serie = err.response.data.serie[0];
                        alert("No se ha registrado el teléfono");
                    })
                }
            }else{
                this.$store.state.mobile.modelo = this.form.modelo;
                this.$store.state.mobile.serie = this.form.serie;
                this.$store.state.mobile.emei = this.form.emei;
                this.$store.state.mobile.status = this.form.status;
                this.$store.state.mobile.accesorios = this.form.accesorios;
                this.$router.push({path:'assign'});
            }
        },
        onReset(evt) {
            evt.preventDefault();
            // Reset our form values = '';
            // Trick to reset/clear native browser form validation state
            this.$store.commit('deleteMobileData');
            this.$router.push({path :'/inventory'});
            this.show = false
            this.$nextTick(() => {
            this.show = true
            });
        },
        statusChange(){
            if(this.form.status==true){
                this.btn_txt = "Siguiente";
            }else{
                this.btn_txt = "Guardar";
            }
        },
        getData(){
            this.form.id = this.$store.state.mobile.id;
            this.form.modelo = this.$store.state.mobile.modelo;
            this.form.serie = this.$store.state.mobile.serie;
            this.form.emei = this.$store.state.mobile.emei;
            this.form.status = this.$store.state.mobile.status;
            this.form.accesorios = this.$store.state.mobile.accesorios;
            this.statusChange();
        }
    }
}
</script>
