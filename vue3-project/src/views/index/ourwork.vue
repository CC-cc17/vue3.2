<script setup>
import { ref, computed } from 'vue'
let workItems = ref([
  { title: '行业资讯', description: '提供最新的行业趋势和重要信息' },
  { title: '职业答疑', description: '帮助青少年了解职业路径及相关学科' },
  { title: '工作配对', description: '为青少年和企业提供精确的职位匹配服务' }
])

const currentActiveIndex = ref(0);

// 模拟时间线上索引的激活状态
const isItemActive = index => index <= currentActiveIndex.value;

// 模拟时间线的自动激活逻辑
setInterval(() => {
  if (currentActiveIndex.value < workItems.value.length - 1) {
    currentActiveIndex.value++;
  } else {
    currentActiveIndex.value = 0;
  }
}, 3000); // 每3秒激活下一个项目

</script>

<template>
  <div class="container_bg">
    <div class="our-work">
      <div class="index_title">
        <h3>我们的工作</h3>
      </div>
      <div class="timeline horizontal-timeline">
        <div class="timeline-item" v-for="(item, index) in workItems" :key="index"
          :class="{ 'active': isItemActive(index) }">
          <div class="timeline-content">
            <h5>{{ item.title }}</h5>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.our-work {
  margin-top: 40px;
  padding: 50px;
}

.horizontal-timeline {
  display: flex;
  overflow-x: space-between;
  padding-left: 0;
}

.timeline-item {
  flex: 1;
  margin: 10px;
  text-align: center;
  transition: transform 0.3s ease;
  cursor: pointer;
  box-sizing: border-box;
}

.timeline-item:hover {
  transform: scale(1.1);
  /* 鼠标悬停时放大 */
  color: #2462a8;
}


.timeline-content h5 {
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 18px;
}
</style>
