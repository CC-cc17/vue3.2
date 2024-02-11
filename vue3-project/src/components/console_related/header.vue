<script>
import {useStore} from 'vuex';
export default {
    setup() {
        let store = useStore()
        const getImgSrc = (user) => {
            return new URL(`../../assets/images/${user}.png`,import.meta.url).href;
        };
        let handleCollapse = ()=>{
            store.commit('updateIsCollapse');
        }
        return {
            getImgSrc,
            handleCollapse
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
            <h3>首页</h3>
        </div>  
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="user" :src="getImgSrc('user')" alt="">
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>登出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template> 

<style lang="less">
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
    .el-button{
        margin-right: 20px;
    }
}
 h3{
 color: #fff;
 font-weight: normal;
}

</style>