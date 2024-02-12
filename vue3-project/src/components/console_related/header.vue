<script>
import {computed} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
    setup() {
        let store = useStore()
        const getImgSrc = (user) => {
            return new URL(`../../assets/images/${user}.png`, import.meta.url).href;
        };
        let handleCollapse = () => {
            store.commit('updateIsCollapse');
        };
        // 计算属性
        const current = computed(()=>{
            return store.state.currentMenu;
        });
        const router = useRouter()
        const handleLogout = () => {
            store.commit("cleanMenu");
            router.push({
                name:"reallogin",
            });
        }
        return {
            getImgSrc,
            handleCollapse,
            current,
            handleLogout,
        };
    }
};
</script>


<template>
    <el-header>
        <div class="l-content">
            <!-- 图标 -->
            <el-button size="small" plain @click="handleCollapse">
                <el-icon :size="20">
                    <Menu />
                </el-icon>
            </el-button>
            <el-breadcrumb separator="/" class="bread">
                <!-- 首页一定存在 -->
                <el-breadcrumb-item :to="{ path: '/console/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="current.path" v-if="current">
                    {{ current.label }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="user" :src="getImgSrc('user')" alt="">
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click="handleLogout">登出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template> 

<style lang="less" scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: #333;
}

.r-content .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.l-content {
    display: flex;
    align-items: center;

    .el-button {
        margin-right: 20px;
    }
}

h3 {
    color: #fff;
    font-weight: normal;
}
:deep(.bread span) {
    color: #fff !important;
    cursor:  pointer !important;
}
</style>