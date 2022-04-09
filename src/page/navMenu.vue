<template>
    <el-aside width="200px">
        <!-- <div class="sidebar-cont"> -->
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo" router>

            <!-- 无子集 -->
            <el-menu-item index="/index">
                <el-icon><Histogram /></el-icon>
                <span>概览</span>
            </el-menu-item>

            <!-- 无子集 -->
            <el-menu-item index="2">
                <el-icon><Notebook /></el-icon>
                <span>用户列表</span>
            </el-menu-item>

            <!-- 有子集 -->
            <el-sub-menu index="3">
            <template #title>
                <el-icon><Setting /></el-icon>
                <span>系统设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">
                    <el-icon><UserFilled /></el-icon>
                    <span>权限设置</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

        </el-menu>
        <!-- </div> -->
    </el-aside>
</template>

<script>
import {
    Histogram,
    Setting,
    Notebook,
    UserFilled,
  } from '@element-plus/icons-vue'

export default {
    data() {
        return{

        }
    },
    methods: {

    },
    components: {
        Histogram,
        Notebook,
        Setting,
        UserFilled
    }
}
</script>

