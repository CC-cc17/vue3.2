<script>
import { computed, ref, getCurrentInstance, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    // 在组件挂载完成后获取登录数据
    onMounted(async () => {
      await getLoginInfo();
    });

    const { proxy } = getCurrentInstance();
    const loginData = ref({})

    // 根据用户角色动态显示学生或公司表单
    const isStudentVisible = computed(() => { return loginData.value.role === 'student' });
    const isCompanyVisible = computed(() => { return loginData.value.role === 'company' });

    //检查表单是否已经提交
    const isStudentFormSubmitted = ref(false);
    const isCompanyFormSubmitted = ref(false);

    // 学生表单数据
    const studentFormData = ref({
      id: '',
      uid: '',
      name: '',
      industryType: null,
      age: '',
      gender:'',
      describe: '',
      supervisor: '',
      supervisorPhone: '',
      availableStart: null,
      availableEnd: null,
    });

    // 公司表单数据
    const companyFormData = ref({
      id: '',
      uid: '',
      companyName: '',
      industryType: null,
      genderRequire: null,
      positionStart: null,
      positionEnd: null,
      positionDescribe: '',
      quota: 1,
      contactPerson: '',
      contactPhone: '',
      companyAddress: ''
    });

    // 行业选项数据
    const industryOptions = ref([
      { label: '农,林,牧,渔业', value: '1' },
      { label: '采矿业', value: '2' },
      { label: '电力,热力,燃气及水生产和供应业', value: '3' },
      { label: '建筑业', value: '4' },
      { label: '制造业', value: '5' },
      { label: '批发和零售业', value: '6' },
      { label: '交通运输,仓储和邮政业', value: '7' },
      { label: '住宿和餐饮业', value: '8' },
      { label: '信息传输,软件和信息技术服务业', value: '9' },
      { label: '金融业', value: '10' },
      { label: '房地产业', value: '11' },
      { label: '租赁和商务服务业', value: '12' },
      { label: '科学研究和技术服务业', value: '13' },
      { label: '水利,环境和公共设施管理业', value: '14' },
      { label: '居民服务,修理和其他服务业', value: '15' },
      { label: '教育', value: '16' },
      { label: '卫生和社会工作', value: '17' },
      { label: '文化,体育和娱乐业', value: '18' },
      { label: '公共管理,社会保障和社会组织', value: '19' },
      { label: '国际组织', value: '20' },
    ]);

    // 获取登录数据的方法
    const store = useStore()

    // 获取登录数据的方法
    const getLoginInfo = async () => {
      const token = store.state.token;
      let res = await proxy.$api.getUserInfo({ token: token });
      //console.log(res);
      loginData.value = res.data;
      // 将 uid 添加到表单数据中
      studentFormData.value.uid = res.data.uid;
      companyFormData.value.uid = res.data.uid;

      // 根据用户角色查询相应的信息
      if (loginData.value.role === 'student') {
        queryStudentInfo();
      } else if (loginData.value.role === 'company') {
        queryCompanyInfo();
      }
    }

    // 查询学生信息的方法
    const queryStudentInfo = async () => {
      try {
        let res = await proxy.$api.queryStudentInfo(loginData.value.uid);
        if (res) {
          studentFormData.value = res.data;
          isStudentFormSubmitted.value = true;
        }
      } catch (error) {
        console.error(error);
      }
    };

    // 查询企业信息的方法
    const queryCompanyInfo = async () => {
      try {
        let res = await proxy.$api.queryCompanyInfo(loginData.value.uid);
        //console.log(res.data);
        if (res) {
          companyFormData.value = res.data;
          isCompanyFormSubmitted.value = true;
        }
      } catch (error) {
        console.error(error);
      }
    };

    // 提交学生表单的方法
    const submitStudentForm = async () => {
      console.log('提交学生信息表单:', studentFormData.value);
      try {
        let res;
        if (isStudentFormSubmitted.value) {
          // 如果学生信息已经提交过，则调用更新接口
          res = await proxy.$api.updateStudentInfo(studentFormData.value);
        } else {
          // 如果学生信息尚未提交，则调用提交接口
          res = await proxy.$api.submitStudentInfo(studentFormData.value);
        }
        //console.log(res);
        ElMessage.success('学生信息提交成功');
        isStudentFormSubmitted.value = true;
      } catch (error) {
        console.error(error);
        ElMessage.error('提交学生信息失败');
      }
    };

    // 提交公司表单的方法
    const submitCompanyForm = async () => {
      console.log('提交企业信息表单:', companyFormData.value);
      try {
        let res;
        if (isCompanyFormSubmitted.value) {
          // 如果企业信息已经提交过，则调用更新接口
          res = await proxy.$api.updateCompanyInfo(companyFormData.value);
        } else {
          // 如果企业信息尚未提交，则调用提交接口
          res = await proxy.$api.submitCompanyInfo(companyFormData.value);
        }
        //console.log(res);
        ElMessage.success('企业信息提交成功');
        isCompanyFormSubmitted.value = true;
      } catch (error) {
        console.error(error);
        ElMessage.error('提交企业信息失败');
      }
    };

    return {
      isStudentVisible,
      isCompanyVisible,
      studentFormData,
      companyFormData,
      industryOptions,
      submitStudentForm,
      submitCompanyForm,
      getLoginInfo,
      isStudentFormSubmitted,
      isCompanyFormSubmitted,
      queryStudentInfo,
      queryCompanyInfo,
    };
  },
};
</script>
<template>
  <el-container>
    <el-main>
      <!-- 学生表单 -->
      <el-form v-if="isStudentVisible" ref="studentForm" :model="studentFormData" label-width="120px">
        <p style="margin-bottom: 20px;">在此录入职业配对信息:</p>
        <el-form-item label="真实姓名">
          <el-input clearable :disabled="isStudentFormSubmitted" style="width: 300px;"
            v-model="studentFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="行业志愿">
          <el-select clearable :disabled="isStudentFormSubmitted" v-model="studentFormData.industryType"
            placeholder="请选择">
            <el-option v-for="item in industryOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number clearable :disabled="isStudentFormSubmitted" v-model="studentFormData.age"
            :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="性别">
          <el-select clearable :disabled="isStudentFormSubmitted" v-model="studentFormData.gender"
            placeholder="请选择">
            <el-option label="男" value="Male"></el-option>
            <el-option label="女" value="Female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自我介绍">
          <el-input clearable style="width: 700px;" type="textarea" v-model="studentFormData.describe"></el-input>
        </el-form-item>
        <el-form-item label="监护人姓名">
          <el-input clearable style="width: 300px;" v-model="studentFormData.supervisor"></el-input>
        </el-form-item>
        <el-form-item label="监护人联系电话">
          <el-input clearable style="width: 300px;" v-model="studentFormData.supervisorPhone"></el-input>
        </el-form-item>
        <el-form-item label="可工作日期(始)">
          <el-date-picker clearable :disabled="isStudentFormSubmitted" v-model="studentFormData.availableStart"
            type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="可工作日期(终)">
          <el-date-picker clearable :disabled="isStudentFormSubmitted" v-model="studentFormData.availableEnd" type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitStudentForm">提交</el-button>
        </el-form-item>
      </el-form>

      <!-- 公司表单 -->
      <el-form v-if="isCompanyVisible" ref="companyForm" :model="companyFormData" label-width="120px">
        <p style="margin-bottom: 20px;">在此录入职业配对信息:</p>
        <el-form-item label="企业名称">
          <el-input clearable :disabled="isCompanyFormSubmitted" style="width: 600px;" v-model="companyFormData.companyName"></el-input>
        </el-form-item>
        <el-form-item label="行业类型">
          <el-select clearable :disabled="isCompanyFormSubmitted" v-model="companyFormData.industryType"
            placeholder="请选择">
            <el-option v-for="item in industryOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别要求">
          <el-select clearable :disabled="isCompanyFormSubmitted" v-model="companyFormData.genderRequire"
            placeholder="请选择">
            <el-option label="男" value="Male"></el-option>
            <el-option label="女" value="Female"></el-option>
            <el-option label="无要求" value="Any"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作开始的日期">
          <el-date-picker clearable :disabled="isCompanyFormSubmitted" v-model="companyFormData.positionStart" type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工作结束的日期">
          <el-date-picker clearable :disabled="isCompanyFormSubmitted" v-model="companyFormData.positionEnd" type="date"
            placeholder="选择日期">
          </el-date-picker>
          <el-form-item label="名额">
            <el-input-number clearable :disabled="isCompanyFormSubmitted" v-model="companyFormData.quota"
              :min="0"></el-input-number>
          </el-form-item>
        </el-form-item>
        <el-form-item label="工作/企业介绍">
          <el-input clearable style="width: 700px;" type="textarea" v-model="companyFormData.positionDescribe"></el-input>
        </el-form-item>
        <el-form-item label="联络人姓名">
          <el-input clearable style="width: 300px;" v-model="companyFormData.contactPerson"></el-input>
        </el-form-item>
        <el-form-item label="联络人电话">
          <el-input clearable style="width: 300px;" v-model="companyFormData.contactPhone"></el-input>
        </el-form-item>
        <el-form-item label="企业地址">
          <el-input clearable style="width: 700px;" type="textarea" v-model="companyFormData.companyAddress"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitCompanyForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>