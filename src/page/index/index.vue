<template>
    <div>
        <!-- 顶部 -->
        <div class="sidebar-top">
           <div>拳皇管理系统</div>
           <div>退出</div>
        </div>

        <div class="sidebar-cont">
            <el-menu>
                <el-menu-item index="1">
                    <template #title>
                        <el-icon><Location /></el-icon>
                        <span>草薙京</span>
                    </template>
                </el-menu-item>

                <el-menu-item index="2">八神</el-menu-item>
                <el-menu-item index="3">剑魂</el-menu-item>
                <!-- 二级，三级 -->
                <el-sub-menu index="4">
                    <template #title>不知火舞</template>
                    <el-menu-item index="4-1"> 不知火舞-1 </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </div>
    </div>
</template>

<script>
import {Location} from '@element-plus/icons-vue'

export default{
    components: {Location},

    // setup(){
    //     const Array = [
    //         {
    //             id: '1'
    //         }
    //     ]
    // }
}
</script>

<style></style>