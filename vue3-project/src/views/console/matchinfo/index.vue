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
      realname: '',
      industry_type: null,
      age: '',
      describe: '',
      supervisor: '',
      supervisor_phone: '',
      available_start: null,
      available_end: null
    });

    // 公司表单数据
    const companyFormData = ref({
      company_name: '',
      industry_type: null,
      gender_require: null,
      position_start: null,
      position_end: null,
      position_describe: '',
      contact_person: '',
      contact_phone: '',
      company_address: ''
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
    const getLoginInfo = async () => {
      const token = store.state.token;
      let res = await proxy.$api.getUserInfo({ token: token });
      console.log(res);
      loginData.value = res.data;
    }

    // 提交学生表单的方法
    const submitStudentForm = () => {
      console.log('Submitting student form:', studentFormData.value);
      // TODO: 实现提交逻辑
      isStudentFormSubmitted.value = true;
    };

    // 提交公司表单的方法
    const submitCompanyForm = () => {
      console.log('Submitting company form:', companyFormData.value);
      // TODO: 实现提交逻辑
      isCompanyFormSubmitted.value = true;
    };

    // 清空表单的方法
    const resetForm = () => {
      // 根据当前用户角色清空相应的表单
      if (loginData.value.role === 'student') {
        studentFormData.value = {
          realname: '',
          industry_type: null,
          age: '',
          describe: '',
          supervisor: '',
          supervisor_phone: '',
          available_start: null,
          available_end: null
        };
      } else if (loginData.value.role === 'company') {
        companyFormData.value = {
          company_name: '',
          industry_type: null,
          gender_require: null,
          position_start: null,
          position_end: null,
          position_describe: '',
          contact_person: '',
          contact_phone: '',
          company_address: ''
        };
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
      resetForm,
      getLoginInfo,
      isStudentFormSubmitted,
      isCompanyFormSubmitted,
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
            v-model="studentFormData.realname"></el-input>
        </el-form-item>
        <el-form-item label="行业类型">
          <el-select clearable :disabled="isStudentFormSubmitted" v-model="studentFormData.industry_type"
            placeholder="请选择">
            <el-option v-for="item in industryOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number clearable :disabled="isStudentFormSubmitted" v-model="studentFormData.age"
            :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="自我介绍">
          <el-input clearable style="width: 700px;" type="textarea" v-model="studentFormData.describe"></el-input>
        </el-form-item>
        <el-form-item label="监护人姓名">
          <el-input clearable style="width: 300px;" v-model="studentFormData.supervisor"></el-input>
        </el-form-item>
        <el-form-item label="监护人联系电话">
          <el-input clearable style="width: 300px;" v-model="studentFormData.supervisor_phone"></el-input>
        </el-form-item>
        <el-form-item label="可工作日期(始)">
          <el-date-picker clearable :disabled="isStudentFormSubmitted" v-model="studentFormData.available_start"
            type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="可工作日期(终)">
          <el-date-picker clearable :disabled="isStudentFormSubmitted" v-model="studentFormData.available_end" type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitStudentForm">提交</el-button>
          <!-- <el-button @click="resetForm">清空</el-button> -->
        </el-form-item>
      </el-form>

      <!-- 公司表单 -->
      <el-form v-if="isCompanyVisible" ref="companyForm" :model="companyFormData" label-width="120px">
        <p style="margin-bottom: 20px;">在此录入职业配对信息:</p>
        <el-form-item label="企业名称">
          <el-input clearable style="width: 600px;" v-model="companyFormData.company_name"></el-input>
        </el-form-item>
        <el-form-item label="行业类型">
          <el-select clearable :disabled="isCompanyFormSubmitted" v-model="companyFormData.industry_type"
            placeholder="请选择">
            <el-option v-for="item in industryOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别要求">
          <el-select clearable :disabled="isCompanyFormSubmitted" v-model="companyFormData.gender_require"
            placeholder="请选择">
            <el-option label="男" value="Male"></el-option>
            <el-option label="女" value="Female"></el-option>
            <el-option label="无要求" value="Any"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作开始的日期">
          <el-date-picker clearable :disabled="isCompanyFormSubmitted" v-model="companyFormData.position_start"
            type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工作结束的日期">
          <el-date-picker clearable :disabled="isCompanyFormSubmitted" v-model="companyFormData.position_end" type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工作/企业介绍">
          <el-input clearable style="width: 700px;" type="textarea"
            v-model="companyFormData.position_describe"></el-input>
        </el-form-item>
        <el-form-item label="联络人姓名">
          <el-input clearable style="width: 300px;" v-model="companyFormData.contact_person"></el-input>
        </el-form-item>
        <el-form-item label="联络人电话">
          <el-input clearable style="width: 300px;" v-model="companyFormData.contact_phone"></el-input>
        </el-form-item>
        <el-form-item label="企业地址">
          <el-input clearable style="width: 700px;" type="textarea" v-model="companyFormData.company_address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitCompanyForm">提交</el-button>
        <!-- <el-button @click="resetForm">清空</el-button> -->
      </el-form-item>
    </el-form>
  </el-main>
</el-container></template>