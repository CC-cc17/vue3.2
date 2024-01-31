<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import industriesData from './industriesData.json';

    const industryData = ref({}); 
    const route = useRoute();
    const router = useRouter();

    onMounted(() => {
      const industryId = parseInt(route.params.id, 10); 
      if (industryId >= 1 && industryId <= 20) {
        const data = getIndustryDataById(industryId);
        if(data) {
          industryData.value = data;
        } else {
          router.push('/industry');
        }
      } else {
        router.push('/industry');
      }
    });
    function getIndustryDataById(id) {
      return industriesData[id] || null; 
    }

</script>

<template>
  <div class="industrytitle">
    <h1>{{ industryData.title }}</h1>
    <div class="industry-intro">
      <h3>行业综述</h3>
      <p>{{ industryData.intro }}</p>
    </div>
    <div class="industry-banner">
      <img :src="industryData.bannerImage" alt="行业图片" />
    </div>
    <div class="industry-info">
      <div class="jobs">
        <h3>相关职业</h3>
        <ul>
          <li v-for="job in industryData.jobs" :key="job">{{ job }}</li>
        </ul>
      </div>
      <div class="prospects">
        <h3>行业前景</h3>
        <p>{{ industryData.prospects }}</p>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
.industrytitle {
  padding: 20px;
  text-align: center;
  font-size: large;
}
.industrytitle h1{
  padding: 20px;
}
.industry-intro {
  padding: 20px;
  background-color: white;
  color: black;
  margin: 0 auto;
  height: 200px;
  width: 1200px;
  text-align: left;
  font-size: 20px;
}
.industry-intro .h3 .intro-text {
  text-align: left;
}
.industry-banner {
  justify-content: center;
  display: flex;
}
.industry-banner img {
  margin: 0 auto;
  padding: 20px;
  height: 440px;
  width: 1240px;
  object-fit: fill;
}

/* 资料简介 */
.industry-info{
  display: flex;
  text-align: left;
  justify-content: center;
}
.industry-info .jobs,
.industry-info .prospects {
  padding: 20px;
  height: 300px;
  width: 580px;
}
.industry-info .jobs {
  background-color: white;
  color: black;
}
.industry-info .prospects {
  background-color: grey;
  color: white;
}
.jobs ul {
  list-style-type: none; /* 移除默认的列表符号 */
  padding: 0; /* 移除默认的内边距 */
}
.jobs li {
  margin-bottom: 0.5em; /* 每个列表项之间的空间 */
  font-size: 20px;
}
.prospects p{
  padding: 3px;
}
</style>