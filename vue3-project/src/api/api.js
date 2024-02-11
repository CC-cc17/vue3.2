//整个项目api的管理

import request from "./request"
export default {
    //home 组件
    getTableData(params) {
        return request({
            url:'/home/getTableData',
            method: 'get',
            data: params,
            mock: true
        })
    },
    getCountData() {
        return request({
            url:'/home/getCountData',
            method:'get',
            mock: true
        })
    },
    getChartData(){
        return request({
            url:'/home/getChartData',
            method:'get',
            mock: true
        })       
    }
}