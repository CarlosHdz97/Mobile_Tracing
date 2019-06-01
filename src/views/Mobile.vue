<template>
  <b-row align-h="center" align-v="center" style="min-height:100vh;">
    <b-col cols="12" md="10">
        <router-view></router-view>
    </b-col>
  </b-row>
</template>

<script>

export default {
  name: 'home',
}
</script>
