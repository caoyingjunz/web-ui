<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/#/label">标签管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>标签详情</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 上外边距是 10px
        右外边距是 5px
        下外边距是 15px
        左外边距是 20px -->
        <div style="margin: 30px 10px 40px 0px;">
            <span style="font-size: 30px;"> {{ label_info.name }}</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>

        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="详细信息" name="first">
               <div>



               </div>

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
                label_info: {
                    "label_id": 0,
                    "resource_version": 0,
                    "name": "",
                    "parent_id": 0,
                    "content": "",
                    "gmt_create": "",
                    "gmt_modified": ""
                },
                label_id: 0,
                activeName: "first"
            }
        },
        created() {
            this.activeName = window.sessionStorage.getItem("activeName")
            if (this.activeName == null) {
                this.activeName = "first"
            }

            this.label_id = this.$route.params.label_id
            // 如果已经切换到标签页面，刷新时，从缓存中获取标签id
            if (this.label_id == undefined ){
                this.label_id = window.sessionStorage.getItem("activeLableId")
            }

            this.getLabelDetail(this.label_id)
        },
        methods: {
            handleClick(tab, event) {
                this.activeName = tab.props.name
                window.sessionStorage.setItem("activeName", this.activeName)
            },
            handleOpen() {
            },
            async getLabelDetail(label_id) {
                this.loading = true
                const { data: res } = await this.$http.get('/research/label/detail?label_id=' + label_id)
                this.loading = false
                if (res.code != 200) {
                    return this.$message.error('获取标签详情失败');
                }

                this.label_info = res.result
            },
        },
        components: {

        },
    }
</script>



<style>
    .demo-tabs>.el-tabs__content {
        /* padding: 32px; */
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
        margin: 00px 0px 00px 0px;
        /* width: 480px; */
    }
</style>