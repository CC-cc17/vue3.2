<script setup>
import {ref} from 'vue'

</script>

<template>
    <div class="industry-banner">
      <div class="content">
        <h1>行业标题</h1>
        <div class="description">
          <div class="text">
            <p>这是第一个段落的内容。</p>
            <p>这是第二个段落的内容。</p>
          </div>
          <img src="@/assets/images/logo.png" alt="描述性图片">
        </div>
        <div class="additional-info">
          <p>这里是一些额外的信息。</p>
          <img src="@/assets/images/logo.png" alt="装饰性图片">
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .industry-banner {
    width: 100%;
    height: 450px;
    background-color: #f5f5f5; /* Adjust the background color as needed */
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
    margin-bottom: 30px; /* Adjust as needed */
  }
  
  .industry-banner .description .text {
    margin-right: 20px; /* Adjust the space between the text and the image */
  }
  
  .industry-banner .description img {
    width: 100px; /* Adjust as needed */
    height: auto;
  }
  
  .industry-banner .additional-info {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% / 3);
    background-color: #2462a8;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px; /* Adjust as needed */
  }
  
  .industry-banner .additional-info img {
    width: 50px; /* Adjust as needed */
    height: auto;
    margin-left: 20px; /* Adjust the space between the text and the image */
  }
  </style>