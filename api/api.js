// 所有API请求接口

const url = "http://element.thexxdd.cn/api"

const urls = class {
   static m() {
        // 注册API
        const register = `${url}/register`
        // 登陆API
        const login = `${url}/login`
        return {
            register,
            login
        }
   }
}

export default urls
