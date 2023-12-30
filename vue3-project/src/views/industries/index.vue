<script setup>
import { ref } from 'vue'
import Industrydetail from './detail.vue'
import Data from './data.vue'
import Backtoall from './backtoall.vue'
</script>

<template>
    <div class="content">
        <Industrydetail />
        <Data />
        <Backtoall />
    </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
}
</style>
