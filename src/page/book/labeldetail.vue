<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="User" name="first">User</el-tab-pane>
      <el-tab-pane label="Config" name="second">Config</el-tab-pane>
      <el-tab-pane label="Role" name="third">Role</el-tab-pane>
      <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </el-tabs>
</template>

<script>

export default {
data() {
  return {
    label_id: 0,
  }
},
created() {
      this.label_id = this.$route.query.label_id
      console.log("label id",  this.label_id )
  },
  methods: {

  },
  components: {

  },
}

</script>
