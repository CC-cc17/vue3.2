import Mock from 'mockjs'
import homeApi from './mock/home'
import userApi from './mock/user'
//拦截请求
Mock.mock('/home/getData', homeApi.getHomeData)

//本地获取user的数据
Mock.mock(/user\/getUser/,'get',userApi.getUserList)