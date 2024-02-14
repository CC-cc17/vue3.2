<script setup>
import { ref } from 'vue'
import Banner from './banner.vue'
import Aboutus from './aboutus.vue'
import Ourwork from './ourwork.vue'
import Contactus from './contactus.vue'
</script>

<template>
    <Banner />
  <div class="container">
    <Aboutus />
    <Ourwork />
    <Contactus />
  </div>
</template>

<style scoped>
</style>
