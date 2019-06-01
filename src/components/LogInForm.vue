<template>
    <div>
        <b-form class="p-4 m-2" @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group label="Usuario: ">
                <b-form-input type="text" v-model="form.user" placeholder="Ingrese su usuario" required></b-form-input>
            </b-form-group>
            <b-form-group label="Password: ">
                <b-input-group>
                    <b-input-group-text slot="append"><font-awesome-icon :icon="ic_password" @click="showPassword"/></b-input-group-text>
                    <b-form-input :type="type_password_input" v-model="form.password" placeholder="Ingrese su contraseña" required></b-form-input>
                </b-input-group>
                <router-link to="/recoveryPassword">Recuperar contraseña</router-link> <br>
            </b-form-group>
                <div class="d-flex justify-content-end">
                    <b-button-group class="d-block">
                        <b-button type="reset" variant="danger">Cancelar</b-button>
                        <b-button type="submit" variant="primary">
                            <b-spinner small :hidden="form.loading"></b-spinner>{{form.btn_msg}}
                        </b-button>
                    </b-button-group>
                </div>
        </b-form>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
            form: {
                user: '',
                password: '',
                btn_msg : 'Iniciar sesión',
                loading : true
            },
            show: true,
            ic_password: 'eye-slash',
            type_password_input : 'password',
        }
    },
    methods:{
        ...mapMutations(['authentication']),
        onSubmit(evt) {
            evt.preventDefault();
            this.form.btn_msg = 'cargando....';
            this.form.loading = false;

            if(this.form.user =="Carlos" && this.form.password=="12345"){
                var data = {
                    "auth" : true,
                    "jwt" : "dsads",
                    "rol" : [1,3,5],
                    "permissions" : ["eee"]
                };
                this.$store.commit('authentication',data);
                this.$router.push({path:'mobile'});
                alert("Bienvenido");
            }else{
                alert("Usuario o contraseña no válidos");
                this.form.loading = true;
                this.form.btn_msg = 'Iniciar sesión';
            }
        },
        onReset(evt) {
            evt.preventDefault();
            // Reset our form values
            this.form.user = '';
            this.form.password = '';
            // Trick to reset/clear native browser form validation state
            this.show = false;
            this.$nextTick(() => {
            this.show = true;
            this.form.loading = true;
            this.form.btn_msg = 'Iniciar sesión'
            });
        },
        showPassword(){
            this.ic_password = this.ic_password == 'eye' ? 'eye-slash' : 'eye';
            this.type_password_input = this.type_password_input == 'text' ? 'password' : 'text';
        }
    }
}
</script>
