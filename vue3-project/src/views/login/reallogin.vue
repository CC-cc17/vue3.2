<script setup>
import { ref, reactive } from 'vue'

// 表单数据和规则
const form = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [{ required: true, message: '请输入账号名称', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const loginFormRef = ref(null)

// 弹窗状态
const dialogVisible = ref(false)
const emailForm = reactive({ email: '' })

// 登录逻辑
const login = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      console.log('登录...')
    } else {
      console.log('请检查登录表单！')
    }
  })
}

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
        <h2 class="title">登录</h2>
        <el-form class="login-form" :model="form" :ref="loginFormRef" :rules="rules" label-position="top">
          <el-form-item label="账号名称" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号名称"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
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
  background-color: rgba(255, 255, 255, 0.8);
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