<template>
    <div>
        <b-form class="p-4 m-2" @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group label="Usuario: ">
                <b-form-input type="text" v-model="form.user" placeholder="Ingrese su usuario" required></b-form-input>
            </b-form-group>
            <div class="text-right">
                <b-button-group>
                    <router-link to="/"  class="text-light"><b-button  type="reset" variant="danger">Cancelar</b-button></router-link>
                    <b-button type="submit" variant="primary">Entrar</b-button>
                </b-button-group>
            </div>
        </b-form>
    </div>
</template>
<script>
export default {

    data(){
        return{
            form: {
                user: '',
            },
            show: true,
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
