import {createRouter,createWebHashHistory} from "vue-router";

const routes =[
    {
        path:'/', //路径
        redirect: '/index'
    },
    {
        path:'/index', //主页路径
        name:'index', //名字
        component:()=>import('../views/index/index.vue') //位置
    },
    {
        path:'/industry', //行业信息路径
        name:'industry', //名字
        component:()=>import('../views/industry/index.vue') //位置
    },
    {
        path:'/article', //参考资料路径
        name:'article', //名字
        component:()=>import('../views/article/index.vue') //位置
    },
    {
        path:'/test', //性格测试路径
        name:'test', //名字
        component:()=>import('../views/test/index.vue') //位置
    },
    {
        path:'/login', //登录路径
        name:'login', //名字
        component:()=>import('../views/login/index.vue') //位置
    },
]

const router = createRouter ({
    history: createWebHashHistory(),
    routes
})
export default router