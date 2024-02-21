<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { CountTo } from 'vue3-count-to'
import * as echarts from 'echarts';

let barChartInstance = null;
let lineChartInstance = null;


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
