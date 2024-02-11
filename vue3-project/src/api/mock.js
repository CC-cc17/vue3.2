import Mock from 'mockjs'
import homeApi from './mock/home'
//拦截请求
Mock.mock('/home/getData', homeApi.getHomeData)