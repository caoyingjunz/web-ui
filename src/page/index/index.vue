<template>
    <div>
        <!-- 顶部 -->
        <div class="sidebar-top">
           <div>拳皇管理系统</div>
           <div>退出</div>
        </div>

        <div class="sidebar-cont">
            <el-menu :default-active="active_index" @select="Select">
                <el-menu-item index="1">
                    <template #title>
                        <el-icon><histogram /></el-icon>
                        <span>草薙京</span>
                    </template>
                </el-menu-item>

                <el-menu-item index="2">
                    <template #title>
                        <el-icon><user-filled /></el-icon>
                        <span>八神</span>
                    </template>
                </el-menu-item>

                <el-menu-item index="3">
                    <template #title>
                        <el-icon><notebook /></el-icon>
                         <span>剑魂</span>
                    </template>
                </el-menu-item>

                <!-- 二级，三级 -->
                <el-sub-menu index="4">
                    <template #title>
                        <el-icon><Setting /></el-icon>
                        <span>角色管理</span>
                    </template>

                    <el-menu-item index="4-1">
                        <template #title>
                            <el-icon><knife-fork /></el-icon>
                            <span>攻击力</span>
                        </template>
                    </el-menu-item>

                </el-sub-menu>
            </el-menu>
        </div>
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

import {ref,onMounted} from 'vue'

export default{
    components: {Histogram,Setting,Notebook,UserFilled,KnifeFork},

    setup(){
        const active_index = ref('1')
        // 菜单激活回调
        function Select(index, path){
            console.log(path)
            localStorage.setItem('menuid', JSON.stringify(index))
        }

        onMounted(()=>{
            active_index.value = JSON.parse(localStorage.getItem('menuid'))
        })

      return {active_index, Select}
    }
}
</script>

<style></style>