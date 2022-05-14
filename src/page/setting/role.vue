<template>
    <div>
        <!-- 面包屑导航效果 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index' }"> 总览 </el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card style="margin-top: 30px;">

            <el-row :gutter="40">

                <el-col :span="6">
                    <el-input placeholder="请输入内容" v-model="userInfo.query" clearable @clear="getUserList">
                    <template #append>
                        <el-button span="8" type="primary" size="default" @click="getUserList" >
                            <el-icon style="vertical-align: middle;" ><Search /></el-icon>
                        </el-button>
                    </template>
                  </el-input>
                </el-col>

                <el-col :span="4">
                    <el-button type="primary" @click="handleCreate">
                        <el-icon style="vertical-align: middle;margin-right: 8px;" ><plus /></el-icon> 新增用户
                    </el-button>
                </el-col>
            </el-row>

        </el-card>
    </div>
</template>

<script>

import {
    Search,
    Delete,
    Edit,
    ArrowDown,
    Plus
} from '@element-plus/icons-vue'

export default {
    data() {
        return{
            userInfo: {
                query: '', // 带所有的用户名称关键字
                page: 1,
                page_size: 10, // 默认值需要是分页定义的值
            },
            userList: [],
        }
    },
    methods: {
        getUserList(){

        }
    },

    components: {
        Search,
        Edit,
        Delete,
        ArrowDown,
        Plus
    }
}
</script>
