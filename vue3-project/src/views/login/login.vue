<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const email = ref('');
const router = useRouter();
const store = useStore(); 

const register = () => {
  store.commit('setEmail', email.value);
  router.push('/register');
};
const login = () => {
  store.commit('setEmail', email.value);
  router.push('/reallogin');
};
</script>

<template>
    <div class="login-banner">
      <div class="content">
        <h1>加入窗外蓝天</h1>
        <div class="description-and-login">
          <div class="description">
            <p>开启生涯规划的第一步！探索各行各业,体验理想工作。</p>
            <p>记录自己的成长轨迹,发展自己的无限潜力。</p>
            <p>点击下方注册按钮，让我们的旅程从这里开始!</p><br>
            <h2 class="email-title">输入邮箱地址</h2>
            <p class="email-description">填写邮箱地址来注册或者登录平台</p>
            <el-input v-model="email" placeholder="请输入您的邮箱地址"></el-input>
            <div class="buttons">
              <el-button  round color='#2462a8' @click="login">登录</el-button>
              <el-button round type="success" @click="register">注册</el-button>
            </div>
          </div>
          <img class="image-container" src="@/assets/images/loginlogo.jpg" alt="logo">
        </div>
      </div>
    </div>
</template>
  
<style scoped>
.login-banner {
  width: auto;
  height: 500px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 50px;
  margin-bottom: 600px; /* Add extra space at the bottom */
}

.login-banner .content h1 {
  color: black;
}

.login-banner .description-and-login {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.login-banner .description {
  flex: 1;
  margin-right: 20px;
  font-size: 18px;
  text-align: left;
}

.image-container {
  width: 500px;
  height: auto;
  margin-left: 300px;
}

.buttons {
  margin-top: 20px; /* Add some space above the buttons */
}

.el-button {
  font-size: 1.1em; 
  padding: 10px 30px; 
}

</style>