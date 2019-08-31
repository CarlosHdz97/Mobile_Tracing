<template>
    <form @submit.prevent="createHistoric">
        <b-form-group label="Sucursal">
             <b-form-select v-model="sucursal" :options="options_sucursales"></b-form-select>
        </b-form-group>
        <b-form-group label="Fecha">
            <b-form-input required type="date" v-model="fecha"></b-form-input>
        </b-form-group>
        <b-form-group label="Evento">
            <b-form-select v-model="sucursal" :options="options_acciones"></b-form-select>
        </b-form-group>
        <b-form-group label="Responsable" v-model="responsable">
            <b-form-input required></b-form-input>
        </b-form-group>
        <b-form-group label="Entrego">
            <b-form-input required v-model="entrego"></b-form-input>
        </b-form-group>
        <b-form-group label="Accesorios">
            <b-form-checkbox-group v-model="accesorios">
                <b-form-checkbox value="Cable">Cable</b-form-checkbox>
                <b-form-checkbox value="Eliminador de corriente">Eliminador de corriente</b-form-checkbox>
                <b-form-checkbox value="Funda">Funda</b-form-checkbox>
            </b-form-checkbox-group>
        </b-form-group>
        <b-form-group label="Notas" v-model="notas">
            <b-form-textarea required></b-form-textarea>
        </b-form-group>
        <div class="text-right">
        <b-button type="submit" variant="dark">Aceptar</b-button>
        </div>
    </form>
</template>
<script>
export default {
    data(){
        return{
            form:{
                sucursal: '',
                fecha: '',
                evento: '',
                responsable: '',
                entrego: '',
                quantity: 1,
                accesorios: [],
                notes: '',
                costo: ''
            },
            options_sucursales:[
                {value: "Apartado 1", text: "Apartado 1"},
                {value: "Apartado 2", text: "Apartado 2"},
                {value: "Brasil", text: "Brasil"},
                {value: "CEDIS San Pablo", text: "CEDIS San Pablo"},
                {value: "Corona 1", text: "Corona 1"},
                {value: "Corona 2", text: "Corona 2"},
                {value: "Correo 1", text: "Correo 1"},
                {value: "Correo 2", text: "Correo 2"},
                {value: "Pantaco", text: "Pantaco"},
                {value: "San pablo 1", text: "San Pablo 1"},
                {value: "San pablo 2", text: "San Pablo 2"},
            ],
            options_acciones:[
                {value: 'Devuelto', text: 'Devuelto'},
                {value: 'Asignado', text: 'Asignado'},
                {value: 'En reparación', text: 'En reparación'},
                {value: 'Perdido', text: 'Perdido'},
            ],
            options_responsables:[]
        }
    },
    methods:{
        createHistoric(){
            alert("hola");
        }
    }
}
</script>
<style>
</style>

