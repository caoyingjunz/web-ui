import {createRouter, createWebHashHistory} from "vue-router"

const routes = [
    { // 登陆界面
        path: '/',
        name: 'login',
        component:()=> import(/*webpackChunkName:'Login'*/ '@/page/login/login.vue')
    },
    { // 布局项
        path: '/index',
        name: 'index',
        meta: {title: '概览'},
        component:()=> import(/*webpackChunkName:'Index'*/ '@/page/index/index.vue'),
        // redirect: '/user',
        // 二级路由
        children: [
            { // 首页
                path: '/index',
                name: 'index',
                meta: {title: '概览'},
                component:()=> import(/*webpackChunkName:'Home'*/ '@/page/index/home.vue'),
            },
            {
                path: '/user',
                name: 'user',
                meta: {title: '用户列表'},
                component:()=> import(/*webpackChunkName:'User'*/ '@/page/user/user.vue'),
            },
            {
                path: '/user/add',
                name: 'add',
                meta: {title: '添加用户'},
                component:()=> import(/*webpackChunkName:'User'*/ '@/page/user/adduser.vue')
            },
            {
                path: '/book',
                name: 'book',
                meta: {title: '图书管理'},
                component:()=> import(/*webpackChunkName:'Book'*/ '@/page/book/book.vue')
            },
            { // 权限设置页面
                path: '/setting',
                name: 'setting',
                meta: {title: '权限管理'},
                component:()=> import(/*webpackChunkName:'Setting'*/ '@/page/setting/index.vue')
            },
            { // 角色设置页面
                path: '/role',
                name: 'role',
                meta: {title: '角色管理'},
                component:()=> import(/*webpackChunkName:'Role'*/ '@/page/setting/role.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
