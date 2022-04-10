import {createRouter, createWebHashHistory} from "vue-router"

const routes = [
    { // 登陆界面
        path: '/',
        name: 'login',
        component:()=> import(/*webpackChunkName:'Login'*/ '@/page/login/login.vue')
    },
    { // 主界面
        path: '/index',
        name: 'index',
        component:()=> import(/*webpackChunkName:'Index'*/ '@/page/index/index.vue'),
        redirect: '/user',
        // 二级路由
        children: [
            {
                path: '/user',
                name: 'user',
                component:()=> import(/*webpackChunkName:'User'*/ '@/page/user/user.vue')
            },
            {
                path: '/book',
                name: 'book',
                component:()=> import(/*webpackChunkName:'Book'*/ '@/page/book/book.vue')
            },
            { // 系统设置页面
                path: '/setting',
                name: 'setting',
                component:()=> import(/*webpackChunkName:'Setting'*/ '@/page/setting/index.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
