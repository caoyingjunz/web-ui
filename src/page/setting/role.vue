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
                    <el-button type="primary" @click="createUser">
                        <el-icon style="vertical-align: middle;margin-right: 8px;" ><plus /></el-icon> 新增用户
                    </el-button>
                </el-col>
            </el-row>

        </el-card>

        <!-- 创建对话框区域 -->
        <el-dialog v-model="createUserDialogFormVisible" title="新增用户" width="60%" draggable @close="createUserDialogClose">
        <el-form
            ref="createUserFormRef"
            :model="createUserForm"
            :rules="createUserFormRules"
            label-width="10px"
            label-position="top"
            >
            <el-form-item label="用户名" prop="name">
            <el-input v-model="createUserForm.name" placeholder="请输入资料名"/>
            </el-form-item>

            <el-form-item label="密码" prop="password">
            <el-input v-model="createUserForm.password" placeholder="请输入密码"/>
            </el-form-item>

            <el-form-item label="描述" prop="description">
            <el-input v-model="createUserForm.description" placeholder="请输入简介描述" type="textarea" :autosize="autosize"/>
            </el-form-item>

        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancelUserCreate">取消</el-button>
                <el-button type="primary" @click="confirmUserCreate">确定</el-button>
            </span>
            </template>
        </el-dialog>

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
            createUserDialogFormVisible: false,
            autosize: {
                minRows: 4,
            },
            userList: [],
            createUserForm: {
                name: '',
                password: '',
                role: 0,
                description: '',
            },
            createUserFormRules: {
                name: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ],
                role: [
                    {required: true, message: '请选择用户权限', trigger: 'blur'}
                ],
                description: [
                    {required: false, message: '请输入简介', trigger: 'blur'}
                ],
            },
        }
    },
    methods: {
        getUserList(){
        },
        createUser(){
            this.createUserDialogFormVisible = true
        },
        confirmUserCreate(){
            this.createUserDialogFormVisible = false
            console.log("TODO confirmUserCreate")
        },
        cancelUserCreate(){
            this.createUserDialogFormVisible = false
            console.log("TODO cancelUserCreate")
        },
        createUserDialogClose(){
            this.$refs.createUserFormRef.resetFields()
        },
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
