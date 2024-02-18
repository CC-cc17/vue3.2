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
    //获取用户登录信息 (在用)
    getUserInfo(params) {
        return request({
            url: '/user/info',
            method: 'get',
            data: params,
        })
    },
    getChartData() {
        return request({
            url: '/home/getChartData',
            method: 'get',
            mock: true
        })
    },
    //获取用户列表(在用)
    getUserData(params) {
        return request({
            url: '/user/list',
            method: 'get',
            data: params,
        })
    },

    //管理员添加用户（在用)
    addUser(params) {
        return request({
            url: '/user',
            method: 'post',
            data: params,
        })
    },

    //管理员编辑用户（在用)
    editUser(params) {
        return request({
            url: '/user',
            method: 'put',
            data: params
        })
    },

    //通过id获取用户(在用)
    getUserById(uid) {
        return request({
            url: `/user/${uid}`,
            method: 'get',
        })
    },


    //通过id删除用户（在用)
    deleteUser(uid) {
        return request({
            url: `/user/${uid}`,
            method: 'delete',
        })
    },

    //根据用户名(TODO 根据用户角色)不同返回不一样的菜单列表 (在用)
    getMenu(params) {
        return request({
            url: '/permission/getMenu',
            method: 'post',
            data: params
        })
    },

    // 更新用户信息
    updateUserInfo(params) {
        return request({
            url: '/user/updateInfo',
            method: 'put',
            data: params
        });
    },
    //用户登录 (在用)
    userLogin(params){
        return request({
            url:'/user/login',
            method: 'post',
            data:params
        });
    },
    //用户登出 (在用)
    userLogout(){
        return request({
            url:'/user/logout',
            method: 'post',
            withCredentials: true,
        });
    }
}