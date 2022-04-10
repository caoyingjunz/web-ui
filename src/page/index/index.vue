<template>
    <div class="common-layout">
        <el-container>
            <!-- 左侧导航 -->
            <NavMenu />
          <el-container>
            <!-- 右侧主体 -->
            <!-- 头部 -->
            <el-header>

              <Breadcrumb />
              <!-- <el-button class="exit" type="primary" @click="goBack()">退出</el-button> -->
            </el-header>
            <!-- 主体 -->

            <el-main><router-view /></el-main>
          </el-container>
        </el-container>
      </div>
</template>

<script>
import NavMenu from '../navMenu.vue'
import Breadcrumb from '../breadcrumb.vue'

export default {
    data() {
        return{

        }
    },
    methods: {

    },
    components: {
        NavMenu,
        Breadcrumb,
    }
}
</script>

<style></style>