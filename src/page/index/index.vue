<template>
    <div class="common-layout">
        <el-container>
            <!-- 左侧导航 -->
            <NavMenu />

          <el-container>
            <el-header>Header</el-header>
            <el-main>Main</el-main>
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