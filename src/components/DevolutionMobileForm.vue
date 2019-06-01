<template>
    <b-form class="p-4 m-2" @submit="onSubmit" @reset="onReset" v-if="show">
        <h3 class="text-center text-dark">Prestamo de equipo</h3>
        <b-form-group label="Fecha de retiro: ">
            <b-form-input type="date" v-model="form.fecha_retiro" required></b-form-input>
        </b-form-group>
        <b-form-group label="Sucursal: ">
            <b-form-select v-model="form.sucursal" :options="options_sucursal"></b-form-select>
        </b-form-group>
        <b-form-group label="Entrega: ">
            <b-form-input type="text" v-model="form.entrega" placeholder="Ingrese el nombre de la persona" required></b-form-input>
        </b-form-group>
        <b-form-group label="Recibe: ">
            <b-form-input type="text" v-model="form.recibe" placeholder="Ingrese el nombre de la persona" required></b-form-input>
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
                <router-link to="/"  class="text-light"><b-button  type="reset" variant="danger">Cancelar</b-button></router-link>
                <b-button type="submit" variant="primary">Guardar</b-button>
            </b-button-group>
        </div>
        <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ form }}</pre>
        </b-card>
    </b-form>
</template>
<script>
export default {

    data(){
        return{
            form: {
                fecha_retiro: '',
                sucursal: '',
                entrega: '',
                recibe: null,
                accesorios: []
            },
            show: true,
            options_sucursal : [
                {value: "Apartado 1", text: "Apartado 1"},
                {value: "Apartado 2", text: "Apartado 2"},
                {value: "Brasil", text: "Brasil"},
                {value: "Corona 1", text: "Corona 1"},
                {value: "Corona 2", text: "Corona 2"},
                {value: "Correo 1", text: "Correo 1"},
                {value: "Correo 2", text: "Correo 2"},
                {value: "San pablo 1", text: "San Pablo 1"},
                {value: "San pablo 2", text: "San Pablo 2"},
            ],
        }
    },
    methods:{
        onSubmit(evt) {
            evt.preventDefault();
            alert(JSON.stringify(this.form));
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
        }
    }
}
</script>
