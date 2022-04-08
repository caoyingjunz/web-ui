<template>
    <div>
        <!-- 顶部 -->
        <div class="sidebar-top">
           <div>拳皇管理系统</div>
           <div @click="logout">退出</div>
                <!-- <el-button  @click="logout">退出</el-button> -->
           <!-- </div> -->
        </div>

        <div class="sidebar-cont">
            <el-menu :default-active="active_index" @select="Select">
                <el-menu-item index="1">
                    <template #title>
                        <el-icon><histogram /></el-icon>
                        <span>数据分析</span>
                    </template>
                </el-menu-item>

                <el-menu-item index="2">
                    <template #title>
                        <el-icon><user-filled /></el-icon>
                        <span>用户列表</span>
                    </template>
                </el-menu-item>

                <el-menu-item index="3">
                    <template #title>
                        <el-icon><notebook /></el-icon>
                         <span>订单管理</span>
                    </template>
                </el-menu-item>

                <!-- 二级，三级 -->
                <el-sub-menu index="4">
                    <template #title>
                        <el-icon><Setting /></el-icon>
                        <span>系统设置</span>
                    </template>

                    <el-menu-item index="4-1">
                        <template #title>
                            <el-icon><knife-fork /></el-icon>
                            <span>其他设置</span>
                        </template>
                    </el-menu-item>

                </el-sub-menu>
            </el-menu>
        </div>

        <router-view></router-view>

    </div>
</template>

<script>
import {
    Histogram,
    Setting,
    Notebook,
    UserFilled,
    KnifeFork
} from '@element-plus/icons-vue'

import {ref,onMounted,getCurrentInstance} from 'vue'

export default{
    components: {Histogram,Setting,Notebook,UserFilled,KnifeFork},

    setup(){
        const {proxy} = getCurrentInstance()

        // 默认打开页面，选择 index1
        const active_index = ref('1')
        // 菜单激活回调
        function Select(index, path){
            console.log(path)
            localStorage.setItem('menuid', JSON.stringify(index))
        }

        onMounted(()=>{
            active_index.value = JSON.parse(localStorage.getItem('menuid'))
        })

        // 退出登陆
        function logout(){
            // 清除本地缓存的 token 和 menuid
            localStorage.clear()
            proxy.$router.push('/')
        }

      return {active_index, Select, logout}
    }
}
</script>

<style></style>