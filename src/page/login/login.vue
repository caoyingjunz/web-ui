<template>
   <div id="backont">
        <div class="meituan-content">
            <div class="login-cont">
            <div class="meituan-titile"> 拳皇管理系统 </div>
            <div class="meituan-user">
                <p>账号</p>
                <el-input v-model="user.account"  class="inputflex" placeholder="请输入账号" clearable />
            </div>
            <div class="meituan-user">
                <p>密码</p>
                <el-input v-model="user.password" class="inputflex" placeholder="请输入密码" show-password/>
            </div>
            <!-- 登陆和注册切换 -->
            <!-- <div class="reg-view" @click="regx = regx== '登陆' ? '注册' : '登陆' "> <p> {{regx}} </p> </div> -->
            <div class="reg-view" @click="登陆"> <p> </p> </div>

            <!-- 登陆或者注册 -->
            <el-button v-if="regx == '注册'"  @click="signin"  type="success" :loading="load" class="meituan-btn">登陆</el-button>
            <!-- <el-button v-else type="success" @click="register" :loading="load" class="meituan-btn">注册</el-button> -->
            </div>
        </div>
   </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                account: "",
                password: "",
            },
            load: false
        }
    },
    methods: {
        async signin(){
            this.load = true

            if (this.user.account == "admin" && this.user.password == "admin" ) {
                this.load =false
                proxy.$router.push('/index')
            } else{
                this.load =false
                new proxy.$tips('用户名或密码错误', "error").print_message()
            }
          },
    components: {
    }
    }
}
</script>

<style>
</style>