<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/#/label">标签管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>标签详情</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>详情</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>

          </el-card>

        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="详情" name="first">

                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>详细信息</span>
                      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>
                  </el-card>

            </el-tab-pane>
            <el-tab-pane label="标签列表" name="second">

                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>标签列表</span>
                      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>
                  </el-card>

            </el-tab-pane>
            <el-tab-pane label="Role" name="third">Role</el-tab-pane>
            <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                label_id: 0,
                activeName: "first"
            }
        },
        created() {
            this.activeName = window.sessionStorage.getItem("activeName")
            this.label_id = this.$route.params.label_id
        },
        methods: {
            handleClick(tab, event) {
                this.activeName = tab.props.name
                window.sessionStorage.setItem("activeName", this.activeName)
            },
            handleOpen() {}
        },
        components: {

        },
    }
</script>

<style>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    color: #000000;
    /* width: 480px; */
  }

</style>