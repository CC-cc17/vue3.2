<script setup>
import { ref } from 'vue'

// 这里定义了一个响应式的数组，包含了三个测试的信息，每项包括id、标题、图片路径和路由
const industries = ref([
    { id: 1, title: 'MBTI测试', imagePath: 'src/assets/images/industries/1.jpg', route: '/industry/1' },
    { id: 2, title: '霍兰德职业测试', imagePath: 'src/assets/images/industries/2.jpg', route: '/industry/2' },
    { id: 3, title: '布里格斯性格测试', imagePath: 'src/assets/images/industries/3.jpg', route: '/industry/3' },
]);
</script>

<template>
    <div>
        <div class="card">
            <!-- 卡片容器 -->
            <div class="cards-container">
                <!-- 标题提示用户选择感兴趣的测试 -->
                <h3>请从下面选择您有兴趣的测试</h3>
                <!-- 使用Element UI的栅格系统来排列卡片 -->
                <el-row :gutter="40">
                    <!-- 循环遍历行业信息数组来动态创建卡片 -->
                    <el-col v-for="industry in industries" :key="industry.id" :span="8" class="industry-col" :style="{ marginBottom: '40px' }">
                        <!-- 路由链接，点击会导航到对应的测试页面 -->
                        <router-link :to="industry.route">
                            <!-- 卡片组件，hover时会有阴影效果 -->
                            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                <!-- 测试图片 -->
                                <img :src="industry.imagePath" class="image" alt="Industry Image" />
                                <!-- 卡片标题 -->
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
/* 外层卡片的样式，包含内边距和下边距 */
.card{
    padding: 50px;
    margin-bottom: 200px;
}
/* 卡片容器的样式，包含内边距 */
.cards-container {
    padding: 20px;
}

/* 图片的样式，设定了高度、宽度、显示、圆角和图片填充模式 */
.image {
    height: 200px;
    width: 100%;
    display: block;
    border-radius: 5px;
    object-fit: cover
}

/* 卡片内容的样式，包含内边距 */
.card-content {
    padding: 10px;
}

/* Element UI卡片组件的样式，设定了鼠标指针样式和过渡效果 */
.el-card {
    cursor: pointer;
    transition: transform 0.3s ease;
}

/* 当鼠标悬停在卡片上时，卡片会向上移动5px */
.el-card:hover {
    transform: translateY(-5px);
}

/* 卡片标题的样式，包含字体加粗、字体大小和文本装饰 */
.card-title {
    font-weight: bold;
    font-size: 20px;
    text-decoration: none;
}
</style>