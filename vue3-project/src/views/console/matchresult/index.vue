<template>
  <el-container>
    <el-main>
      <el-table :data="matchingList" style="width: 100%">
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="age" label="年龄" width="100"></el-table-column>
        <el-table-column prop="gender" label="性别" width="100"></el-table-column>
        <el-table-column prop="industryType" label="行业志愿" width="180"></el-table-column>
        <el-table-column prop="describe" label="自我介绍"></el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button type="primary" @click="openFeedbackDialog(scope.row)">反馈</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="feedbackDialogVisible" title="填写反馈">
        <!-- 反馈表单内容 -->
        <el-form :model="feedbackForm">
          <el-form-item label="反馈内容">
            <el-input type="textarea" v-model="feedbackForm.content"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="feedbackDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitFeedback">提交</el-button>
        </template>
      </el-dialog>
      <el-empty v-if="!matchingList.length" description="暂无匹配结果"></el-empty>
    </el-main>
  </el-container>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const matchingList = ref([]); // 匹配列表数据
    const feedbackDialogVisible = ref(false); // 反馈对话框的显示状态
    const feedbackForm = ref({ content: '' }); // 反馈表单数据

    // 打开反馈对话框
    const openFeedbackDialog = (row) => {
      feedbackDialogVisible.value = true;
      // 可以在这里根据row信息初始化反馈表单
    };

    // 提交反馈
    const submitFeedback = () => {
      // 在这里实现提交反馈的逻辑
      feedbackDialogVisible.value = false;
    };

    // 在这里实现获取匹配列表的逻辑

    return {
      matchingList,
      feedbackDialogVisible,
      feedbackForm,
      openFeedbackDialog,
      submitFeedback
    };
  }
};
</script>