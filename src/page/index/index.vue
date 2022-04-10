<template>
    <div class="common-layout">
        <el-container>
            <!-- 左侧导航 -->
            <NavMenu />
          <el-container>
            <!-- 右侧主题 -->
            <el-header>Header</el-header>
            <!-- 主题 -->
            <el-main><router-view /></el-main>
          </el-container>
        </el-container>
      </div>
</template>

<script>
import NavMenu from '../navMenu.vue'

export default {
    data() {
        return{

        }
    },
    methods: {

    },
    components: {
        NavMenu
    }
}
</script>

<style></style>