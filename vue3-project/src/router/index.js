import {createRouter,createWebHashHistory} from "vue-router";

const routes = [
    {
      path: '/',
      component: () => import('../layouts/DefaultLayout.vue'),
      children: [
        { path: '', redirect: '/index' },
        { path: 'index', component: () => import('../views/index/index.vue') },
        {
          path: '/industry', // 行业信息路径
          name: 'industry', // 名字
          component: () => import('../views/industry/index.vue') // 位置
        },
        {
          path: '/article', // 参考资料路径
          name: 'article', // 名字
          component: () => import('../views/article/index.vue') // 位置
        },
        {
          path: '/test', // 性格测试路径
          name: 'test', // 名字
          component: () => import('../views/test/index.vue') // 位置
        },
        {
          path: '/login', // 登录按钮路径
          name: 'login', // 名字
          component: () => import('../views/login/index.vue') // 位置
        },
        {
          path: '/register', // 注册路径
          name: 'register', // 名字
          component: () => import('../views/login/register.vue') // 位置
        },
        {
          path: '/reallogin', // 登录页面路径
          name: 'reallogin', // 名字
          component: () => import('../views/login/reallogin.vue') // 位置
        },
        {
          path: '/industry/:id', // 行业动态路径参数
          name: 'IndustryDetail',
          component: () => import('@/views/industries/index.vue') // 位置
        },
      ]
    },
    {
      path: '/console',
      component: () => import('../layouts/ConsoleLayout.vue'),
      redirect:'/console/home',
      children: [
        { path: '', component: () => import('../views/console/home/index.vue')},
        { path: '/console/home', name:'home', component: () => import('../views/console/home/index.vue')}, //后台主页
        { path: '/console/user', name:'user', component: () => import('../views/console/user/index.vue')}, //后台用户管理
        { path: '/console/page1', name:'page1', component: () => import('../views/console/page1/index.vue')},
        { path: '/console/page2', name:'page2', component: () => import('../views/console/page2/index.vue')},
      ]
    },
    {
        path: '/404',
        component: () => import('../layouts/SimpleLayout.vue'),
        children: [
          { path: '', component: () => import('../views/404.vue') }
        ]
      },
      { path: '/:pathMatch(.*)*', redirect: '/404' },  
];

const router = createRouter ({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { top: 0 }
      },
})
export default router