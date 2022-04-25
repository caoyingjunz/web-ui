<template>
    <el-container class="home_container">
      <el-header>
        <!-- header有两部分 -->
        <div>
          <img src="../../../static/favicon.jpeg" width="80" height="60"/>
          <span> 云资料系统 </span>
        </div>

        <div>
          <el-button type="primary" @click="logout"> 退出 </el-button>
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
              default-active="4"
              text-color="#fff"
              @open="handleOpen"
              @close="handleClose"
              router
            >

              <!-- 无子集 -->
              <el-menu-item index="/index">
                  <el-icon><Histogram /></el-icon>
                  <span>总览</span>
              </el-menu-item>

              <!-- 无子集 -->
              <el-menu-item index="/user">
                  <el-icon><UserFilled /></el-icon>
                  <span>用户列表</span>
              </el-menu-item>

              <!-- 无子集 -->
              <el-menu-item index="/book">
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
          </el-col>

        </el-aside>

        <!-- 主体 -->
        <el-main></el-main>
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
        return{
          Histogram: '',
          Notebook: '',
          Setting: '',
          Lock: '',
          UserFilled: '',
        }
    },
    methods: {
      logout(){
        // 清除本地缓存的 token 和 menuid
        window.sessionStorage.clear()
        // 跳转到登陆页面
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

<style scoped="scoped">
.home_container {
  height: 100%;
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
  height: 60%;
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

.el-main{
  background: rgb(234, 237, 241);
}
</style>