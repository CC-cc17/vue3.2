import axios from "axios";
import config from '../config'
import {ElMessage} from 'element-plus'
import Cookies from "js-cookie";

const NETWORK_ERROR = '网络请求异常,请稍后重试'
//创建axios实例对象

const service = axios.create({
    baseURL: config.baseApi
})

//在请求之前做的一些事情
service.interceptors.request.use((req) => {
    //可自定义header
    //jwt-token认证的时候
    return req
})

// 在请求之后做的一些事情(axios请求拦截)
service.interceptors.response.use((res) =>{
    console.log(res.data);
    const {code, data, msg} = res.data
    //根据后端而定
    if (code == 200){
        return {code, data, msg}
    }else {
    //网络请求错误
    ElMessage.error(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)
    }
})

//封装的核心函数
function request(options) {
    options.method = options.method || 'get'
    if(options.method.toLowerCase() == 'get') {
        options.params = options.data
    }
    // 对mock的处理
    let isMock = config.mock
    if(typeof options.mock !== 'undefined'){
        isMock = options.mock
    }
    //对线上环境做处理
    if(config.env == 'prod'){
        //线上环境不用mock
        service.defaults.baseURL = config.baseApi
    } else {
        service.defaults.baseURL = isMock ? config.mockApi :config.baseApi
    }

    return service(options)

}

export default request