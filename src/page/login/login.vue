<template>
   <div id="backont">
        <div class="meituan-content">
            <div class="login-cont">
            <div class="meituan-titile"> 拳皇登记系统 </div>
            <div class="meituan-user">
                <p>账号</p>
                <el-input v-model="account"  class="inputflex" placeholder="请输入账号" clearable />
            </div>
            <div class="meituan-user">
                <p>密码</p>
                <el-input v-model="password" class="inputflex" placeholder="请输入密码" show-password/>
            </div>
            <!-- 登陆和注册切换 -->
            <div class="reg-view" @click="regx = regx== '登陆' ? '注册' : '登陆' "> <p> {{regx}} </p> </div>
            <!-- 登陆或者注册 -->
            <el-button v-if="regx == '注册'"  @click="signin"  type="success" class="meituan-btn">登陆</el-button>
            <el-button v-else type="success" @click="register" class="meituan-btn">注册</el-button>
            </div>
        </div>
   </div>
</template>

<script>
import {reactive, toRefs, getCurrentInstance} from 'vue'
export default {
    setup() {
        const {proxy} = getCurrentInstance()
        const user = reactive({
            account: '',
            password: '',
            regx: '注册'
        })

        // 登陆
        function signin() {
            console.log("登陆",user.account, user.password)
        }

        // 注册
        const register = async()=> {
            const obj = {account: user.account, password: user.password}
            const res = await new proxy.$request(proxy.$urls.m().register, obj).doPost()
            // console.log(res)

            if (res.status != 200) {
                new proxy.$tips(res.data.msg, "error").print_message()
            } else {
                new proxy.$tips(res.data.msg).print_message()
                user.regx = '注册'
            }
        }

        return {...toRefs(user), signin, register}
    }
}

</script>

<style>
</style>