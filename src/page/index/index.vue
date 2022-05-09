<template>
    <el-container class="modules-header-cf-header-container">
      <el-header style="display: flex; background-color: rgb(40, 43, 51); align-items: stretch; justify-content: space-between; height: 50px; padding: 0px 10px; color: rgb(173, 176, 184); fill: rgb(173, 176, 184);">
        <!-- header有两部分 -->
        <div style="display: flex; align-items:center;">
          <img src="../../../static/huawei.logo.png"/>
          <span style="font-size:medium;"> 华为云 </span>
        </div>

        <div style="display: flex; align-items:center;">
          <el-button style="margin: 0px 20px;"  type="text" @click="logout"> 退出 </el-button>
        </div>
      </el-header>

      <el-container>
        <!-- 左边侧边栏 -->
        <el-aside width="100px">

          <el-col :span="12">
            <el-menu
              active-text-color="#ffd04b"
              background-color="rgb(51, 55, 68)"
              class="el-menu-vertical-demo"
              border-right="none"
              :default-active="activeIndex"
              text-color="#fff"
              @open="handleOpen"
              @close="handleClose"
              router
            >

              <!-- 无子集 -->
              <el-menu-item index="/index" @click='saveActiveIndex("/index")'>
                  <el-icon><Histogram /></el-icon>
                  <span>总览</span>
              </el-menu-item>

              <!-- 无子集 -->
              <!-- <el-menu-item index="/user">
                  <el-icon><UserFilled /></el-icon>
                  <span>用户列表</span>
              </el-menu-item> -->

              <!-- 无子集 -->
              <el-menu-item index="/book" @click='saveActiveIndex("/book")'>
                  <el-icon><Notebook /></el-icon>
                  <span>资料管理</span>
              </el-menu-item>

              <!-- 有子集 -->
              <el-sub-menu index="4">
              <template #title>
                  <el-icon><Setting /></el-icon>
                  <span>系统设置</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/setting" @click='saveActiveIndex("/setting")'>
                      <el-icon><Lock /></el-icon>
                      <span>权限设置</span>
                  </el-menu-item>
                  <el-menu-item index="/role" @click='saveActiveIndex("/role")'>
                      <el-icon><UserFilled /></el-icon>
                      <span>用户管理</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>

            </el-menu>
          </el-col>

        </el-aside>

        <!-- 主体 -->
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>

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
        return {
          Histogram: '',
          Notebook: '',
          Setting: '',
          Lock: '',
          UserFilled: '',
          activeIndex: '',
        }
    },
    created(){
      this.activeIndex = window.sessionStorage.getItem('activeIndex')
      if (!this.activeIndex) {
        this.activeIndex = '/index'
      }
    },
    methods: {
      logout(){
        // 清除本地缓存的 token 和 menuid
        window.sessionStorage.clear()
        // 跳转到登陆页面
        this.$router.push('/')
      },
      saveActiveIndex(activeIndex) {
        window.sessionStorage.setItem('activeIndex', activeIndex)
        this.activeIndex = activeIndex
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

<style scoped="scoped">
.home_container {
  height: 100%;
}


.modules-plain-text-cf-header-console-name {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: inherit;
    line-height: 50px;
    cursor: pointer;
}

.modules-header-cf-header-container{
  height: 100%;
  width: 100%;
  font-weight: 400;
  font-style: normal;
  position: fixed;
  min-width: 1120px;
  z-index: 1002;
  top: 0;
  left: 0;
  background-color: #ebe7e7;
}

.modules-user-info-user-info-menu-wrapper-user-info-multi-user-info {
    line-height: 130%;
    display: inline-block;
    vertical-align: middle;
    max-width: 210px;
}

.el-header{
  background: rgb(55, 61, 61);
  display: flex;
  justify-content: space-between;
  line-height: 60px;
  color: #fff;
  font-size: 25px;
}

.el-header img {
  vertical-align: middle;
  /* 调整图片高度 */
  height: 80%;
  width: auto;
  margin: 5px;
}

.el-aside{
  background: rgb(51, 55, 68);
  height: 100%;
  width: 200px;
}

.el-menu {
  border-right: none;
  width: 200px;
}

.modules-user-info-user-info-menu-wrapper-user-info-text {
    text-decoration: none;
    display: flex;
    align-items: center;
}

.el-main{
  background: rgb(234, 237, 241);
}
</style>
