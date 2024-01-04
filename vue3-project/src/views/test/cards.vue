<script setup>
import { ref } from 'vue'

const industries = ref([
    { id: 1, title: 'MBTI测试', imagePath: 'src/assets/images/mbtilogo.jpg', route: 'https://www.16personalities.com/ch' },
    { id: 2, title: '霍兰德职业测试', imagePath: 'src/assets/images/holandlogo.jpg', route: 'https://hollandsds.com/' },
    { id: 3, title: '青年人格测验', imagePath: 'src/assets/images/youthlogo.jpg', route: 'https://www.xmcs.cn/x/cpi' },
]);
</script>

<template>
    <div>
        <div class="card">
            <div class="cards-container">
                <h3>请从下面选择您有兴趣的测试</h3>
                <el-row :gutter="40">
                    <el-col v-for="industry in industries" :key="industry.id" :span="8" class="industry-col" :style="{ marginBottom: '40px' }">
                        <a :href="industry.route" target="_blank">
                            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                <img :src="industry.imagePath" class="image" alt="Industry Image" />
                                <div style="padding: 14px">
                                    <span class="card-title">{{ industry.title }}</span>
                                </div>
                            </el-card>
                        </a>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card{
    padding: 50px;
    margin-bottom: 500px;
}
.cards-container {
    padding: 20px;
}
.image {
    height: 200px;
    width: 100%;
    display: block;
    border-radius: 5px;
    object-fit: cover;
}
.card-content {
    padding: 10px;
}
.el-card {
    cursor: pointer;
    transition: transform 0.3s ease;
}
.el-card:hover {
    transform: translateY(-5px);
}
.card-title {
    font-weight: bold;
    font-size: 20px;
    text-decoration: none;
}
</style>