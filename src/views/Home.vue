<template>
  <div class="row justify-content-center align-items-center" style="min-height:100vh;">
    <LogInForm class="col-md-5"/>
  </div>
</template>

<script>
// @ is an alias to /src
import LogInForm from '@/components/LogInForm.vue'

export default {
  name: 'home',
  components: {
    LogInForm
  }
}
</script>
