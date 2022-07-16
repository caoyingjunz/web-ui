<template>
    <div>
        <!-- 面包屑导航效果 -->
        <el-breadcrumb separator="/">
            <!-- <el-breadcrumb-item :to="{ path: '/index' }"> 总览 </el-breadcrumb-item> -->
            <el-breadcrumb-item>
                <span style="font-weight: bold; font-size: 18px; color: black;">用户管理</span>
            </el-breadcrumb-item>

        </el-breadcrumb>

        <div style="margin-top: 20px;">
            <el-row :gutter="40">
                <el-col :span="6">
                    <el-input placeholder="请输入用户名称" v-model="userInfo.query" @input="getUserList" clearable
                        @clear="getUserList">
                        <template #append>
                            <el-button span="8" type="primary" size="default" @click="getUserList">
                                <el-icon style="vertical-align: middle;">
                                    <Search />
                                </el-icon>
                            </el-button>
                        </template>
                    </el-input>
                </el-col>

                <el-col :span="6">
                    <el-button type="primary" @click="createUser">
                        <el-icon style="vertical-align: middle;margin-right: 8px;">
                            <plus />
                        </el-icon> 新增用户
                    </el-button>

                    <el-button @click="getUserList">
                        <el-icon style="vertical-align: middle;margin-right: 4px; ">
                            <refresh />
                        </el-icon> 刷新
                    </el-button>
                </el-col>
            </el-row>

            <!-- table 表格区域 -->
            <el-table :data="userList" stripe style="margin-top: 20px; width: 100%" v-loading="loading">

                <el-table-column type="selection" width="40" />
                <el-table-column prop="user_id" label="用户ID" width="110" sortable />
                <el-table-column prop="name" label="用户名" width="180" />
                <el-table-column prop="gmt_create" label="创建时间" width="200" sortable />
                <el-table-column prop="gmt_modified" label="更新时间" width="200" />
                <el-table-column prop="email" label="邮箱" width="160" />
                <el-table-column prop="description" label="描述" />
                <el-table-column fixed="right" label="操作" width="200">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="handleUserEdit(scope.row)">
                            <el-icon style="vertical-align: middle; margin-right: 5px;">
                                <Edit />
                            </el-icon> 编辑
                        </el-button>

                        <el-button type="danger" size="small" @click="handleUserDelete(scope.row)"
                            style="margin-right: 10px">
                            <el-icon style="vertical-align: middle;margin-right: 5px;">
                                <Delete />
                            </el-icon> 删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination style="margin-top: 20px;" v-model:currentPage="userInfo.page"
                v-model:page-size="userInfo.page_size" :page-sizes="[10, 20, 50]"
                layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleUserSizeChange"
                @current-change="handleUserCurrentChange" />

        </div>

        <!-- 创建用户对话框区域 -->
        <el-dialog v-model="createUserDialogFormVisible" title="新增用户" width="60%" draggable
            @close="createUserDialogClose">
            <el-form ref="createUserFormRef" :model="createUserForm" :rules="createUserFormRules" label-width="10px"
                label-position="top">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="createUserForm.name" placeholder="请输入用户名" />
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="createUserForm.password" placeholder="请输入密码" show-password />
                </el-form-item>

                <el-form-item label="角色">
                    <el-radio-group v-model="radio" change="changeRadio">
                        <el-radio :label="0">普通用户</el-radio>
                        <el-radio :label="1">管理员</el-radio>
                        <el-radio :label="2">超级管理员 </el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="createUserForm.email" placeholder="请输入邮箱, 格式 <email_name>@163.com" />
                </el-form-item>

                <el-form-item label="描述" prop="description">
                    <el-input v-model="createUserForm.description" placeholder="请输入简介描述" type="textarea"
                        :autosize="autosize" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancelUserCreate">取消</el-button>
                    <el-button type="primary" @click="confirmUserCreate">确定</el-button>
                </span>
            </template>
        </el-dialog>


        <!-- 编辑用户对话框区域 -->
        <el-dialog v-model="editDialogFormVisible" title="编辑用户" width="60%" draggable @close="editDialogClose">
            <el-form ref="editUserFormRef" :model="editUserForm" :rules="editUserFormRules" label-width="120px"
                label-position="top">

                <el-form-item label="用户ID" prop="user_id">
                    <el-input v-model="editUserForm.user_id" disabled />
                </el-form-item>

                <el-form-item label="用户名" prop="name">
                    <el-input v-model="editUserForm.name" />
                </el-form-item>

                <el-form-item label="角色">
                    <el-radio-group v-model="radio" change="changeRadio">
                        <el-radio :label="0">普通用户</el-radio>
                        <el-radio :label="1">管理员</el-radio>
                        <el-radio :label="2">超级管理员 </el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="创建时间" prop="gmt_create">
                    <el-input v-model="editUserForm.gmt_create" disabled />
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editUserForm.email" placeholder="请输入邮箱, 格式 <email_name>@163.com" />
                </el-form-item>

                <el-form-item label="描述" prop="description">
                    <el-input v-model="editUserForm.description" type="textarea" :autosize="autosize" />
                </el-form-item>

            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancelEditUser">取消</el-button>
                    <el-button type="primary" @click="confirmEditUser">确定</el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<script>
    import {
        Refresh,
        Search,
        Delete,
        Edit,
        ArrowDown,
        Plus
    } from '@element-plus/icons-vue'

    export default {
        data() {
            return {
                loading: false,
                userInfo: {
                    query: '', // 带所有的用户名称关键字
                    use_page: true,
                    page: 1,
                    page_size: 10, // 默认值需要是分页定义的值
                },
                total: 10,
                createUserDialogFormVisible: false,
                editDialogFormVisible: false,
                autosize: {
                    minRows: 4,
                },
                radio: 0,
                userList: [],
                createUserForm: {
                    name: '',
                    password: '',
                    role: 0,
                    email: '',
                    description: '',
                },
                createUserFormRules: {
                    name: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }],
                    role: [{
                        required: true,
                        message: '请选择用户权限',
                        trigger: 'blur'
                    }],
                    description: [{
                        required: false,
                        message: '请输入简介',
                        trigger: 'blur'
                    }],
                },
                editUserForm: {
                    user_id: 0,
                    resource_version: 0,
                    name: '',
                    role: 0,
                    permission: {
                        writeable: 0,
                        readable: 0,
                        share: 0,
                        download: 0
                    },
                    gmt_create: '',
                    gmt_modified: '',
                    email: '',
                    description: '',
                },
                editUserFormRules: {}
            }
        },
        created() {
            this.getUserList()
        },
        methods: {
            async getUserList() {
                this.loading = true
                const {
                    data: res
                } = await this.$http.get('/user/list', {
                    params: this.userInfo
                })
                this.loading = false
                if (res.code != 200) {
                    return this.$message.error('获取资源列表失败');
                }
                this.userInfo.page = res.result.page
                this.userInfo.page_size = res.result.page_size
                this.total = res.result.total
                this.userList = res.result.result
            },
            createUser() {
                this.createUserDialogFormVisible = true
            },
            handleUserSizeChange(newSize) {
                this.userInfo.page_size = newSize
                this.getUserList()
            },
            handleUserCurrentChange(newPage) {
                this.userInfo.page = newPage
                this.getUserList()
            },
            confirmUserCreate() {
                this.createUserDialogFormVisible = false
                // 赋值 role 权限
                this.createUserForm.role = this.radio
                this.$http.post("/user/create", this.createUserForm)
                    .then((res) => {
                        this.getUserList()
                        return this.$message.success(this.createUserForm.name + " 创建成功")
                    })
                    .catch((err) => {
                        return this.$message.error(err.toString())
                    })
            },
            cancelUserCreate() {
                this.createUserDialogFormVisible = false
            },
            createUserDialogClose() {
                this.$refs.createUserFormRef.resetFields()
            },
            changeRadio() {
                console.log(this.radio)
            },
            handleUserEdit(row) {
                this.editUserForm.user_id = row.user_id
                this.editUserForm.resource_version = row.resource_version
                this.editUserForm.name = row.name
                this.editUserForm.gmt_create = row.gmt_create
                this.editUserForm.gmt_modified = row.gmt_modified
                this.editUserForm.permission = row.permission
                this.editUserForm.email = row.email
                this.editUserForm.description = row.description
                this.editUserForm.role = row.role
                this.radio = this.editUserForm.role

                this.editDialogFormVisible = true
            },
            confirmEditUser() {
                this.editDialogFormVisible = false

                this.editUserForm.role = this.radio
                this.$http.put("/user/update", this.editUserForm)
                    .then((res) => {
                        this.getUserList()
                        return this.$message.success(this.editUserForm.user_id + " 更新成功")
                    })
                    .catch((err) => {
                        return this.$message.error(err.toString())
                    })
            },
            cancelEditUser() {
                this.editDialogFormVisible = false
            },
            editDialogClose() {
                this.$refs.editUserFormRef.resetFields()
            },
            async handleUserDelete(row) {
                this.$confirm('此操作将永久删除用户 ' + row.name + ' , 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        draggable: true,
                    })
                    .then(() => {
                        this.$http.delete("/user/delete?user_id=" + row.user_id)
                            .then((res) => {
                                this.getUserList()
                                return this.$message.success(row.name + " 删除成功")
                            })
                            .catch((err) => {
                                return this.$message.error(err.toString())
                            })
                    })
                    .catch(() => { // 捕捉取消事件
                        // this.$message({
                        //     type: "info",
                        //     message: "已取消删除"
                        // })
                    })
            },
        },
        components: {
            Search,
            Edit,
            Delete,
            ArrowDown,
            Plus,
            Refresh
        }
    }
</script>