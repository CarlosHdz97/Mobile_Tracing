<template>
    <b-row>
        <b-col md="12" class="h2 text-dark text-center mb-4">Usuarios</b-col>
        <b-col md="6">
            <UserChart/>
        </b-col>
        <b-col md="6">
            <TableUsers/>
        </b-col>
    </b-row>
</template>
<script>
import {mapMutations} from 'vuex'
import UserChart from '../components/UserChart'
import TableUsers from '../components/TableUsers'
import User from '../services/API/User'
export default {
    name: 'users',
    components:{
        UserChart,
        TableUsers
    },
    created(){
        this.getUsers();
    },
    methods:{
        getUsers(){
            User.trygetAll().then(res=>{
                this.$store.commit('storeUserData', res);
            }).catch(err=>{
                console.log(err)
            });
        }
    }
}
</script>
