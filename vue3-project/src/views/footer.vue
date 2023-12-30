<script setup>
import { ref } from 'vue'
let footerlist = ref([
    {
        title: '关于我们',
        list: ['部门简介', '部门文化', '发展历程', '荣誉资质', '人才策略']
    },
    {
        title: '产品中心',
        list: ['新品发布', '技术支持']
    },
    {
        title: '新闻中心',
        list: ['最新动态', '部门新闻', '媒体报道']
    },
])
const value1 = ref(null)
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']) 
</script>

<template>
    <div class="footer">
        <div class="footer-list">
            <div class="footer-left">
                <ul>
                    <li v-for="(v, i) in footerlist" :key="i">
                        <p>{{ v.title }}</p>
                        <a href="#" v-for="(item, i) in v.list" :key="i">{{ item }}</a>
                    </li>
                </ul>
            </div>
            <div class="rating">
                <div class="demo-rate-block">
                    <span class="demonstration">为此网站打分<br><br>
                        感谢您的意见
                    </span>
                    <el-rate v-model="value1" :colors="colors" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.footer {
    background-color: #333;
    padding: 30px 0;
}

.footer-list {
    width: 1280px;
    margin: auto;
    display: flex;
    justify-content: space-between;
}

.footer-left ul {
    display: flex;
}

.footer-left ul li {
    width: 220px;
}

.footer-left ul li p {
    color: #fff;
    font-size: 16px;
    line-height: 30px;
}

.footer-left ul li a {
    display: block;
    color: #a2a2a2;
    line-height: 26px;
    text-decoration: none;
}

.rating {
    display: flex;
    align-items: center;
    justify-content: center;
}

.rating::before {
    content: "";
    display: block;
    width: 1px;
    height: 150px;
    background-color: grey;
    margin-right: 150px;
}

.demo-rate-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
}

.demo-rate-block .demonstration {
    color: white;
    font-size: 20px;
    margin-bottom: 10px;
}

.el-rate {
    font-size: 50px;
}

.el-rate .el-rate__item span {
    transform: scale(10);
}</style>
