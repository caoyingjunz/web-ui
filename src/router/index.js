import {createRouter, createWebHashHistory} from "vue-router"

const routes = [
    { // 登陆界面
        path: '/',
        name:'login',
        component:()=> import(/*webpackChunkName:'Login'*/ '@/page/login/login.vue')
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router