<template>
<div class="mt-3">
    <b-alert show dismissible :variant="alert.variant"  v-for="alert in alerts" :key="alert.msg">
    alert.msg<b>&rArr;</b>
  </b-alert>
</div>
</template>
<script>
export default {
    data(){
        return{
        }
    },
    computed:{
        alerts(){
            return this.$store.state.alerts.toDo;
        }
    }
}
</script>
