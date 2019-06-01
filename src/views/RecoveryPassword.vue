<template>
  <b-row align-v="center"  align-h="center" style="min-height:100vh;">
    <RecoveryPasswordForm class="col-md-5"/>
  </b-row>
</template>

<script>
// @ is an alias to /src
import RecoveryPasswordForm from '@/components/RecoveryPasswordForm.vue'

export default {
  name: 'home',
  components: {
    RecoveryPasswordForm
  }
}
</script>
