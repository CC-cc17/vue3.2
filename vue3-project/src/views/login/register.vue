<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const emailFromStore = computed(() => store.state.email);

const signupForm = ref({
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  agreeTerms: false
});

const isValidUsername = (username) => /^[a-zA-Z0-9_.]{4,}$/.test(username);

const submitForm = () => {
  if (isValidSignupForm.value) {
    alert('提交注册!');
  } else {
    alert('请检查表单!');
  }
};

const isValidSignupForm = computed(() => {
  // 这里可以添加更多的表单验证逻辑
  return isValidUsername(signupForm.value.username);
});
</script>

<template>
    <div class="register">
      <el-form :model="signupForm" label-position="top">
        <h2>注册</h2>
        <el-form-item label="登录详情">
          <el-form-item label="用户名*" required>
            <el-input v-model="signupForm.username" placeholder="选择一个至少包含四个字符的用户名"></el-input>
            <div v-if="signupForm.username && !isValidUsername(signupForm.username)">
              用户名无效。它必须仅包含字母、数字、下划线或句点。
            </div>
          </el-form-item>
          <el-form-item label="密码*" required>
            <el-input type="password" v-model="signupForm.password" placeholder="密码长度至少为14个字符"></el-input>
            <!-- 密码要求验证结果 -->
          </el-form-item>
        </el-form-item>
        <el-form-item label="个人信息">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名字*" required>
                <el-input v-model="signupForm.firstName" placeholder="名字"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓氏*" required>
                <el-input v-model="signupForm.lastName" placeholder="姓氏"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="电子邮箱地址*" required>
            <el-input v-model="emailFromStore" placeholder="请输入您的邮箱地址"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="signupForm.agreeTerms">我已阅读并同意《使用条款》和《隐私政策》。</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" :disabled="!isValidSignupForm">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>

<style scoped>
  /* 在这里添加你的样式 */
  .register {
    /* 例如 */
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
</style>