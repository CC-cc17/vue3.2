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
            <el-carousel height="auto" arrow="never" interval="3000">
                <el-carousel-item v-for="item in bannerlist" :key="item.id" style="height: auto">
                    <img :src="`/src/assets/images/${item.img_url} `" alt="">
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<style scoped>
.banner img {
    width: 100%; /* 使图片宽度响应式地填满容器宽度 */
    height: auto; /* 保持图片的原始宽高比 */
    display: block; /* 避免图片底部的空白间隙 */
}
.banner {
    max-height: 500px; /* 设置一个最大高度 */
    overflow: hidden; /* 超出部分隐藏 */
}
/* 针对屏幕宽度小于768px的设备 */
@media (max-width: 768px) {
    .banner {
        max-height: 300px;
    }
}

/* 针对屏幕宽度小于480px的设备 */
@media (max-width: 480px) {
    .banner {
        max-height: 200px;
    }
}
</style>
