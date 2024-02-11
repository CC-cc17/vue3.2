<script>
import {defineComponent,getCurrentInstance,onMounted,ref,reactive} from 'vue'

export default defineComponent({
  setup() {
    const {proxy} = getCurrentInstance();
    const list = ref([]);
    const tableLabel = reactive([
      {
        prop: "name",
        label: "姓名",
      },
      {
        prop: "age",
        label: "年龄",
      },
      {
        prop: "sexLabel",
        label: "性别",
      },
      {
        prop: "birth",
        label: "出生日期",
        width: 200,
      },
      {
        prop: "addr",
        label: "地址",
        width: 320,
      },
    ]);
    onMounted(() => {
      getUserData();
    });
    const getUserData = async () =>{
      let res = await proxy.$api.getUserData();
      console.log(res);
      list.value = res.list.map((item)=>{
        //后端数据是sex，前端接收sexLabel,转换一下
        item.sexLabel = item.sex === 0? '女' : '男'
        return item;
      })
    };
    return {
      list,
      tableLabel,
    }
  },
});
</script>

<template>
  <div class="table">
    <el-table :data="list" style="width: 100%" height="500px">
    <el-table-column 
    v-for="item in tableLabel"
    :key="item.prop"
    :label="item.label"
    :prop="item.prop"
    :width="item.width ? item.width :125"
    />
    <el-table-column fixed="right" label="操作" min-width="180">
      <template #default>
        <el-button  type="primary" size="small">编辑</el-button>
        <el-button type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>