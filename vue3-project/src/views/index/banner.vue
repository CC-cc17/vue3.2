<script setup>
import { ref } from 'vue'
let bannerlist = ref([
    { id: 1, img_url: 'banner1.jpg' },
    { id: 2, img_url: 'banner2.jpg' },
    { id: 3, img_url: 'banner3.jpg' },
    { id: 4, img_url: 'banner4.jpg' },
])
import { PhoneFilled,BrushFilled,Avatar } from '@element-plus/icons-vue'
</script>

<template>
    <div class="banner">
        <div class="banner-list">
            <el-carousel height="600px" arrow="never" >
                <el-carousel-item v-for="item in bannerlist" :key="item.id" style="height: 600px;">
                    <img :src="`/src/assets/images/${item.img_url} `" alt="">
                </el-carousel-item>
                <div class="indexForm">
                    <div class="form_bg">
                        <div class="form_head">
                            <b>免费获取</b>家装报价
                        </div>
                        <div class="regform">
                            <el-input 
                                v-model="input1" 
                                class="w-50 m-2" 
                                size="large" 
                                placeholder="请输入姓名"
                                :prefix-icon="Avatar" 
                            />
                            <el-input 
                                v-model="input1" 
                                class="w-50 m-2" 
                                size="large" 
                                placeholder="请输入电话"
                                :prefix-icon="PhoneFilled" 
                            />
                            <el-input 
                                v-model="input1" 
                                class="w-50 m-2" 
                                size="large" 
                                placeholder="请输入装修面积"
                                :prefix-icon="BrushFilled" 
                            />
                            <el-button color="var(--bgcolor)">获取报价</el-button>
                        </div>
                        <div class="privacy">
                            <input type="checkbox" class="checkbox-type"/>
                            <span>已经阅读并同意《用户私隐保护协议》</span>
                        </div>
                    </div>
                </div>
            </el-carousel>
            <div class="banner-item">
                <img src="@/assets/images/footerbottom.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<style scoped></style>
