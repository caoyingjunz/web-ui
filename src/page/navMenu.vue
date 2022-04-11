<template>
    <div class="sidebar-top">
        <div>拳皇管理系统</div>
        <div @click="logout">退出</div>
    </div>

    <div class="sidebar-cont">

    <el-aside width="200px">
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo" router>

            <!-- 无子集 -->
            <el-menu-item index="/index">
                <el-icon><Histogram /></el-icon>
                <span>概览</span>
            </el-menu-item>

            <!-- 无子集 -->
            <el-menu-item index="/user">
                <el-icon><UserFilled /></el-icon>
                <span>用户列表</span>
            </el-menu-item>

            <!-- 无子集 -->
            <el-menu-item index="/book">
                <el-icon><Notebook /></el-icon>
                <span>图书管理</span>
            </el-menu-item>

            <!-- 有子集 -->
            <el-sub-menu index="4">
            <template #title>
                <el-icon><Setting /></el-icon>
                <span>系统设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/setting">
                    <el-icon><Lock /></el-icon>
                    <span>权限设置</span>
                </el-menu-item>
                <el-menu-item index="/role">
                    <el-icon><UserFilled /></el-icon>
                    <span>角色设置</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </el-aside>

    </div>
</template>

<script>
import {
    Histogram,
    Setting,
    Notebook,
    UserFilled,
    Lock,
} from '@element-plus/icons-vue'

export default {
    data() {
        return{

        }
    },
    methods: {
        // 退出登陆
        logout(){
            // 清除本地缓存的 token 和 menuid
            localStorage.clear()
            this.$router.push('/')
         }
    },
    components: {
        Histogram,
        Notebook,
        Setting,
        Lock,
        UserFilled
    }
}
</script>

