<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router'
let headlist = ref([
    {title:'首页',path:'/index'},
    {title:'行业信息',path:'/industry'},
    {title:'参考资料',path:'/article'},
    {title:'性格测试',path:'/test'},

])
const router = useRouter()
const handleLogin = () => {
  router.push('/login'); 
};
</script>

<template>
    <div class="header">
        <div class="header-list">
            <div class="header-top">
                <div class="logo">
                    <a href="#" title="窗外蓝天"></a>
                </div>
                <ul class="header-menu">
                    <li v-for="(v,i) in headlist" :key="i">
                        <router-link :to="v.path">
                        <span>{{v.title}}</span>
                        </router-link>
                    </li>
                </ul>
                <div class="header-right">
                <el-button color='#2462a8' type="primary" @click="handleLogin">登录/注册</el-button>
                </div>
            </div>
        </div>
    </div>
    
</template>

<style scoped>

</style>