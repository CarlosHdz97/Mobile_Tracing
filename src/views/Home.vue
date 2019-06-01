<template>
    <b-row align-v="center"  align-h="center" style="min-height:100vh;">
      <LogInForm class="col-md-5"/>
    </b-row>
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
