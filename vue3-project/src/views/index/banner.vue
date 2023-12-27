<script setup>
import { ref } from 'vue'
let bannerlist = ref([
    { id: 1, img_url: 'banner1.jpg' },
    { id: 2, img_url: 'banner2.jpg' },
    { id: 3, img_url: 'banner3.jpg' },
    { id: 4, img_url: 'banner4.jpg' },
])
</script>

<template>
    <div class="banner">
        <div class="banner-list">
            <el-carousel height="auto" arrow="never" interval="30000">
                <el-carousel-item v-for="item in bannerlist" :key="item.id" style="height: auto">
                    <img :src="`/src/assets/images/${item.img_url} `" alt="">
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<style scoped>
</style>
