<template>
<b-row align-h="center">
    <b-col md="6">
        <b-form class="p-4" @submit="onSubmit" @reset="onReset" v-if="show">
            <h3 class="text-center text-dark">Registro de teléfono</h3>
            <b-form-group label="Modelo: ">
                <b-form-input type="text" v-model="form.modelo" placeholder="Ingrese el modelo" required></b-form-input>
            </b-form-group>
            <b-form-group label="Número de serie: ">
                <b-form-input type="text" v-model="form.serie" placeholder="Ingrese el # de serie" required></b-form-input>
            </b-form-group>
            <b-form-group label="EMEI: ">
                <b-form-input type="text" v-model="form.emei" placeholder="Ingrese el EMEI" required></b-form-input>
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
                    <router-link to="/mobile"  class="text-light"><b-button  type="reset" variant="danger">Cancelar</b-button></router-link>
                    <b-button type="submit" variant="primary">{{btn_txt}}</b-button>
                </b-button-group>
            </div>
        </b-form>
    </b-col>
</b-row>
</template>
<script>
export default {
    data(){
        return{
            form: {
                modelo: '',
                serie: '',
                emei: '',
                status: null,
                accesorios : []
            },
            show: true,
            btn_txt :'Guardar',
            options_status : [
                {value: "Asignado", text: "Asignado"},
                {value: "Sin asignar", text: "Sin asignar"}
            ],
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        onSubmit(evt) {
            evt.preventDefault();
            if(this.btn_txt=='Guardar'){
                alert(JSON.stringify(this.form));
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
            // Reset our form values
            this.form.user = '';
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
            this.show = true
            });
        },
        statusChange(){
            if(this.form.status=="Asignado"){
                this.btn_txt = "Siguiente";
            }else{
                this.btn_txt = "Guardar";
            }
        },
        getData(){
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
