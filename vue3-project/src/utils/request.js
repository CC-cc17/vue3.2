import axios from 'axios';

// 创建 axios 实例
const request = axios.create({
  baseURL: 'https://api.example.com', // 替换为您的API基址
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 可在此设置需要在请求前统一处理的事务，如设置令牌头
    // config.headers['Authorization'] = AUTH_TOKEN;
    return config;
  },
  error => {
    // 请求错误操作
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 可在此处对响应数据进行处理
    return response.data;
  },
  error => {
    // 响应错误操作
    return Promise.reject(error);
  }
);

export default request;