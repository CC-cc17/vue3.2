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

  <el-dialog v-model="dialogVisible" :title="action == 'add' ? '新增用户' : '编辑用户'" width="35%" :before-close="handleClose">
    <el-form :inline="true" :model="formUser" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名" prop="username" :rules="[{ required: true, message: '用户名是必填项' }]">
            <el-input v-model="formUser.name" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age" :rules="[
            { required: true, message: '年龄是必填项' },
            { type: 'number', message: '年龄必须是数字' },
          ]">
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex" :rules="[{ required: true, message: '性别是必选项' }]">
            <el-select v-model="formUser.sex" placeholder="请选择">
              <el-option label="男" value="0" />
              <el-option label="女" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth" :rules="[{ required: true, message: '出生日期是必选项' }]">
            <el-date-picker v-model="formUser.birth" type="date" label="出生日期" placeholder="请输入" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="地址" prop="addr" :rules="[{ required: true, message: '地址是必填项' }]">
          <el-input v-model="formUser.addr" placeholder="请输入地址" />
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>


<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  reactive,
  computed,
} from "vue";

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
      // console.log(page);
      config.page = page;
      getUserData(config);
    };
    const formInline = reactive({
      keyword: "",
      role: "", // 新增筛选条件角色
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
      username: "", // 添加用户的 用户名
      age: "",
      sex: "",
      birth: "",
      addr: "",
    });

    const timeFormat = (time) => {
      var time = new Date(time);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var date = time.getDate();
      function add(m) {
        return m < 10 ? "0" + m : m;
      }
      return year + "-" + add(month) + "-" + add(date);
    };

    // 添加用户
    const onSubmit = () => {
      proxy.$refs.userForm.validate(async (valid) => {
        if (valid) {
          if (action.value == "add") {
            formUser.birth = timeFormat(formUser.birth);
            let res = await proxy.$api.addUser(formUser);
            if (res) {
              // console.log(proxy.$refs);
              dialogVisible.value = false;
              proxy.$refs.userForm.resetFields();
              getUserData(config);
            }
          } else {
            // 编辑的接口
            formUser.sex == "男" ? (formUser.sex = 1) : (formUser.sex = 0);
            let res = await proxy.$api.editUser(formUser);
            if (res) {
              // console.log(proxy.$refs);
              dialogVisible.value = false;
              proxy.$refs.userForm.resetFields();
              getUserData(config);
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
    // 编辑用户
    const handleEdit = (row) => {
      // 浅拷贝

      action.value = "edit";
      dialogVisible.value = true;
      row.sex == 1 ? (row.sex = "男") : (row.sex = "女");
      proxy.$nextTick(() => {
        Object.assign(formUser, row);
      });
    };
    // 新增用户
    const handleAdd = () => {
      action.value = "add";
      dialogVisible.value = true;
    };
    // 删除用户
    const handleDelete = (row) => {
      ElMessageBox.confirm("你确定删除吗?")
        .then(async () => {
          await proxy.$api.deleteUser({
            id: row.id,
          });

          ElMessage({
            showClose: true,
            message: "删除成功",
            type: "success",
          });
          getUserData(config);
        })
        .catch(() => {
          // catch error
        });
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
