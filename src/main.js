import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from './router/index.js'

// 全局引入css
import '../style/headtap.css'

const app = createApp(App)
app.use(ElementPlus, {locale: zhCn})
app.use(router)

// 请求地址
import urls from '../api/api.js'
app.config.globalProperties.$urls = urls

// 请求方法
import request from '../api/request.js'
app.config.globalProperties.$request = request

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080'

// http拦截: 在 axios 请求发送之前给每个接口携带token去后端校验
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem("token")
    return config
})
// http拦截: 在 axios 请求发送之后, 最返回值进行处理
axios.interceptors.request.use(
    response => {
        return response
    },
    err => {
        if (err.response) {
            let errs = err.response.status
            let msg = err.response.data.msg.msg // 后端返回
            let errdata = errs == 401 ? msg : '服务器内部错误'
            switch(errs) {
                case 401:
                // 没有权限
                this.$message.alert(errdata, 'Title', {
                    confirmButtonText: 'OK',
                    type: "error"
                })
                // .then(res=>{
                //     // 跳转到登陆界面
                // })
                // .catch(err=>{
                // })
                break;
            }
        }
        return Promise.reject(err.response.data) // 返回错误信息
    }
)
app.config.globalProperties.$http = axios

app.mount('#app')
