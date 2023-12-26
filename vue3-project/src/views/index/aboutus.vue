<script setup>
import { ref } from 'vue'
let piclist = ref([
    { id: 1, img_url: 'pic1.jpg' },
    { id: 2, img_url: 'pic2.jpg' },
    { id: 3, img_url: 'pic3.jpg' },
    { id: 4, img_url: 'pic4.jpg' },
    { id: 5, img_url: 'pic5.jpg' },
])
</script>

<template>
    <div class="container_bg">
        <div class="aboutus">
            <div class="index_title">
                <h3>关于我们</h3>
                <p>探索职业未来，点亮梦想之路</p>
            </div>
            <div class="content">
                <div class="text">
                    <p>  在当前社会，青少年的职业教育和职业规划显得尤为重要，青少年的未来发展直接关系到社会的整体进步。然而实际的情况是，很多青少年对于未来的职业选择缺乏明确的理解和规划。
                    </p>
                    <p>  根据智联招聘发布的《2023大学生就业力调研报告》,2023年的中国高校毕业生人数预计将达到1158万人。调查问卷结果显示,大学生慢就业比例近年来持续攀升,从去年的15.9%上升到今年的18.9%，每五个大学毕业的学生就会有一个是待就业状态。
                    </p>
                    <p>  国内在青少年职业规划的研究相对缺乏。一方面，在现代小家庭小型化的模式下，青少年缺少足够的社会资源和人脉来了解社会的各行各业。另一方面，学校和老师在以升学率为考评标准的背景下，缺乏引导学生探索社会职业的动力和资源。
                    </p>
                    <p>  窗外蓝天是一个职业规划+职业体验匹配的综合性平台，可以有效解决学生对自己未来职业方向的困惑。参考国外职业规划平台的经验，由政府教育部门背书，学校和家长鼓励学生使用这样的平台，从小了解自己的潜力和职业兴趣。这不仅能帮助学生从专业的角度了解一个行业和入职所需的技能，也能帮助企业提前接触到潜在的年轻人才。
                    </p>
                    <p> 从长远的发展来看，青少年有更清晰的职业规划和目标，可以有效避免未来职业选择的迷茫，降低慢就业的情况，从而推动社会的和谐发展。</p>
                </div>
                <div class="image-slider">
                    <el-carousel height="400px" indicator-position="none" width="400px" :autoplay="false" arrow="always">
                        <el-carousel-item v-for="item in piclist" :key="item.id">
                            <img :src="`/src/assets/images/${item.img_url} `" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
        </div>
    </div>
    <div class="timeline">
        <el-timeline>
            <el-timeline-item timestamp="2023/12/12" placement="top">
                <el-card>
                    <h4 style="font-weight: bold;">超过3000青少年完成工作体验项目</h4>
                    <p>第3000名用户 李xx 在12月参与了飞猪旅行的工作体验</p>
                </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2021/11/11" placement="top">
                <el-card>
                    <h4 style="font-weight: bold;">500家企业注册工作体验岗位</h4>
                    <p>KFC王经理:这个计划很有意义！</p>
                </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2020/9/9" placement="top">
                <el-card>
                    <h4 style="font-weight: bold;">第一位青少年完成工作体验项目</h4>
                    <p>第一位学员 陈XX 于2020年9月9日 09:09分注册了账户</p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<style scoped>
/* 内容区域的布局 */
.content {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
/* 左边的正文部分 */
.text {
    flex: 1;
    padding-right: 20px;
}
.text p {
    margin-bottom: 1em;
    line-height: 1.6;
    text-align: justify;
}
/* 右边的滚动图片部分 */
.image-slider {
    flex: 1;
    margin: auto;
    object-fit: cover;
    background-color: #fff;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
}
.timeline {
    border-radius: 10px
}
</style>
