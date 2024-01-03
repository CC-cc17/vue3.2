<script setup>
import { ref } from 'vue'

</script>

<template>
  <div class="industry-banner">
    <div class="content">
      <h1>性格测试</h1>
      <div class="description">
        <div class="text">
          <p>发掘个性之光，职场定位更明晰！</p>
          <p>通过性格+职业倾向测试，深入挖掘个人特质和职业偏好，</p>
          <p>指引你规划职业道路，找到最匹配的行业归属。</p><br>
          <p>本测试依托专业心理学理论和市场职业数据，</p>
          <p>让我们一起探索，找到你的独特职业路径！</p>
        </div>
        <img class="image-container" src="@/assets/images/test_logo.png" alt="执政官ESFJ-A/ESFJ-T">
      </div>
    </div>
  </div>
</template>
  
<style scoped>
.industry-banner {
  width: 100%;
  height: 500px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.industry-banner .content h1 {
  color: black;
}

.industry-banner .description {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.industry-banner .description .text {
  margin-right: 20px;
  font-size: 18px;
}

.industry-banner .description img {
  width: 250px;
  height: auto;
}

.industry-banner .additional-info {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  background-color: #2462a8;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
  font-size: 30px;
  border-radius: 30px;
}

.image-container {
  transition: transform 0.4s ease;
}

.image-container:hover {
  transform: scale(1.2);
}
</style>