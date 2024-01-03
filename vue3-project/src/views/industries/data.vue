<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { CountTo } from 'vue3-count-to'
import * as echarts from 'echarts';

let barChartInstance = null;
let lineChartInstance = null;

const industriesData = {
  // 农业
  1: {
    title: '农、林、牧、渔业',
    intro: '中国的农、林、牧、渔业是中国国民经济的重要组成部分。这一产业涵盖了农业、林业、畜牧业和渔业等领域，为中国的食品安全和经济发展做出了重要贡献。农、林、牧、渔业在中国的发展历史悠久，始终占据着重要地位。中国拥有广阔的农田和丰富的水资源，为农作物的种植和渔业的发展提供了得天独厚的条件。随着科技的进步和管理水平的提高，中国的农业产量和质量不断提升，林业资源得到合理开发，牧业和渔业也不断发展壮大。这些都为中国提供了丰富的粮食和资源，同时也为农民和相关产业带来了持续稳定的收益。',
    bannerImage: 'src/assets/images/industries/1.jpg',
    jobs: ['农民', '农业科学家', '林业工作者', '渔民', '森林护林员'],
    prospects: '中国的农、林、牧、渔业拥有广阔的发展前景。随着科技的不断进步和创新，这一产业正在经历着转型升级，从传统的劳动密集型模式逐渐向现代化、智能化的方向发展。在农业领域，粮食产量和质量持续提高，新型农业经营模式和科技手段不断涌现，为农民增收致富提供了新的途径。在林业领域，生态保护和可持续经营成为发展的重点，森林资源的保护和合理利用助力于生态文明的建设。畜牧业和渔业也在不断提升养殖技术和管理水平，为产业的健康发展奠定了基础。'
  },
  // 采矿业
  2: {
    title: '采矿业',
    intro: '采矿业是关于开采矿物资源...',
    bannerImage: 'src/assets/images/industries/2.jpg',
    jobs: ['矿工', '地质勘探员', '矿山工程师', '爆破工程师', '采矿技术员'],
    prospects: '采矿业的未来发展...'
  },
  // 制造业
  3: {
    title: '制造业',
    intro: '制造业涉及将原材料转化为产品...',
    bannerImage: 'src/assets/images/industries/3.jpg',
    jobs: ['工程师', '技术员', '操作工', '质检员', '生产主管'],
    prospects: '制造业的自动化、智能化...'
  },
  // 电力、热力、燃气及水生产和供应业
  4: {
    title: '电力、热力、燃气及水生产和供应业',
    intro: '这一行业负责生产和供应电力、热力、燃气以及水...',
    bannerImage: 'src/assets/images/industries/4.jpg',
    jobs: ['发电工程师', '输电线路工程师', '水利工程师', '环境工程师', '水务主管'],
    prospects: '绿色能源与可持续发展...'
  },
  // 建筑业
  5: {
    title: '建筑业',
    intro: '从事房屋和工程建设以及相关服务...',
    bannerImage: 'src/assets/images/industries/5.jpg',
    jobs: ['建筑工程师', '施工员', '建筑设计师', '测量工', '工地管理员'],
    prospects: '建筑业的绿色转型...'
  },
  // 批发和零售业
  6: {
    title: '批发和零售业',
    intro: '涉及商品的大宗交易和零售...',
    bannerImage: 'src/assets/images/industries/6.jpg',
    jobs: ['销售员', '店长', '采购员', '导购员', '仓库管理员'],
    prospects: '电子商务的影响...'
  },
  // 交通运输、仓储和邮政业
  7: {
    title: '交通运输、仓储和邮政业',
    intro: '提供货物和乘客运输服务...',
    bannerImage: 'src/assets/images/industries/7.jpg',
    jobs: ['司机', '快递员', '物流专员', '船长', '飞行员'],
    prospects: '智能物流与无人驾驶...'
  },
  // 住宿和餐饮业
  8: {
    title: '住宿和餐饮业',
    intro: '提供临时住宿和餐饮服务...',
    bannerImage: 'src/assets/images/industries/8.jpg',
    jobs: ['服务员', '厨师', '酒店经理', '预订员', '餐饮总监'],
    prospects: '体验式服务与可持续经营...'
  },
  // 信息传输、软件和信息技术服务业
  9: {
    title: '信息传输、软件和信息技术服务业',
    intro: '涉及信息的传输和技术服务...',
    bannerImage: 'src/assets/images/industries/9.jpg',
    jobs: ['软件工程师', '网络管理员', '信息安全专家', '数据分析师', '技术支持工程师'],
    prospects: '5G时代与人工智能的融合...'
  },
  // 金融业
  10: {
    title: '金融业',
    intro: '涉及资金的借贷、投资等服务...',
    bannerImage: 'src/assets/images/industries/10.jpg',
    jobs: ['银行家', '金融分析师', '投资顾问', '风险控制师', '保险精算师'],
    prospects: '金融科技的发展...'
  },
  // 房地产业
  11: {
    title: '房地产业',
    intro: '涉及房屋和土地的买卖与租赁...',
    bannerImage: 'src/assets/images/industries/11.jpg',
    jobs: ['房地产经纪人', '房地产开发商', '物业管理员', '房地产评估师', '楼盘销售员'],
    prospects: '房地产市场的调控与创新...'
  },
  // 租赁和商务服务业
  12: {
    title: '租赁和商务服务业',
    intro: '提供物品租赁和商务支持服务...',
    bannerImage: 'src/assets/images/industries/12.jpg',
    jobs: ['租赁专员', '商务顾问', '活动策划师', '客户经理', '人力资源专员'],
    prospects: '共享经济的兴起和行业服务的数字化...'
  },
  // 科学研究和技术服务业
  13: {
    title: '科学研究和技术服务业',
    intro: '进行自然科学研究、技术服务与咨询...',
    bannerImage: 'src/assets/images/industries/13.jpg',
    jobs: ['科研人员', '实验室技术员', '数据分析员', '研发工程师', '技术总监'],
    prospects: '跨学科研究的发展和创新技术的应用...'
  },
  // 水利、环境和公共设施管理业
  14: {
    title: '水利、环境和公共设施管理业',
    intro: '负责水资源管理、环保及公共设施维护...',
    bannerImage: 'src/assets/images/industries/14.jpg',
    jobs: ['环境保护工程师', '水务主管', '公共设施管理员', '环境规划师', '环境监测师'],
    prospects: '可持续发展与生态文明建设...'
  },
  // 居民服务、修理和其他服务业
  15: {
    title: '居民服务、修理和其他服务业',
    intro: '提供日常生活服务，包括维修、美容等...',
    bannerImage: 'src/assets/images/industries/15.jpg',
    jobs: ['家政服务员', '美容师', '汽车维修工', '家电维修工', '管道工'],
    prospects: '服务业的个性化和品质化...'
  },
  // 教育
  16: {
    title: '教育',
    intro: '提供学前、基础、高等等各级别教育服务...',
    bannerImage: 'src/assets/images/industries/16.jpg',
    jobs: ['教师', '校长', '教育顾问', '教育行政人员', '教育研究员'],
    prospects: '在线教育的发展和教育信息化...'
  },
  // 卫生和社会工作
  17: {
    title: '卫生和社会工作',
    intro: '提供医疗、护理、社会救助等服务...',
    bannerImage: 'src/assets/images/industries/17.jpg',
    jobs: ['护士', '社工', '心理医生', '医院管理人员', '社会工作者'],
    prospects: '医疗健康行业的智能化...'
  },
  // 文化、体育和娱乐业
  18: {
    title: '文化、体育和娱乐业',
    intro: '涉及文化、艺术、体育和娱乐活动...',
    bannerImage: 'src/assets/images/industries/18.jpg',
    jobs: ['艺术家', '运动员', '演员', '体育教练', '游戏设计师'],
    prospects: '文化与科技的融合，互动娱乐的兴起...'
  },
  // 公共管理、社会保障和社会组织
  19: {
    title: '公共管理、社会保障和社会组织',
    intro: '负责国家机关、社会保障、群众团体的运作...',
    bannerImage: 'src/assets/images/industries/19.jpg',
    jobs: ['政府官员', '社会工作者', '社区规划师', '公益组织主管', '社会服务机构管理人员'],
    prospects: '政务透明化和社会治理现代化...'
  },
  20: { // 国际组织
    title: '国际组织',
    intro: '国际组织涉及不同国家间的合作...',
    bannerImage: 'src/assets/images/industries/20.jpg',
    jobs: ['外交官', '国际政策分析师', '国际组织顾问'],
    prospects: '国际组织在全球化中的作用...'
  }
};


