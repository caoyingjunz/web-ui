import axios from 'axios'
import { Base64 } from 'js-base64'
import {ElMessageBox} from 'element-plus'

// 创建通用 axios配置
let instance = axios.create({
    responseType: "json",
    headers:{"Content-Type": "application/json"}
})

function baseFunc() {
    const token = localStorage.getItem('token') // 从缓存中取值
    const base64 = Base64.encode(token +':')
    return 'Basic' + base64
}

// http拦截: 在 axios 请求发送之前给每个接口携带token去后端校验
instance.interceptors.request.use(
    config =>{
        let token = localStorage.getItem('token')
        if (token) {
            config.baseFunc = baseFunc
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// ttp拦截: 在 axios 请求发送之后，对回显处理
instance.interceptors.response.use(
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
                ElMessageBox.alert(errdata, 'Title', {
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

export default instance
