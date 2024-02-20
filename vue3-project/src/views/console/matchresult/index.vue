<script>
import { computed, ref, getCurrentInstance, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    // 在组件挂载完成后获取登录数据
    onMounted(async () => {
      await getLoginInfo();
    });

    const { proxy } = getCurrentInstance();
    const loginData = ref({})

    // 根据用户角色动态显示学生或公司表格
    const isStudentVisible = computed(() => { return loginData.value.role === 'student' });
    const isCompanyVisible = computed(() => { return loginData.value.role === 'company' });

    // 学生列表
    const studentList = ref([]);
    // 公司列表
    const companyList = ref([]);

    //学生表标签
    const tableLabels = reactive([
      {
        prop: "name", 
        label: "真实姓名",
      },
      {
        prop: "industryType",
        label: "行业志愿",
      },
      {
        prop: "age",
        label: "年龄",
      },
      {
        prop: "gender",
        label: "性别",
      },
      {
        prop: "describe",
        label: "自我介绍",
      },
      {
        prop: "supervisor",
        label: "监护人姓名",
      },
      {
        prop: "supervisorPhone",
        label: "监护人联系电话",
      }
    ]);
    //企业表标签
    const tableLabelc = reactive([
      {
        prop: "companyName",
        label: "企业名称",
      },
      {
        prop: "industryType",
        label: "行业类型",
      },
      {
        prop: "positionStart",
        label: "岗位开始时间",
      },
      {
        prop: "positionEnd",
        label: "岗位结束时间",
      },
      {
        prop: "positionDescribe",
        label: "岗位介绍",
      },
      {
        prop: "contactPerson",
        label: "联系人",
      },
      {
        prop: "contactPhone",
        label: "联系人电话",
      },
      {
        prop: "companyAddress",
        label: "企业地址",
      }
    ]);

    // 获取登录数据的方法
    const store = useStore()
    const getLoginInfo = async () => {
      const token = store.state.token;
      let res = await proxy.$api.getUserInfo({ token: token });
      loginData.value = res.data;
      // 根据用户角色查询相应的信息
      if (loginData.value.role === 'student') {
        queryStudentMatch();
      } else if (loginData.value.role === 'company') {
        queryCompanyMatch();
      }
    }

    const isStudentMatchEmpty = ref(false);
    const isCompanyMatchEmpty = ref(false);

    // 学生查询配对到的企业信息
    const queryStudentMatch = async () => {
      try {
        let res = await proxy.$api.queryStudentMatch(loginData.value.uid);
        if (res) {
          companyList.value = res.data.list.map((item) =>{
          //处理行业
          switch(item.industryType) {
            case 1:
            item.industryType = '农,林,牧,渔业';
            break;
            case 2:
            item.industryType = '采矿业';
            break;
            case 3:
            item.industryType = '电力,热力,燃气及水生产和供应业';
            break;
            case 4:
            item.industryType = '建筑业';
            break;
            case 5:
            item.industryType = '制造业';
            break;
            case 6:
            item.industryType = '批发和零售业';
            break;
            case 7:
            item.industryType = '交通运输,仓储和邮政业';
            break;
            case 8:
            item.industryType = '住宿和餐饮业';
            break;
            case 9:
            item.industryType = '信息传输,软件和信息技术服务业';
            break;
            case 10:
            item.industryType = '金融业';
            break;
            case 11:
            item.industryType = '房地产业';
            break;
            case 12:
            item.industryType = '租赁和商务服务业';
            break;
            case 13:
            item.industryType = '科学研究和技术服务业';
            break;
            case 14:
            item.industryType = '水利,环境和公共设施管理业';
            break;
            case 15:
            item.industryType = '居民服务,修理和其他服务业';
            break;
            case 16:
            item.industryType = '教育';
            break;
            case 17:
            item.industryType = '卫生和社会工作';
            break;
            case 18:
            item.industryType = '文化,体育和娱乐业';
            break;
            case 19:
            item.industryType = '公共管理,社会保障和社会组织';
            break;
            case 20:
            item.industryType = '国际组织';
            break;
          }
          return item;
          });
          isStudentMatchEmpty.value = false;
        } else {
          isStudentMatchEmpty.value = true;
        }
      } catch (error) {
        console.error(error);
        isStudentMatchEmpty.value = true;
      }
    };

    // 企业查询配对到的学生信息
    const queryCompanyMatch = async () => {
      try {
        let res = await proxy.$api.queryCompanyMatch(loginData.value.uid);
        if (res) {
          studentList.value = res.data.list.map((item) =>{
          //处理性别
          switch (item.gender) {
            case 'Male':
            item.gender = '男';
            break;
            case 'Female':
            item.gender = '女';
            break;
          }
          //处理行业
          switch(item.industryType) {
            case 1:
            item.industryType = '农,林,牧,渔业';
            break;
            case 2:
            item.industryType = '采矿业';
            break;
            case 3:
            item.industryType = '电力,热力,燃气及水生产和供应业';
            break;
            case 4:
            item.industryType = '建筑业';
            break;
            case 5:
            item.industryType = '制造业';
            break;
            case 6:
            item.industryType = '批发和零售业';
            break;
            case 7:
            item.industryType = '交通运输,仓储和邮政业';
            break;
            case 8:
            item.industryType = '住宿和餐饮业';
            break;
            case 9:
            item.industryType = '信息传输,软件和信息技术服务业';
            break;
            case 10:
            item.industryType = '金融业';
            break;
            case 11:
            item.industryType = '房地产业';
            break;
            case 12:
            item.industryType = '租赁和商务服务业';
            break;
            case 13:
            item.industryType = '科学研究和技术服务业';
            break;
            case 14:
            item.industryType = '水利,环境和公共设施管理业';
            break;
            case 15:
            item.industryType = '居民服务,修理和其他服务业';
            break;
            case 16:
            item.industryType = '教育';
            break;
            case 17:
            item.industryType = '卫生和社会工作';
            break;
            case 18:
            item.industryType = '文化,体育和娱乐业';
            break;
            case 19:
            item.industryType = '公共管理,社会保障和社会组织';
            break;
            case 20:
            item.industryType = '国际组织';
            break;
          }
          return item;
        });
          isCompanyMatchEmpty.value = false;
        } else {
          isCompanyMatchEmpty.value = true;
        }
      } catch (error) {
        console.error(error);
        isCompanyMatchEmpty.value = true;
      }
    };

    const handleFeedback = (row) => {
      console.log('Feedback for row:', row);
    };

    const config = reactive({
      total: 0,
      page: 1,
    });

    const changePage = (page) => {
      config.page = page;
      //queryStudentMatch(config);
    };

    return {
      isStudentVisible,
      isCompanyVisible,
      getLoginInfo,
      studentList,
      companyList,
      queryCompanyMatch,
      queryStudentMatch,
      tableLabels,
      tableLabelc,
      changePage,
      handleFeedback,
      config,
      isStudentMatchEmpty,
      isCompanyMatchEmpty,
    };
  },
};
</script>