onMounted(() => {
    barChartInstance = echarts.init(document.getElementById('bar-chart'));
    barChartInstance.setOption({
        title: {
        text: '就业性别比例(%)', // 图表标题
        left: 'center', 
        },
        color: ['#1C8E99'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: ['男性', '女性']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '就业比例',
                type: 'bar',
                data: [52.7, 47.4]
            }
        ]
    });
    //TODO 数据库读取数据
    lineChartInstance = echarts.init(document.getElementById('line-chart'));
    lineChartInstance.setOption({
        title: {
        text: '行业就业人数(万)', // 图表标题
        left: 'center', 
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: Array.from({ length: 20 }, (_, i) => `${2005 + i}年`)
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '劳工数量',
                type: 'line',
                data: Array.from({ length: 20 }, () => 260).map((val, i) => val - i * 3), // 随机生成下降趋势的数据
                itemStyle: {
                    color: '#1C8E99'
                }
            }
        ]
    });
});

onBeforeUnmount(() => {
  if (barChartInstance) {
    barChartInstance.dispose();
  }
  if (lineChartInstance) {
    lineChartInstance.dispose();
  }
});

let datalist = ref([
    { num: '50', name: "+职业选择" },
    { num: '4416', name: "平均月薪资(人民币)" },
    { num: '200', name: "万相关工作岗位" },
]);

</script>

<template>
    <div class="data">
        <div class="index_title">
            <h3>公开数据</h3>
            <p>源自国家统计局</p>
        </div>
        <div class="numbers">
            <el-card v-for="(v, i) in datalist" :key="i" class="data-card" shadow="hover">
                <CountTo :startVal='1500' :endVal="parseFloat(v.num)" :duration='3000' class="count-num"></CountTo>
                <span class="data-name">{{ v.name }}</span>
            </el-card>
        </div>
        <div class="charts">
            <div id="bar-chart" class="chart"></div>
            <div id="line-chart" class="chart"></div>
        </div>
    </div>
</template>

<style scoped>
.data {
    background-color: white;
    padding: 20px;
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
}

.index_title {
    text-align: left;
    margin-bottom: 10px;
}
.numbers {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;
}
.data-card {
    flex: 0 0 calc(33.333% - 20px);
    display: flex;
    flex-direction: column;
    align-items: center;
}
.card-content {
    width: 100%;
    border: 1px solid #eee;
    padding: 20px;
    text-align: center;
}
.count-num {
    font-size: 2em; 
    font-weight: bold; 
}
.data-name {
    display: block;
    margin-top: 10px;
}
.divider {
    width: 2px;
    height: 100%;
    background-color: gray;
    margin-left: -1px; 
}
.charts {
    display: flex;
    justify-content: space-between;
    padding: 30px;
}
.chart {
    width: 49%;
    height: 400px;
}
</style>
