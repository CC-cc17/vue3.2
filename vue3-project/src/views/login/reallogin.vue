<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import { View } from '@element-plus/icons-vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// 表单数据和规则
const loginForm = reactive({
  username: '',
  password: '',
})

const rules = {
  username: [{ required: true, message: '请输入账号名称', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const { proxy } = getCurrentInstance()
const store = useStore()
const router = useRouter()
//login方法
const login = async () => {
  const res = await proxy.$api.userLogin(loginForm);
  if (res.code === 200) {
    // 将token存储在vuex里
    store.commit('setToken', res.data.token);
    // 把token存到cookie里
    document.cookie = `token=${res.data.token}; path=/`;

    // 根据token获取左侧菜单信息
    const menuRes = await proxy.$api.getMenu({ token: res.data.token });
    console.log(menuRes.data)
    store.commit('setMenu', menuRes.data.menu);
    store.commit('addMenu', router);
  }

  router.push({
    name: "home",
  });
};

// 弹窗状态
const dialogVisible = ref(false)
const emailForm = reactive({ email: '' })

// 展示密码
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// 发送忘记密码请求的逻辑
const sendResetPassword = () => {
  console.log('发送邮件到:', emailForm.email)
  dialogVisible.value = false
}
</script>

<template>
  <div class="overlay">
    <div class="login-container">
      <el-card class="login-card">
        <h2 class="title">系统登录</h2>
        <el-form class="login-form" :model="loginForm" :rules="rules" label-position="top">

          <el-form-item label="账号" prop="username">
            <el-input type="input" v-model="loginForm.username" placeholder="请输入账号"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input :type="showPassword ? 'text' : 'password'" v-model="loginForm.password" placeholder="请输入密码"
              clearable>
              <template #append>
                <el-button :icon="View" @click="togglePasswordVisibility"></el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button round color="#2462A8" @click="login">登录</el-button>
          </el-form-item>
          <div class="options">
            <a href="#" class="forgot-password" @click.prevent="dialogVisible = true">忘记密码</a>
          </div>
        </el-form>
      </el-card>
    </div>
    <el-dialog title="忘记密码" v-model="dialogVisible" width="400px">
      <div class="reset-password-instructions">我们将发送密码到注册邮箱。</div>
      <el-form :model="emailForm">
        <el-form-item label="邮箱地址">
          <el-input v-model="emailForm.email" placeholder="请输入注册邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button round color="#2462A8" @click="sendResetPassword">发送</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped>
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("../../assets/images/loginbackground.png"); /* 替换为你的图片路径 */
  background-size: cover; /* 覆盖整个容器 */
  background-position: center; /* 图片居中显示 */
  background-repeat: no-repeat; /* 不重复图片 */
  position: relative;
}

.login-container {
  z-index: 2;
}

.login-card {
  width: 400px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
}

.login-form {
  width: 100%;
}

.options {
  text-align: right;
}

a.forgot-password {
  color: #777;
  text-decoration: underline;
  cursor: pointer;
}

.el-dialog__wrapper {
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.reset-password-instructions {
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
  text-align: center;
}
</style>