<template>
  <div class="table">
    <div v-if="isCompanyVisible" class="student-table">
      <el-table empty-text="暂无配对信息" :data="studentList" style="width: 100%" height="500px">
        <el-table-column v-for="item in tableLabels" :key="item.prop" :prop="item.prop" :label="item.label" />
        <el-table-column fixed="right" label="操作" min-width="180">
          <template #default="{ row }">
            <el-button type="warning" size="small" @click="handleFeedback(row)">反馈</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination small background layout="prev, pager, next" :total="config.total" @current-change="changePage"
        class="pager mt-4" />
    </div>

    <div v-if="isStudentVisible" class="company-table">
      <el-table empty-text="暂无配对信息" :data="companyList" style="width: 100%" height="500px">
        <el-table-column v-for="item in tableLabelc" :key="item.prop" :prop="item.prop" :label="item.label" />
        <el-table-column fixed="right" label="操作" min-width="180">
          <template #default="{ row }">
            <el-button type="warning" size="small" @click="handleFeedback(row)">反馈</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination small background layout="prev, pager, next" :total="config.total" @current-change="changePage"
        class="pager mt-4" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.table {
  position: relative;
  height: 520px;

  .pager {
    position: absolute;
    right: 0;
    bottom: -20px;
  }
}
</style>
