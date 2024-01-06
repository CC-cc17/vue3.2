<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { View } from '@element-plus/icons-vue'


const store = useStore();
const emailFromStore = computed(() => store.state.email);

const signupForm = ref({
  username: '',
  password: '',
  name: '',
  gender: '',
  email: '',
  identity: '',
  agreeTerms: false
});

onMounted(() => {
  signupForm.value.email = emailFromStore.value;
});

const isValidUsername = (username) => /^[a-zA-Z0-9_.]{4,}$/.test(username);

const isValidPassword = {
  minLength: computed(() => signupForm.value.password.length >= 8),
  lowerCase: computed(() => /[a-z]/.test(signupForm.value.password)),
  upperCase: computed(() => /[A-Z]/.test(signupForm.value.password)),
  number: computed(() => /[0-9]/.test(signupForm.value.password)),
  noSequential: computed(() => !/(.)\1\1/.test(signupForm.value.password))
};

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const isValidSignupForm = computed(() => {
  return isValidUsername(signupForm.value.username) &&
    signupForm.value.password.length >= 8 &&
    /[a-z]/.test(signupForm.value.password) &&
    /[A-Z]/.test(signupForm.value.password) &&
    /[0-9]/.test(signupForm.value.password) &&
    !/(.)\1\1/.test(signupForm.value.password) &&
    signupForm.value.name &&
    signupForm.value.gender && // 修正拼写错误
    signupForm.value.agreeTerms &&
    signupForm.value.email;
});

const submitForm = () => {
  if (isValidSignupForm.value) {
    alert('提交注册!');
  } else {
    alert('请检查表单!');
  }
};
</script>

<template>
  <div class="register">
    <el-form :model="signupForm" label-position="top">
      <h2>注册</h2>

      <!-- 用户名部分 -->
      <el-form-item label="用户名" required>
        <el-input v-model="signupForm.username" placeholder="长度至少为4个字符"></el-input>
        <div v-if="signupForm.username && !isValidUsername(signupForm.username)">
          用户名无效。仅可以包含字母、数字和下划线。
        </div>
      </el-form-item>

      <!-- 密码部分 -->
      <el-form-item label="密码" required>
        <el-input :type="showPassword ? 'text' : 'password'" v-model="signupForm.password" placeholder="长度至少为8个字符"
          clearable>
          <template #append>
            <el-button :icon="View" @click="togglePasswordVisibility"></el-button>
          </template>
        </el-input>

        <!-- 密码验证 -->
        <ul class="password-criteria">
          <li :class="{ 'is-valid': isValidPassword.minLength.value }">
            <span class="criteria-icon"></span>至少8个字符长
          </li>
          <li :class="{ 'is-valid': isValidPassword.lowerCase.value }">
            <span class="criteria-icon"></span>至少一个小写字母
          </li>
          <li :class="{ 'is-valid': isValidPassword.upperCase.value }">
            <span class="criteria-icon"></span>至少一个大写字母
          </li>
          <li :class="{ 'is-valid': isValidPassword.number.value }">
            <span class="criteria-icon"></span>至少一个数字
          </li>
          <li :class="{ 'is-valid': isValidPassword.noSequential.value }">
            <span class="criteria-icon"></span>不包含三个或更多连续的字母或数字
          </li>
        </ul>
      </el-form-item>

      <!-- 个人信息部分 -->
      <el-form-item label="姓名" required>
        <el-input v-model="signupForm.name" placeholder="姓名"></el-input>
      </el-form-item>

      <el-form-item label="性别" required>
        <el-radio-group v-model="signupForm.gender">
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="电子邮箱" required>
        <el-input v-model="signupForm.email" placeholder="请输入您的邮箱"></el-input>
      </el-form-item>

      <el-form-item label="您的身份" required>
        <el-radio-group v-model="signupForm.identity">
          <el-radio label="student">学生</el-radio>
          <el-radio label="business_representative">企业代表</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="signupForm.agreeTerms">我已阅读并同意《使用条款》和《隐私政策》。</el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button round color="#2462A8" @click="submitForm" :disabled="!isValidSignupForm">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;
  margin-bottom: 600px;
}

li {
  list-style-type: none;
  /* 去除默认标记 */
}

.el-icon {
  color: #333;
}

.is-valid {
  color: green;
}

.password-criteria li {
  color: gray;
}

.is-valid {
  color: #4CAF50;
}

.criteria-icon {
  height: 10px;
  width: 10px;
  background-color: gray;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}

.is-valid .criteria-icon {
  background-color: #4CAF50;
}</style>