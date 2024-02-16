//整个项目api的管理

import request from "./request"
export default {
    //home 组件
    getTableData(params) {
        return request({
            url: '/home/getTableData',
            method: 'get',
            data: params,
            mock: true
        })
    },
    getCountData() {
        return request({
            url: '/home/getCountData',
            method: 'get',
            mock: true
        })
    },
    getLoginData() {
        return request({
            url: '/home/getLoginData',
            method: 'get',
            mock: true
        })
    },
    getChartData() {
        return request({
            url: '/home/getChartData',
            method: 'get',
            mock: true
        })
    },
    getUserData(params) {
        return request({
            url: '/user/getUser',
            method: 'get',
            mock: false,
            data: params,
        })
    },
    addUser(params) {
        return request({
            url: '/user/add',
            method: 'post',
            mock: false,
            data: params,
            // data:{total: 0,page: 1,}
        })
    },
    editUser(params) {
        return request({
            url: '/user/edit',
            method: 'post',
            // 这个mock如果是true的话 用的就是线上fastmock的数据
            mock: false,
            data: params
        })
    },
    deleteUser(params) {
        return request({
            url: '/user/delete',
            method: 'get',
            // 这个mock如果是true的话 用的就是线上fastmock的数据
            mock: false,
            data: params
        })
    },
    //根据用户名(TODO 根据用户角色)不同返回不一样的菜单列表 
    getMenu(params) {
        return request({
            url: '/permission/getMenu',
            method: 'post',
            // 这个mock如果是true的话 用的就是线上fastmock的数据
            mock: false,
            data: params
        })
    },

    // 获取登录用户信息
    getLoginUser() {
        return request({
            url: '/user/loginInfo',
            method: 'get',
            mock: true
        });
    },
    // 更新用户信息
    updateUserInfo(data) {
        return request({
            url: '/user/updateInfo',
            method: 'post',
            mock: true,
            data
        });
    },
    //用户登录
    userLogin(params){
        return request({
            url:'/user/login',
            method: 'post',
            mock: false,
            data:params
        });
    }
}