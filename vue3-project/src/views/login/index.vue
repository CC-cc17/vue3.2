<template>
    <div class="login-container">
      <el-card class="login-card">
        <h1 class="login-title">Login</h1>
        <el-form class="login-form" :model="loginForm" ref="loginForm">
          <el-form-item label="Username" prop="username">
            <el-input v-model="loginForm.username" placeholder="Enter your username"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="Enter your password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">Login</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f7fa;
  }
  
  .login-card {
    width: 400px;
    padding: 20px;
  }
  
  .login-title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .login-form {
    width: 100%;
  }
  </style>
  
  <script setup>
  import { ref } from 'vue';
  
  const loginForm = ref({
    username: '',
    password: '',
  });
  
  const submitForm = () => {
    // Add your logic to handle form submission here
    // Example: You can make an API call to authenticate the user
    // Once the authentication is successful, you can redirect the user to another page
    console.log("Login form submitted!");
  };
  </script>