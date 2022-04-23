<template>
   <div id="backont">
        <div class="meituan-content">
            <div class="login-cont">
            <div class="meituan-titile"> 拳皇管理系统 </div>
            <div class="meituan-user">
                <p>账号</p>
                <el-input v-model="user.account" class="inputflex" placeholder="请输入账号" clearable />
            </div>
            <div class="meituan-user">
                <p>密码</p>
                <el-input v-model="user.password" class="inputflex" placeholder="请输入密码" show-password/>
            </div>

            <div class="reg-view"> </div>
            <el-button @click="login" type="success" :loading="load" class="meituan-btn">登陆</el-button>

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
        async login(){
            this.load = true
            if (this.user.account == "admin" && this.user.password == "admin" ) {
                this.load =false
                this.$message.success("登陆成功")
                // 缓存 token 到本地
                window.sessionStorage.setItem("token", "faketoken")

                this.$router.push('/index')
            } else {
                this.load =false
                this.$message.error("用户名或密码错误")
            }
        },
    },
    components: {

    }
}
</script>

<style>
</style>