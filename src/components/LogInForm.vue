<template>
    <div>
        <b-alert show variant="danger" v-if="alert">
            {{alert}}
        </b-alert>
        <b-form class="p-4 m-2" @submit.prevent="onSubmit" @reset="onReset" v-if="show">
            <b-form-group label="Usuario: ">
                <b-form-input type="text" v-model="form.user" placeholder="Ingrese su correo electrónico" required/>
            </b-form-group>
            <b-form-group label="Password: ">
                <b-input-group>
                    <b-input-group-text slot="append" @click="showPassword">
                        <font-awesome-icon :icon="ic_password"/>
                    </b-input-group-text>
                    <b-form-input :type="type_password_input" v-model="form.password" placeholder="Ingrese su contraseña" required/>
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
import Auth from '../services/API/Auth.js'
export default {
    data(){
        return{
            alert:'',
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
        onSubmit() {
            this.form.btn_msg = 'cargando....';
            this.form.loading = false;
            Auth.tryLogIn(this.form).then(res=>{
                if(res.token){
                    this.$store.commit('authentication',res);
                    this.$router.push({path:'inventory'});
                    alert(`Bienvenido ${res.name}`);
                }else{
                    this.alert=res.msg;
                    this.form.loading = true;
                    this.form.btn_msg = 'Iniciar sesión';
                }
            }).catch(err=>{
                console.log(err)
            });
        },
        onReset() {
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
