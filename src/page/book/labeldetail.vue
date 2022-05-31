<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="详情" name="first">User</el-tab-pane>
        <el-tab-pane label="标签列表" name="second">Config</el-tab-pane>
        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </el-tabs>
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
      this.label_id = this.$route.query.label_id
  },
  methods: {
      handleClick(tab, event) {
          this.activeName = tab.props.name
          window.sessionStorage.setItem("activeName", this.activeName)
      }
  },
  components: {

  },
}
</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
