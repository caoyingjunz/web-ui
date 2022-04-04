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

app.mount('#app')
