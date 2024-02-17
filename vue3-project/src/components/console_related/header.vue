<script>
import { computed, ref, onMounted, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
    setup() {
        const { proxy } = getCurrentInstance();
        let store = useStore()
        const getImgSrc = (user) => {
            return new URL(`../../assets/images/${user}.png`, import.meta.url).href;
        };
        let handleCollapse = () => {
            store.commit('updateIsCollapse');
        };
        // 计算属性
        const current = computed(() => {
            return store.state.currentMenu;
        });
        const router = useRouter()
        const handleLogout = () => {
            store.commit("cleanMenu");
            store.commit("clearToken")
            router.push({
                name: "reallogin",
            });
        };
        const dialogVisible = ref(false)

        const handleClose = (done) => {
            ElMessageBox.confirm('确定关闭吗？', '关闭确认', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    done(); // 用户点击确认，执行关闭对话框的操作
                })
                .catch(() => {
                    // 用户点击取消，或者执行了其他取消操作，如点击遮罩层或按下ESC键
                    // 这里不需要执行任何操作，因为对话框会保持打开状态
                });
        };

        // 用户表单数据
        const userForm = ref({
            username: '',
            phone: '',
            email: '',
            password: ''
        });

        // 加载用户信息
        const loadUserInfo = async () => {
            try {
                const token = store.state.token;
                let res = await proxy.$api.getUserInfo({token: token});
                userForm.value = res.data; 
            } catch (error) {
                console.error('无法获取用户信息:', error);
            }
        };

        // 更新用户信息
        const updateUserInfo = async () => {
            try {
                await proxy.$api.updateUserInfo(userForm.value);
                dialogVisible.value = false; // 关闭对话框
                ElMessage.success('用户信息已更新');
            } catch (error) {
                console.error('用户信息更新失败:', error);
            }
        };

        onMounted(loadUserInfo);


        return {
            getImgSrc,
            handleCollapse,
            current,
            dialogVisible,
            handleLogout,
            handleClose,
            userForm,
            updateUserInfo
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
                        <el-dropdown-item @click="dialogVisible = true">账户管理</el-dropdown-item>
                        <el-dropdown-item @click="handleLogout">登出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
    <!-- 个人中心弹窗 -->
    <el-dialog v-model="dialogVisible" title="账户管理" width="500" :before-close="handleClose">
        <p style="margin-bottom: 20px">请在下方输入需要更新的账号信息</p>
        <el-form :model="userForm">
            <el-form-item label="用户名">
                <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="userForm.phone" />
            </el-form-item>
            <el-form-item label="Email">
                <el-input v-model="userForm.email" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="userForm.password" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    更新
                </el-button>
            </div>
        </template>
    </el-dialog>
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
    cursor: pointer !important;
}

.el-dialog {
    z-index: 2000;
    /* 根据需要调整这个值 */
}
</style>