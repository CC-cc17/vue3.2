<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">+新增</el-button>

    <!-- 筛选功能 -->
    <el-form :inline="true" :model="formInline">
      <el-form-item label="角色">
        <el-select v-model="formInline.role" placeholder="请选择用户角色">
          <el-option label="管理员" value="admin" />
          <el-option label="学生用户" value="student" />
          <el-option label="企业用户" value="company" />
        </el-select>
      </el-form-item>
    </el-form>

    <el-form :inline="true" :model="formInline">
      <el-form-item>
        <el-input v-model="formInline.keyword" placeholder="请输入关键字" />
      </el-form-item>

      <!-- 搜索按钮 -->
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>

      <!-- 清空按钮 -->
      <el-form-item>
        <el-button type="default" @click="resetSearch">清空搜索</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div class="table">
    <el-table :data="list" style="width: 100%" height="500px">
      <el-table-column v-for="item in tableLabel" :key="item.prop" :label="item.label" :prop="item.prop"
        :width="item.width ? item.width : 200" />

      <el-table-column fixed="right" label="操作" min-width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination small background layout="prev, pager, next" :total="config.total" @current-change="changePage"
      class="pager mt-4" />
  </div>

  <el-dialog v-model="dialogVisible" :title="action == 'add' ? '新增用户' : '编辑用户'" width="33%" :before-close="handleClose">
    <el-form :model="formUser" ref="userForm" label-width="100px">

      <el-form-item label="用户ID" prop="uid">
        <el-input style="width: 250px;" v-model="formUser.uid" disabled></el-input>
      </el-form-item>

      <el-form-item label="用户名" prop="username" :rules="[{ required: true, message: '用户名是必填项' }]">
        <el-input style="width: 250px;" v-model="formUser.username" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '密码是必填项' }]">
        <el-input :type="showPassword ? 'text' : 'password'" style="width: 250px;" v-model="formUser.password"
          placeholder="请输入密码" :disabled="isPasswordDisabled">
          <template #append>
            <el-button :icon="View" @click="togglePasswordVisibility"></el-button>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item label="联系电话" prop="phone" :rules="[{ required: true, message: '电话是必填项' }]">
        <el-input style="width: 250px;" v-model="formUser.phone" placeholder="请输入联系电话" />
      </el-form-item>

      <el-form-item label="邮箱" prop="email" :rules="[{ required: true, message: '邮箱是必填项' }]">
        <el-input style="width: 250px;" v-model="formUser.email" placeholder="请输入邮箱" />
      </el-form-item>

      <el-form-item label="用户角色" prop="userType" :rules="[{ required: true, message: '用户角色是必选项' }]">
        <el-select v-model="formUser.userType" placeholder="请选择用户角色">
          <el-option label="系统管理员" value="admin" />
          <el-option label="学生用户" value="student" />
          <el-option label="企业用户" value="company" />
        </el-select>
      </el-form-item>

      <el-row style="justify-content: flex-end">
        <el-button type="primary" @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>


