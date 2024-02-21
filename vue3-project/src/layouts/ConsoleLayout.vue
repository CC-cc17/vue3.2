<script setup>
import { ref } from 'vue';
import Header from '../components/console_related/header.vue';
import Aside from '../components/console_related/aside.vue';
import Tab from '../components/console_related/tab.vue';


</script>

<template>
    <div class="common-layout">
        <el-container class="lay-container">
            <!-- 侧边栏 -->
            <Aside />
            <el-container>
                <!-- 头部 -->
                <Header />
                <Tab />
                <el-main class="right-main">
                    <!-- 内容 -->
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<style lang="less" scoped>
.el-container {
    flex-wrap: wrap;
    align-items: flex-start;
    height: 100%;
  }
  .common-layout {
    .lay-container {
      flex-wrap: nowrap;
      .right-main {
        height: calc(100% - 50px) !important;
      }
    }
    height: 100%;
    & > .el-container {
      height: 100%; 
      & > .el-aside {
        height: 1000px;
        background: #545c64;
      }
    }
  }
</style>
