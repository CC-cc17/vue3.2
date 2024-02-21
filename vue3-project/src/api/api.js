//整个项目api的管理

import request from "./request"
export default {
    //获取行业人数表单数据(在用)
    getTableData() {
        return request({
            url: '/data/tableData',
            method: 'get',
        })
    },
    //获取配对相关统计数据(在用)
    getCountData() {
        return request({
            url: '/data/countData',
            method: 'get',
        })
    },
    getLineChartData() {
        return request({
            url: '/home/getChartData',
            method: 'get',
            mock: true
        })
    },
    //获取饼状图数据(在用)
    getPieChartData() {
        return request({
            url: '/data/pieData',
            method: 'get',
        })
    },
    //获取柱状图数据(在用)
    getBarChartData() {
        return request({
            url: '/data/barData',
            method: 'get',
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

    //获取用户列表(在用)
    getUserData(params) {
        return request({
            url: '/user/list',
            method: 'get',
            data: params,
        })
    },

    //获取配对列表(在用)
    getJobMatchList(params) {
        return request({
            url: '/jobmatch/list',
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

    //用户注册（在用)
    registerUser(params) {
        return request({
            url: '/user/register',
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

    // 更新登录用户信息(在用)
    updateUserInfo(params) {
        return request({
            url: '/user/updateInfo',
            method: 'put',
            data: params
        });
    },
    //用户登录 (在用)
    userLogin(params) {
        return request({
            url: '/user/login',
            method: 'post',
            data: params
        });
    },
    //用户登出 (在用)
    userLogout() {
        return request({
            url: '/user/logout',
            method: 'post',
            withCredentials: true,
        });
    },

    //提交企业表单（在用)
    submitCompanyInfo(params) {
        return request({
            url: '/companyDetail',
            method: 'post',
            data: params,
        })
    },
    //提交学生表单（在用)
    submitStudentInfo(params) {
        return request({
            url: '/studentDetail',
            method: 'post',
            data: params,
        })
    },
    //查询企业信息(在用)
    queryCompanyInfo(uid) {
        return request({
            url: `/companyDetail/${uid}`,
            method: 'get',
        })
    },
    //查询学生信息(在用)
    queryStudentInfo(uid) {
        return request({
            url: `/studentDetail/${uid}`,
            method: 'get',
        })
    },
    //更新企业信息(在用)
    updateCompanyInfo(params) {
        return request({
            url: '/companyDetail',
            method: 'put',
            data: params,
        })
    },
    //更新学生信息(在用)
    updateStudentInfo(params) {
        return request({
            url: '/studentDetail',
            method: 'put',
            data: params,
        })
    },
    //学生查询配对到的企业信息(在用)
    queryStudentMatch(uid) {
        return request({
            url: `/studentDetail/match/${uid}`,
            method: 'get',
        })
    },
    //企业查询配对到的学生信息(在用)
    queryCompanyMatch(uid) {
        return request({
            url: `/companyDetail/match/${uid}`,
            method: 'get',
        })
    },
}