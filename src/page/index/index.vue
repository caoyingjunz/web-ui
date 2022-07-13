<template>
  <el-container class="modules-header-cf-header-container">
    <el-header
      style="display: flex; background-color: rgb(40, 43, 51); align-items: stretch; justify-content: space-between; height: 50px; padding: 0px 10px; color: rgb(173, 176, 184); fill: rgb(173, 176, 184);">
      <!-- header有两部分 -->
      <div style="display: flex; align-items:center;">
        <img src="../../../static/huawei.logo.png" />
        <span style="font-size:medium;">貔貅云</span>

        <el-button type="text" style="margin-left: 30px; background-color: rgb(40, 43, 51)">
          <el-icon style="vertical-align: middle;margin-right: 0px; font-size:large;">
            <HomeFilled />
          </el-icon> <span style="font-size:small; color: #a6a1a1;">总览</span>
        </el-button>
        <span style="margin-left: 20px; font-size:medium;">|</span>
        <span style="margin-left: 20px; font-size:small;"> 云产品</span>
      </div>

      <div style="display: flex; align-items:center;">
        <el-input v-model="headInput" placeholder="请输入内容" :suffix-icon="Search" style="margin-right: 60px; width: 300px;" @blur="handleLost" @focus="handleInput" clearable>
          <template #suffix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template></el-input>
        <el-button style="margin-right: 20px;" type="text" @click="logout"> 退出 </el-button>
      </div>

    </el-header>

    <el-container>
      <!-- 左边侧边栏 -->
      <el-aside width="100px">

        <el-col :span="12">
          <el-menu active-text-color="#ffd04b" background-color="rgb(51, 55, 68)" class="el-menu-vertical-demo"
            border-right="none" :default-active="activeIndex" text-color="#fff" @open="handleOpen" @close="handleClose"
            router>

            <!-- 无子集 -->
            <el-menu-item index="/index" @click='saveActiveIndex("/index")'>
              <el-icon>
                <Menu />
              </el-icon>
              <span>主页</span>
            </el-menu-item>

            <!-- 无子集 -->
            <!-- <el-menu-item index="/user">
                  <el-icon><UserFilled /></el-icon>
                  <span>用户列表</span>
              </el-menu-item> -->

            <!-- 无子集 -->
            <el-menu-item index="/book" @click='saveActiveIndex("/book")'>
              <el-icon>
                <Notebook />
              </el-icon>
              <span>研究资料</span>
            </el-menu-item>

            <el-menu-item index="/label" @click='saveActiveIndex("/label")'>
              <el-icon>
                <Collection />
              </el-icon>
              <span>标签管理</span>
            </el-menu-item>

            <!-- 有子集 -->
            <el-sub-menu index="4">
              <template #title>
                <el-icon>
                  <Setting />
                </el-icon>
                <span>系统设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/role" @click='saveActiveIndex("/role")'>
                  <el-icon>
                    <UserFilled />
                  </el-icon>
                  <span>用户管理</span>
                </el-menu-item>
                <!-- <el-menu-item index="/setting" @click='saveActiveIndex("/setting")'>
                      <el-icon><Promotion /></el-icon>
                      <span>标签管理</span>
                  </el-menu-item> -->
              </el-menu-item-group>
            </el-sub-menu>

          </el-menu>
        </el-col>

      </el-aside>

      <!-- 主体 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  import {
    Menu,
    Setting,
    Notebook,
    UserFilled,
    Collection,
    HomeFilled,
    Search,
    Lock,
  } from '@element-plus/icons-vue'

  export default {
    data() {
      return {
        activeIndex: '',
        headInput: "",
        circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      }
    },
    created() {
      this.activeIndex = window.sessionStorage.getItem('activeIndex')
      if (!this.activeIndex) {
        this.activeIndex = '/index'
      }
    },
    methods: {
      handleLost(){
        console.log("lost")
      },
      handleInput(){
        console.log("input")
      },
      logout() {
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
      Menu,
      Notebook,
      Setting,
      Lock,
      Collection,
      UserFilled,
      HomeFilled,
      Search,
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

  .modules-header-cf-header-container {
    height: 100%;
    width: 100%;
    font-weight: 400;
    font-style: normal;
    /* position: fixed; */
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

  .el-header {
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

  .el-aside {
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

  .el-main {
    background: #fff;
  }
</style>