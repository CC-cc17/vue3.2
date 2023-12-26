<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface RuleForm {
    name: string
    email: string
    delivery: boolean
    identity: string
    desc: string
}
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    name: '',
    email: '',
    delivery: false,
    identity: '',
    desc: '',
})
const rules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: '请输入您的称呼', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入您的联系邮箱', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (value && value.indexOf('@') === -1) {
                    callback(new Error('请输入有效的邮箱地址'));
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        }
    ],
    identity: [
        {
            required: true,
            message: '请至少选择一个身份',
            trigger: 'blur,change',
        },
    ],
    desc: [
        { required: true, message: '请输入咨询/改善意见', trigger: 'blur' },
    ],
})
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

</script>

<template>
        <div class="index_title">
        <h3>联系我们</h3>
    </div>
    <div class="container_bg">
        <div class="contactus">
            <div class="form-container">
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                    :size="formSize" status-icon>
                    <el-form-item label="您的称呼" prop="name">
                        <el-input v-model="ruleForm.name" />
                    </el-form-item>
                    <el-form-item label="联系邮箱" prop="email">
                        <el-input v-model="ruleForm.email" />
                    </el-form-item>
                    <el-form-item label="您的身份" prop="identity">
                        <el-radio-group v-model="ruleForm.identity">
                            <el-radio label="学生" />
                            <el-radio label="家长" />
                            <el-radio label="老师" />
                            <el-radio label="企业代表" />
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="咨询/改善意见" prop="desc">
                        <el-input v-model="ruleForm.desc" type="textarea" />
                    </el-form-item>
                    <el-form-item>
                        <el-button color=#2462a8 type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
                        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="map-container">
                <b>地址:四川省成都市双流区西航港街道川大路二段2号</b>
                <iframe width="100%" height="100%" frameborder="0" style="border:0"
                    src="https://restapi.amap.com/v3/staticmap?location=104.000076,30.556682&zoom=13&size=600*300&markers=mid,,A:104.000076,30.556682&key=0e5ac2faec4d5cf7ce465119647a9217"
                    allowfullscreen scrolling="no">
                </iframe>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container_bg {
    display: flex;
    justify-content: center;
    padding: 0px;
}
.contactus {
    display: flex;
    flex-direction: row;
    width: 100%;
}
.form-container {
    flex: 1;
    padding: 20px;
    background-color: white;
}
.map-container {
    flex: 1;
    padding: 20px;
    overflow: hidden;
    font-size: 16px;
    color: #000000ab;
    text-align: center;
}
</style>