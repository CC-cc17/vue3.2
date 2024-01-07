<script setup>
import { ref } from 'vue'
</script>

<template>
  <div class="article-container">
    <!-- Banner 图片 -->
    <div class="banner"></div>

    <!-- 资源部分 -->
    <div class="job-resources">
      <h1>求职资源</h1>
      <p>求职的路上总是需要引路人,而不同的阶段总会遇到不同的问题。</p>
      <p>窗外蓝天计划提供一系列文档来协助你。以下的文档均由业内专业人士撰写。</p>
      <div class="templates">
        <h2>各类模板</h2>
        <div class="blank"></div>
        <h3>简历模板</h3>
        <ul>
          <li><a href="Resume" download="学生简历模板.docx">学生简历模板.docx</a></li>
          <li><a href="@/assets/graduate-resume.docx" download="大学生简历模板.docx">大学生简历模板.docx</a></li>
          <li><a href="@/assets/graduate-resume.docx" download="应届生简历模板.docx">应届生简历模板.docx</a></li>
        </ul>
        <h3>求职信模板</h3>
        <ul>
          <li><a href="@/assets/student-resume.docx" download="学生求职信.docx">学生求职信.docx</a></li>
          <li><a href="@/assets/graduate-resume.docx" download="应届生求职信.docx">大学毕业生个人简介.docx</a></li>
        </ul>

        <div class="blank2"></div>

        <h2>参考文件</h2>
        <div class="blank"></div>
        <h3>求职相关</h3>
        <ul>
          <li><a href="@/assets/student-resume.docx" download="如何找工作?.docx">如何找工作?.docx</a></li>
          <li><a href="@/assets/graduate-resume.docx" download="回应人士招聘的五个诀窍.docx">回应人士招聘的五个诀窍.docx</a></li>
        </ul>
        <h3>面试相关</h3>
        <ul>
          <li><a href="@/assets/student-resume.docx" download="面试技巧.docx">面试技巧.docx</a></li>
          <li><a href="@/assets/graduate-resume.docx" download="如何准备面试.docx">如何准备面试.docx</a></li>
        </ul>
        <h3>职业规划相关</h3>
        <ul>
          <li><a href="@/assets/student-resume.docx" download="职业规划的3个建议.docx">职业规划的3个建议.docx</a></li>
          <li><a href="@/assets/graduate-resume.docx" download="职业规划导图.docx">职业规划导图.docx</a></li>
        </ul>
      </div>
    </div>

    <!-- 分享标题和横线 -->
    <div class="share-header">
      <hr class="share-line" />
      <p class="share-text">分享至：</p>
    </div>

    <!-- 分享按钮 -->
    <div class="share-options">
      <el-button class="share-btn qq" circle>
        <font-awesome-icon :icon="['fab', 'qq']" style="color: white;" />
      </el-button>
      <el-button class="share-btn wechat" circle>
        <font-awesome-icon :icon="['fab', 'weixin']" style="color: white;" />
      </el-button>
      <el-button class="share-btn douyin" circle>
        <font-awesome-icon :icon="['fab', 'tiktok']" style="color: white;" />
      </el-button>
      <el-button class="share-btn weibo" circle>
        <font-awesome-icon :icon="['fab', 'weibo']" style="color: white;" />
      </el-button>
    </div>
  </div>
</template>

  
<style scoped>
.article-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-bottom: 300px;
}

.banner {
  height: 300px;
  background-image: url('@/assets/images/articlebanner.jpg');
  background-size: cover;
  background-position: center;
}

.job-resources {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.templates {
  margin-top: 20px;
  padding: 30px;
}

ul {
  list-style: none;
  padding: 10px;
}

ul li a {
  color: #3399ff;
  text-decoration: none;
}

.blank {
  padding: 5px;
}

.blank2 {
  padding: 20px;
}

.share-header {
  text-align: center;
  margin-bottom: 10px;
}

.share-line {
  border: 0;
  height: 1px;
  background-color: #ccc;
  margin-bottom: 10px;
  width: 50%; 
  margin: 0 auto;
  display: block;
}

.share-text {
  margin-bottom: 10px;
  color: #333;
  font-size: 16px;
}

.share-options {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.share-btn {
  margin: 0 10px;
  font-size: 24px;
  border: none;
}

.share-btn.el-button--circle {
  padding: 20px;
}

.qq {
  background-color: #1d4599;
}

.wechat {
  background-color: #1aad19;
}

.douyin {
  background-color: #000000;
}

.weibo {
  background-color: #ff8200;
}
</style>