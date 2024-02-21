<script>
import { defineComponent, getCurrentInstance, onMounted, reactive, ref, computed, nextTick, watch  } from 'vue';
import * as echarts from 'echarts';
import { useStore } from 'vuex';
import { CountTo } from 'vue3-count-to'


export default defineComponent({

  components: {
    CountTo
  },

  setup() {
    const { proxy } = getCurrentInstance();
    //定义table data
    let tableData = ref([]);
    const tableLabel = {
      industry: '行业',       //label名称和data名称一一对上
      studentnum: '学生人数', //todo  后端传回此行业学生人数
      companynum: '企业数目',  //todo  后端传回此行业学生人数
    };
    //定义count data
    let countData = ref([]);
    //定义login data 初始化为对象
    let loginData = ref({});

    // 获取首页table数据(完成)
    const getTableList = async () => {
      let res = await proxy.$api.getTableData();
      tableData.value = res.data;
    };
    // 获取首页count数据(完成)
    const getCountData = async () => {
      let res = await proxy.$api.getCountData();
      countData.value = res.data;
    }
    // 获取首页登录信息
    const store = useStore()
    const getLoginInfo = async () => {
      const token = store.state.token;
      let res = await proxy.$api.getUserInfo({ token: token });
      //console.log(res);
      loginData.value = res.data;
    }
    onMounted(() => {
      getTableList();
      getCountData();
      getLoginInfo();

      // 使用 watch 来监控 isExtraInfoVisible 的变化
      watch(isExtraInfoVisible, (newValue) => {
        if (newValue) {
          // 确保 DOM 已经更新
          nextTick(() => {
            getPieChartData();
            getBarChartData();
          });
        }
      });
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
    let pieOptions = reactive({
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
    let userData = reactive({
      xData: [],
      series: [],
    });
    let videoData = reactive({
      series: [],
    });

    // 获取饼状图数据的方法
    const getPieChartData = async () => {
      let result = await proxy.$api.getPieChartData();
      let videoRes = result.data;

      // 处理videoData
      videoData.series = [{
        data: videoRes,
        type: 'pie',
      }];
      pieOptions.series = videoData.series;

      // videoData进行渲染
      let vEcharts = echarts.init(proxy.$refs['videoechart']);
      vEcharts.setOption(pieOptions);
    };

    // 获取柱状图数据的方法
    const getBarChartData = async () => {
      let result = await proxy.$api.getBarChartData();
      let userRes = result.data;

      // 处理userData
      userData.xData = userRes.map((item) => item.date);
      userData.series = [
        {
          name: '新增用户',
          data: userRes.map((item) => item.newCount),
          type: 'bar',
        }
      ];

      xOptions.xAxis.data = userData.xData;
      xOptions.series = userData.series;

      // userData进行渲染
      let uEcharts = echarts.init(proxy.$refs['userechart']);
      uEcharts.setOption(xOptions);
    };


    const isExtraInfoVisible = computed(() => {
      // 只有admin角色可以看到额外信息
      return loginData.value.role === 'admin';
    });

    const computedRole = computed(() => {
      switch (loginData.value.role) {
        case 'admin':
          return '系统管理员';
        case 'student':
          return '学生用户';
        case 'company':
          return '企业用户';
        default:
          return '未知角色';
      }
    });

    const formattedLoginTime = computed(() => {
      if (loginData.value.createTime) {
        return loginData.value.createTime.split('T')[0];
      }
      return '';
    });

    return {
      tableData,
      tableLabel,
      countData,
      loginData,
      isExtraInfoVisible,
      computedRole,
      formattedLoginTime,
      getPieChartData,
      getBarChartData,
    }
  },
})



</script>

<template>
  <el-row class="home" :gutter="20">
    <!-- 左侧部分 -->
    <el-col :span="8" style="margin-top: 20px">

      <!-- 登录信息表格 -->
      <el-card shadow="hover">
        <div class="user">
          <img src="../../../assets/images/user.png" />
          <div class="userinfo">
            <p class="name">用户名: {{ loginData.username }}</p>
            <p class="role">用户角色: {{ computedRole }}</p>
          </div>
        </div>
        <div class="login-info">
          <p>账号UID:<span>{{ loginData.uid }}</span></p>
          <p>账号创建时间:<span>{{ formattedLoginTime }}</span></p>
        </div>
      </el-card>

      <!-- 左下表格 -->
      <div v-if="isExtraInfoVisible">
        <el-card shadow="hover" style="margin-top: 20px;" height="400px">
          <el-table :data="tableData" height="370px">
            <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val">
            </el-table-column>
          </el-table>
        </el-card>
      </div>

    </el-col>

    <!-- 右侧部分 -->
    <el-col :span="16" style="margin-top: 20px">
      <!-- 右上数字格 -->
      <div v-if="isExtraInfoVisible">
        <div class="num">
          <el-card :body-style="{ display: 'flex', padding: 0 }" v-for="item in countData" :key="item.name">

            <component class="icons" :is="item.icon" :style="{ background: item.color }"></component>

            <div class="detail">
              <CountTo :startVal="0" :endVal="parseFloat(item.value)" :duration="3000" class="num"/>
              <p class="txt">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
      </div>

      <!-- 右下echart -->
      <div v-if="isExtraInfoVisible"> 
        <div class="graph">
          <!-- 饼状图 -->
          <el-card style="height: 500px;">
            <div ref="userechart" style="height:500px"></div>
          </el-card>
          <!-- 柱状图 -->
          <el-card style="height: 500px;">
            <div ref="videoechart" style="height:500px"></div>
          </el-card>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
  

<style lang="less" scoped>
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

  .userinfo {
    p {
      line-height: 30px;
      font-size: 14px;

      span {
        color: #666;
        margin-left: 70px;
      }
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

  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .el-card {
      width: 32%;
      margin-bottom: 20px;
    }

    .icons {
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }

    .detail {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .num {
        font-size: 30px;
        margin-bottom: 10px;
      }

      .txt {
        font-size: 14px;
        text-align: center;
        color: #999;
      }
    }
  }

  .graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .el-card {
      width: 49%;
    }
  }
}
</style>
  