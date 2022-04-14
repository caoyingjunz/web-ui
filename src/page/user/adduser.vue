<template>
    <div class="ordering">
        <!-- 卡片视图 -->
        <el-card>
            <!-- 提示区域 -->
            <el-alert title="添加用户信息" type="info" effect="dark" center show-icon :closable="false" />

            <!-- 步骤条区域 -->
            <el-steps :active="active" finish-status="success" align-center>
                <el-step title="基本信息" />
                <el-step title="用户属性" />
                <el-step title="用户详情" />
                <el-step title="完成" />
            </el-steps>

            <el-tabs v-model="active" :tab-position="'left'" style="height: 200px" class="demo-tabs">
                <el-tab-pane label="基本信息" name="1">基本信息</el-tab-pane>
                <el-tab-pane label="用户属性" name="2">用户属性</el-tab-pane>
                <el-tab-pane label="用户详情" name="3">用户详情</el-tab-pane>
                <el-tab-pane label="完成" name="4">完成</el-tab-pane>
            </el-tabs>

            <!-- 表单区域 -->

        </el-card>
    </div>
</template>

<script>
export default{
    data(){
        return {
            active: '1'
        }
    },

    created(){
    },

    methods: {}

}
</script>

<style scoped>
.el-alert {
  margin: 20px 0 0;
}
.el-alert:first-child {
  margin: 0;
} </style>