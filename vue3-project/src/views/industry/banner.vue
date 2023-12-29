<script setup>
import {ref} from 'vue'

</script>

<template>
    <div class="industry-banner">
      <div class="content">
        <h1>行业资讯</h1>
        <div class="description">
          <div class="text">
            <p>探索各行各业,行行出状元！</p>
            <p>阅读行业概况,深入了解每个行业的情况,</p>
            <p>计划未来职业和发展前景。</p><br>
            <p>以下20个行业来自中华人民共和国国家标准国民经济行业分类(GB/T 4754—2017)</p>
            <p>由中华人民共和国国家质量监督检验检疫总局及中国国家标准化管理委员会发布。</p>
          </div>
          <img class="image-container" src="@/assets/images/ind_ban_logo.png" alt="三百六十行,行行出状元">
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .industry-banner {
    width: 100%;
    height: 500px;
    background-color: white; /* Adjust the background color as needed */
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
    font-size:18px;
  }
  
  .industry-banner .description img {
    width: 400px; 
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
  transform: scale(1.4); 
}
  </style>