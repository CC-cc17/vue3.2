<script setup>
import {ref} from 'vue'
import HeadMenu from './views/headMenu.vue'
import Footer from './views/footer.vue'
</script>

<template>
  <HeadMenu/>
  <router-view/>
  <Footer />
</template>

<style scoped>
</style>
