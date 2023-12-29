<script setup>
import { ref } from 'vue'

// 行业信息,图片没压缩

const industries = ref([
    { id: 1, title: '农、林、牧、渔业', imagePath: 'src/assets/images/industries/1.jpg', route: '/industry/agriculture' },
    { id: 2, title: '采矿业', imagePath: 'src/assets/images/industries/2.jpg', route: '/industry/mining' },
    { id: 3, title: '制造业', imagePath: 'src/assets/images/industries/3.jpg', route: '/industry/mining' },
    { id: 4, title: '电力、热力、燃气及水生产和供应业', imagePath: 'src/assets/images/industries/4.jpg', route: '/industry/mining' },
    { id: 5, title: '建筑业', imagePath: 'src/assets/images/industries/5.jpg', route: '/industry/mining' },
    { id: 6, title: '批发和零售业', imagePath: 'src/assets/images/industries/6.jpg', route: '/industry/mining' },
    { id: 7, title: '交通运输、仓储和邮政业', imagePath: 'src/assets/images/industries/7.jpg', route: '/industry/mining' },
    { id: 8, title: '住宿和餐饮业', imagePath: 'src/assets/images/industries/8.jpg', route: '/industry/mining' },
    { id: 9, title: '信息传输、软件和信息技术服务业', imagePath: 'src/assets/images/industries/9.jpg', route: '/industry/mining' },
    { id: 10, title: '金融业', imagePath: 'src/assets/images/industries/10.jpg', route: '/industry/mining' },
    { id: 11, title: '房地产业', imagePath: 'src/assets/images/industries/11.jpg', route: '/industry/mining' },
    { id: 12, title: '租赁和商务服务业', imagePath: 'src/assets/images/industries/12.jpg', route: '/industry/mining' },
    { id: 13, title: '科学研究和技术服务业', imagePath: 'src/assets/images/industries/13.jpg', route: '/industry/mining' },
    { id: 14, title: '水利、环境和公共设施管理业', imagePath: 'src/assets/images/industries/14.jpg', route: '/industry/mining' },
    { id: 15, title: '居民服务、修理和其他服务业', imagePath: 'src/assets/images/industries/15.jpg', route: '/industry/mining' },
    { id: 16, title: '教育', imagePath: 'src/assets/images/industries/16.jpg', route: '/industry/mining' },
    { id: 17, title: '卫生和社会工作', imagePath: 'src/assets/images/industries/17.jpg', route: '/industry/mining' },
    { id: 18, title: '文化、体育和娱乐业', imagePath: 'src/assets/images/industries/18.jpg', route: '/industry/mining' },
    { id: 19, title: '公共管理、社会保障和社会组织', imagePath: 'src/assets/images/industries/19.jpg', route: '/industry/mining' },
    { id: 20, title: '国际组织', imagePath: 'src/assets/images/industries/20.jpg', route: '/industry/mining' },
]);

</script>

<template>
    <div>
        <div class="card">
            <div class="cards-container">
                <h3>请从下面选择您有兴趣的行业</h3>
                <el-row :gutter="40">
                    <el-col v-for="industry in industries" :key="industry.id" :span="8" class="industry-col"
                        :style="{ marginBottom: '40px' }">
                        <router-link :to="industry.route">
                            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                <img :src="industry.imagePath" class="image" alt="Industry Image" />
                                <div style="padding: 14px">
                                    <span class="card-title">{{ industry.title }}</span>
                                </div>
                            </el-card>
                        </router-link>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card{
    padding: 50px;
    margin-bottom: 200px;
}
.cards-container {
    padding: 20px;
}

.image {
    height: 200px;
    width: 100%;
    display: block;
    border-radius: 5px;
    object-fit: cover
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
}</style>
