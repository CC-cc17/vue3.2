// 环境配置文件


//获取当前环境
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
    development:{
        baseApi: 'http://localhost:6677',
        mockApi: 'https://dev.usemock.com/65c831f66309cc7a3775c533',
        springApi: 'http://localhost:6677',
    },
    test:{
        baseApi: 'test.future.com/api', //假的
        mockApi: 'https://dev.usemock.com/65c831f66309cc7a3775c533',
    },
    prod:{
        baseApi: '//future.com/api', //假的
        mockApi: 'https://dev.usemock.com/65c831f66309cc7a3775c533',
    },
}


export default {
    env,
    //mock总开关
    mock:false,
    ...EnvConfig[env]
}