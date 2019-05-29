<template>
  <div class="row justify-content-center align-items-center" style="min-height:100vh;">
    <RecoveryPasswordForm class="col-md-5"/>
  </div>
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