<script>
import { View } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  reactive,
  computed,
} from 'vue';

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const list = ref([]);
    const tableLabel = reactive([
      {
        prop: "uid",
        label: "#uid",
      },
      {
        prop: "username",
        label: "用户名",
      },
      {
        prop: "phone",
        label: "联系电话",
      },
      {
        prop: "email",
        label: "邮箱",
      },
      {
        prop: "role",
        label: "用户类型",
      },
      {
        prop: "createTimeFormatted",
        label: "创建时间",
      }
    ]);
    onMounted(() => {
      getUserData(config);
    });

    const config = reactive({
      total: 0,
      page: 1,
      name: "",
    });

    const getUserData = async (config) => {
      let params = {
        page: config.page,
        name: config.name,
        role: config.role,
      };

      let res = await proxy.$api.getUserData(params);
      config.total = res.data.count;
      list.value = res.data.list.map((item) => {
        // 处理 userType
        switch (item.userType) {
          case 'admin':
            item.role = '系统管理员';
            break;
          case 'student':
            item.role = '学生用户';
            break;
          case 'company':
            item.role = '企业用户';
            break;
          default:
            item.role = item.userType;
        }
        // 处理日期
        if (item.createTime) {
          const date = new Date(item.createTime);
          if (!isNaN(date.getTime())) {
            // 日期格式化为 YYYY-MM-DD
            item.createTimeFormatted = date.toISOString().split('T')[0];
          } else {
            item.createTimeFormatted = '无效日期';
          }
        }

        return item;
      });
    };

    const changePage = (page) => {
      config.page = page;
      getUserData(config);
    };

    const formInline = reactive({
      keyword: "",
      role: "",
    });

    const handleSearch = () => {
      config.name = formInline.keyword;
      config.role = formInline.role;
      getUserData(config);
    };

    // 清空表单方法
    const resetSearch = () => {
      formInline.role = '';
      formInline.keyword = '';
      getUserData(formInline);
    };

    // 控制模态框的显示隐藏
    const dialogVisible = ref(false);
    const handleClose = (done) => {
      ElMessageBox.confirm("确定关闭吗?", {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          proxy.$refs.userForm.resetFields();
          done();
        })
        .catch(() => {
          // catch error
        });
    };

    // 添加用户的form数据
    const formUser = reactive({
      username: "",
      password: "",
      phone: "",
      email: "",
      userType: "",
      createTime: "",
    });

    // 处理回传日期
    const timeFormat = (time) => {
      var time = new Date(time);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var date = time.getDate();
      var hours = time.getHours();
      var minutes = time.getMinutes();
      var seconds = time.getSeconds();
      function add(m) {
        return m < 10 ? "0" + m : m;
      }
      // 返回格式化的日期和时间字符串
      return year + "-" + add(month) + "-" + add(date) + "T" + add(hours) + ":" + add(minutes) + ":" + add(seconds);
    };

    //设定密码可添加但不可修改逻辑
    const isPasswordDisabled = ref(false);

    // 添加用户
    const onSubmit = () => {
      proxy.$refs.userForm.validate(async (valid) => {
        if (valid) {
          if (action.value == "add") {
            formUser.createTime = timeFormat(new Date());
            let res = await proxy.$api.addUser(formUser);
            if (res) {
              // 显示成功消息提示
              ElMessage({
                showClose: true,
                message: "用户添加成功",
                type: "success",
              });

              dialogVisible.value = false;
              proxy.$refs.userForm.resetFields();
              getUserData(config);
            } else {
              // 显示失败消息提示
              ElMessage({
                showClose: true,
                message: "用户添加失败",
                type: "error",
              });
            }
          } else {
            // 编辑用户
            let res = await proxy.$api.editUser(formUser);
            if (res) {
              // 显示成功消息提示
              ElMessage({
                showClose: true,
                message: "用户编辑成功",
                type: "success",
              });

              dialogVisible.value = false;
              proxy.$refs.userForm.resetFields();
              getUserData(config);
            } else {
              // 显示失败消息提示
              ElMessage({
                showClose: true,
                message: "用户编辑失败",
                type: "error",
              });
            }
          }
        } else {
          ElMessage({
            showClose: true,
            message: "请输入正确的内容",
            type: "error",
          });
        }
      });
    };

    // 取消
    const handleCancel = () => {
      dialogVisible.value = false;
      proxy.$refs.userForm.resetFields();
    };

    // 区分编辑和新增
    const action = ref("add");

    const handleEdit = (row) => {
      // 浅拷贝
      action.value = "edit";
      isPasswordDisabled.value = true; // 禁用密码输入框
      dialogVisible.value = true;
      proxy.$nextTick(() => {
        Object.assign(formUser, row);
      });
    };

    // 新增用户
    const handleAdd = () => {
      action.value = "add";
      isPasswordDisabled.value = false; // 启用密码输入框
      dialogVisible.value = true;

      // 重置表单数据
      proxy.$nextTick(() => {
        proxy.$refs.userForm.resetFields();
      });
    };

    // 删除用户
    const handleDelete = (row) => {
      ElMessageBox.confirm('确定删除吗？', '删除确认', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
      })
        .then(async () => {
          // 直接传递 row.uid 而不是一个对象
          await proxy.$api.deleteUser(row.uid);
          ElMessage({
            showClose: true,
            message: "删除成功",
            type: "success",
          });
          getUserData(config);
        })
        .catch(() => {
          // 用户取消或删除失败的处理
        });
    };

    // 展示密码
    const showPassword = ref(false);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };
    return {
      list,
      tableLabel,
      config,
      changePage,
      formInline,
      handleSearch,
      dialogVisible,
      handleClose,
      formUser,
      onSubmit,
      handleCancel,
      action,
      handleEdit,
      handleAdd,
      handleDelete,
      resetSearch,
      timeFormat,
      togglePasswordVisibility,
      showPassword,
      View,
      ElMessage,
      isPasswordDisabled,
    };
  },
});
</script>

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

.user-header {
  display: flex;
  justify-content: space-between;
}
</style>
