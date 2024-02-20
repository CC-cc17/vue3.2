<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance();
const parentBorder = ref(true)
const tableData = ref({
  records: []
})

const config = reactive({
  total: 0,
  page: 1,
  size: 10
});

const industryTypeMap = {
          1: '农,林,牧,渔业',
          2: '采矿业',
          3: '电力,热力,燃气及水生产和供应业',
          4: '建筑业',
          5: '制造业',
          6: '批发和零售业',
          7: '交通运输,仓储和邮政业',
          8: '住宿和餐饮业',
          9: '信息传输,软件和信息技术服务业',
          10: '金融业',
          11: '房地产业',
          12: '租赁和商务服务业',
          13: '科学研究和技术服务业',
          14: '水利,环境和公共设施管理业',
          15: '居民服务,修理和其他服务业',
          16: '教育',
          17: '卫生和社会工作',
          18: '文化,体育和娱乐业',
          19: '公共管理,社会保障和社会组织',
          20: '国际组织'
        };

const jobMatchList = async () => {
  try {
    let res = await proxy.$api.getJobMatchList({ page: config.page, size: config.size });
    if (res && res.data) {
      const { records, total, current, size } = res.data;
      tableData.value.records = records.map((item) => {
        //处理性别
        switch (item.student.gender) {
          case 'Male':
            item.student.gender = '男';
            break;
          case 'Female':
            item.student.gender = '女';
            break;
        }
        //处理行业
        item.student.industryType = industryTypeMap[item.student.industryType] || '其他行业';
        item.company.industryType = industryTypeMap[item.company.industryType] || '其他行业';
        // 处理日期
        if (item.matchTime) {
          const date = new Date(item.matchTime);
          if (!isNaN(date.getTime())) {
            // 日期格式化为 YYYY-MM-DD
            item.matchTime = date.toISOString().split('T')[0];
          } else {
            item.matchTime = '无效日期';
          }
        }
        return item;
      });
      config.total = total;
      config.page = current;
      config.size = size;
    }
  } catch (error) {
    console.error(error);
  }
};

// 在组件挂载后调用 jobMatchList 函数获取数据
onMounted(jobMatchList);

const changePage = (page) => {
  config.page = page;
  jobMatchList();
};
</script>

<template>
  <div class="table-container">
    <el-table :data="tableData.records" :border="parentBorder" style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <div class="info-wrapper">

            <div class="info-section student-info">
            <h3 class="info-header">学生信息</h3>
            <p class="info-item">学生ID: {{ props.row.student.id }}</p>
            <p class="info-item">学生账户UID: {{ props.row.student.uid }}</p>
            <p class="info-item">学生姓名: {{ props.row.student.name }}</p>
            <p class="info-item">行业类型: {{ props.row.student.industryType }}</p>
            <p class="info-item">学生年龄: {{ props.row.student.age }}</p>
            <p class="info-item">学生性别: {{ props.row.student.gender }}</p>
            <p class="info-item">学生自我介绍: {{ props.row.student.describe }}</p>
            <p class="info-item">学生监护人: {{ props.row.student.supervisor }}</p>
            <p class="info-item">学生监护人联系电话: {{ props.row.student.supervisorPhone }}</p>
          </div>

            <div class="info-section company-info">
            <h3 class="info-header">企业信息</h3>
            <p class="info-item">企业ID: {{ props.row.company.id }}</p>
            <p class="info-item">企业账户UID: {{ props.row.company.uid }}</p>
            <p class="info-item">企业名称: {{ props.row.company.companyName }}</p>
            <p class="info-item">行业类型: {{ props.row.company.industryType }}</p>
            <p class="info-item">岗位开始时间: {{ props.row.company.positionStart }}</p>
            <p class="info-item">岗位结束时间: {{ props.row.company.positionEnd }}</p>
            <p class="info-item">岗位及企业介绍: {{ props.row.company.positionDescribe }}</p>
            <p class="info-item">企业联系人: {{ props.row.company.contactPerson }}</p>
            <p class="info-item">企业联系人电话: {{ props.row.company.contactPhone }}</p>
            <p class="info-item">企业地址: {{ props.row.company.companyAddress }}</p>
          </div>

        </div>
        </template>
      </el-table-column>
      <el-table-column label="配对编号" prop="id" sortable/>
      <el-table-column label="配对时间" prop="matchTime" sortable/>
    </el-table>
    <el-pagination small background layout="prev, pager, next" 
    :total="config.total" @current-change="changePage"
      class="pager mt-4" />
  </div>
</template>
    
<style lang="less" scoped>
.table-container {
  position: relative;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.info-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 16px;
}

.info-section {
  flex: 1;
  padding: 8px;
  &:first-child {
    border-right: 1px solid #ebeef5;
  }
}

.student-info {
  /* 学生信息特定样式，如果需要 */
}

.company-info {
  /* 企业信息特定样式，如果需要 */
}

.info-header {
  margin-top: 0;
  margin-bottom: 8px;
  color: #333;
  font-weight: bold;
}

.info-item {
  margin: 0;
  padding: 4px 0;
  border-bottom: 1px solid #ebeef5; /* 每项信息之间的分隔线 */
  &:last-child {
    border-bottom: none; /* 最后一项不需要分隔线 */
  }
}

.pager {
  position: absolute;
  right: 20px;
  bottom: -40px;
}
</style>