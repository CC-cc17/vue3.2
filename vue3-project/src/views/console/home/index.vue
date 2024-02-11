<script>
import { defineComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';

export default defineComponent({
  setup() {
    const {proxy} = getCurrentInstance();
    //定义table data
    let tableData = ref([]);
    const tableLabel = {
      name: '手机品牌',       //label名称和data名称一一对上
      todayBuy: '今日购买',
      monthBuy: '本月购买',
      totalBuy: '总购买',
    };
    
    //定义count data
    let countData = ref([]);

    // 获取首页table数据
    const getTableList = async() => {
      // await axios.get("https://dev.usemock.com/65c831f66309cc7a3775c533/home/getTableData").then((res)=>{
      // console.log(res);

      // if(res.data.code == 200){
      //   tableData.value = res.data.data;
      // }
      // })
    let res = await proxy.$api.getTableData();
    tableData.value = res;
    };
    // 获取首页count数据
    const getCountData = async() => {
      let res = await proxy.$api.getCountData();
      countData.value = res;
    }
    onMounted(() => {
      getTableList();
      //获取count数据
      getCountData();
      //获取echart表格数据
      getChartData();
    });

    // 关于echarts 表格的渲染部分
    let xOptions = reactive({
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
      grid: {
        left: "20%",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
      series: [],
    });
    let pieOptions =reactive({
      tooltip: {
        trigger: "item",
      },
      color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
      ],
      series: [],
    });
    let orderData = reactive({
      xData:[],
      series:[],
    });
    let userData = reactive({
      xData:[],
      series:[],
    });
    let videoData =reactive({
      series: [],
    });

    //获取数据的方法
    const getChartData = async () =>{
      let result = await proxy.$api.getChartData();
      let res = result.orderData
      let userRes = result.userData
      let videoData = result.videoData
      //处理数据
      orderData.xData = res.date
      const keyArray = Object.keys(res.data[0])
      const series = []
      keyArray.forEach((key)=>{
        series.push({
          name: key,
          data:res.data.map(item => item[key]),
          type: 'line',
        });
      });
      orderData.series = series;
      xOptions.xAxis.data = orderData.xData
      xOptions.series = orderData.series
      //userData进行渲染
      let hEcharts = echarts.init(proxy.$refs['echart'])
      hEcharts.setOption(xOptions);

      //柱状图进行渲染
      
    };

    return {
      tableData,
      tableLabel,
      countData,
    }
  },
})



</script>

<template>
  <el-row class="home" :gutter="20">
    <!-- 左侧部分 -->
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img src="../../../assets/images/user.png" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="role">Super Admin</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>2024-2-10</span></p>
          <p>上次登录地点:<span>四川</span></p>
        </div>
      </el-card>

      <el-card shadow="hover" style="margin-top: 20px;" height="450px">
        <el-table :data="tableData">
          <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 右侧部分 -->
    <el-col :span="16" style="margin-top: 20px">
    <!-- 右上数字格 -->
    <div class="num">
      <el-card :body-style="{display:'flex',padding: 0}" 
      v-for = "item in countData" 
      :key="item.name">

      <component
            class="icons"
            :is="item.icon"
            :style="{ background: item.color }"
          ></component>

      <div class="detail">
        <p class="num">￥{{ item.value }}</p>
        <p class="txt">{{ item.name }}</p>
      </div>
      </el-card>
    </div>
    <!-- 右中echart折线图 -->
    <el-card style="height:280px">
      <div ref="echart" style="height:280px"></div>
    </el-card>
    <!-- 右下echart -->
    <div class="graph">
      <!-- 饼状图 -->
      <el-card style="height: 260px;">
        <div ref="userechart" style="height:240px"></div>
      </el-card>
      <!-- 柱状图 -->
      <el-card style="height: 260px;">
        <div ref="videoechart" style="height:240px"></div>
      </el-card>
    </div>
    </el-col>
  </el-row>
</template>
  

<style lang="less">
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
  }

  .login-info {
    p {
      line-height: 30px;
      font-size: 14px;
      color: #999;

      span {
        color: #666;
        margin-left: 70px;
      }
    }
  }
  .num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card{
      width: 32%;
      margin-bottom: 20px;
    }
    .icons{
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .detail{
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num{
        font-size: 30px;
        margin-bottom: 10px;
      }
      .txt{
        font-size: 14px;
        text-align: center;
        color:#999;
      }
    }
  }
}
</style>
  