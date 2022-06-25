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
                <div style="margin: 20px 20px 40px 0;">

                    <el-form>
                        <el-row :gutter="40">

                            <!-- <el-col :span="6">
                                <el-form-item label="标签名称:">
                                    <div>{{ label_info.name }}</div>
                                </el-form-item>
                            </el-col> -->

                            <el-col :span="6">
                                <el-form-item label="标签ID:">
                                    <div>{{ label_info.label_id }}</div>
                                </el-form-item>
                            </el-col>

                            <el-col :span="6">
                                <el-form-item label="创建时间:">
                                    <div>{{ label_info.gmt_create }}</div>
                                </el-form-item>
                            </el-col>

                            <el-col :span="6">
                                <el-form-item label="更新时间:">
                                    <div>{{ label_info.gmt_modified }}</div>
                                </el-form-item>
                            </el-col>

                        </el-row>

                        <el-form>
                            <el-form-item label="标签值:" />
                        </el-form>

                        <el-form>
                            <el-form-item>
                                <el-tag hit :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false"
                                    @close="handleClose(tag)">
                                    {{ tag }}
                                </el-tag>
                                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue"
                                    ref="saveTagInput" size="default" @keyup.enter.native="handleInputConfirm"
                                    @blur="handleInputConfirm">
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag
                                </el-button>
                            </el-form-item>

                        </el-form>

                    </el-form>
                </div>

            </el-tab-pane>

            <el-tab-pane label="子标签列表" name="second">
                <el-row :gutter="40">
                    <el-col :span="6">
                        <el-input placeholder="请输入内容" v-model="pageInfo.query" clearable @input="getLabelList"
                            @clear="getLabelList">
                            <template #append>
                                <el-button span="8" type="primary" size="default" @click="getLabelList">
                                    <el-icon style="vertical-align: middle;">
                                        <Search />
                                    </el-icon>
                                </el-button>
                            </template>
                        </el-input>
                    </el-col>

                    <el-col :span="6">
                        <el-button type="primary" @click="handleCreate">
                            <el-icon style="vertical-align: middle;margin-right: 8px;">
                                <plus />
                            </el-icon> 新建子标签
                        </el-button>

                        <el-button @click="getLabelList">
                            <el-icon style="vertical-align: middle;margin-right: 4px; ">
                                <refresh />
                            </el-icon> 刷新
                        </el-button>
                    </el-col>

                </el-row>

                <!-- table 表格区域 -->
                <el-table :data="labelList" stripe style="margin-top: 20px; width: 100%" v-loading="loading">

                    <el-table-column type="selection" width="40" />

                    <el-table-column prop="name" label="标签名称" width="200" sortable>
                        <template #default="scope">
                            <el-link type="primary" @click="jumpRoute(scope.row.label_id)"> {{ scope.row.name }}
                            </el-link>
                            <!-- <router-link tag="a" :to="{path: '/labelDetail', query: {label_id: scope.row.label_id}}"> {{ scope.row.name }}  </router-link> -->
                        </template>

                    </el-table-column>

                    <el-table-column prop="gmt_create" label="创建时间" width="200" sortable />

                    <el-table-column prop="content" label="标签值">
                        <template #default="scope">
                            <span v-for="(item, index) in (scope.row.content || '').split(',')">
                                <el-tag class="ml-1"> {{ item }} </el-tag>
                            </span>
                        </template>
                    </el-table-column>

                    <el-table-column fixed="right" label="操作" width="200">
                        <template #default="scope">
                            <el-button type="primary" size="small" @click="handleEdit(scope.row)">
                                <el-icon style="vertical-align: middle; margin-right: 5px;">
                                    <Edit />
                                </el-icon> 编辑
                            </el-button>

                            <el-button type="danger" size="small" @click="handleDelete(scope.row)"
                                style="margin-right: 10px">
                                <el-icon style="vertical-align: middle;margin-right: 5px;">
                                    <Delete />
                                </el-icon> 删除
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>

                <!-- 分页区域 -->
                <el-pagination style="margin-top: 20px;" v-model:currentPage="pageInfo.page"
                    v-model:page-size="pageInfo.page_size" :page-sizes="[10, 20, 50]"
                    layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />

                <!-- 创建对话框区域 -->
                <el-dialog v-model="createDialogFormVisible" title="新建子标签" width="60%" draggable
                    @close="createDialogClose">
                    <el-form ref="createFormRef" :model="createForm" :rules="createFormRules" label-width="10px"
                        label-position="top">

                        <el-form-item label="所属标签" prop="owner">
                            <el-input v-model="createForm.owner" disabled />
                        </el-form-item>

                        <el-form-item label="标签名称" prop="name">
                            <el-input v-model="createForm.name" placeholder="请输入标签名称" />
                        </el-form-item>

                        <el-form-item label="标签值" prop="content">
                            <el-tag hit :key="tag" v-for="tag in subDynamicTags" closable :disable-transitions="false"
                                @close="handleClose(tag)">
                                {{tag}}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput"
                                size="small" @keyup.enter.native="handleSubInputConfirm" @blur="handleSubInputConfirm">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag
                            </el-button>
                            <!-- <el-input v-model="createForm.content" placeholder="请输入标签" type="textarea" :autosize="autosize"/> -->
                        </el-form-item>

                    </el-form>

                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="cancelCreate">取消</el-button>
                            <el-button type="primary" @click="confirmCreate">确定</el-button>
                        </span>
                    </template>
                </el-dialog>


                <!-- 编辑对话框区域 -->
                <el-dialog v-model="dialogFormVisible" title="编辑标签" width="60%" draggable @close="editDialogClose">
                    <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="120px"
                        label-position="top">

                        <el-form-item label="标签名称" prop="name">
                            <el-input v-model="editForm.name" disabled />
                        </el-form-item>

                        <el-form-item label="创建时间" prop="gmt_create">
                            <el-input v-model="editForm.gmt_create" disabled />
                        </el-form-item>

                        <el-form-item label="标签值" prop="label">

                            <el-tag :key="tag" v-for="tag in subDynamicTags" closable :disable-transitions="false"
                                @close="handleSubClose(tag)">
                                {{tag}}
                            </el-tag>

                            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput"
                                size="small" @keyup.enter.native="handleSubInputConfirm" @blur="handleSubInputConfirm">
                            </el-input>

                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag
                            </el-button>

                        </el-form-item>

                    </el-form>

                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="cancelEdit">取消</el-button>
                            <el-button type="primary" @click="confirmEdit">确定</el-button>
                        </span>
                    </template>
                </el-dialog>

            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {
        Refresh,
        Search,
        Delete,
        Edit,
        ArrowDown,
        Plus,
        Upload,
        Download,
        UploadFilled
    } from '@element-plus/icons-vue'

    export default {
        data() {
            return {
                inputVisible: false,
                inputValue: '',
                dynamicTags: [],
                subDynamicTags: [],

                labelList: [],
                pageInfo: {
                    query: '',
                    pid: 0,
                    use_page: true, // 默认启用分页效果
                    page: 1,
                    page_size: 10, // 默认值需要是分页定义的值
                },
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
                activeName: "first",

                createDialogFormVisible: false,
                dialogFormVisible: false,
                uploadDialogFormVisible: false,
                total: 0,
                autosize: {
                    minRows: 4,
                },
                createForm: {
                    name: '',
                    parent_id: 0,
                    owner: "",
                    content: '',
                },
                createFormRules: {
                    name: [
                        { required: true, message: '请输入标签名称', trigger: 'blur' }
                    ],
                    content: [
                        { required: false, message: '', trigger: 'blur' }
                    ]
                },
                editForm: {
                    label_id: 0,
                    resource_version: 0,
                    parent_id: 0,
                    name: '',
                    gmt_create: '',
                    gmt_modified: '',
                    content: '',
                },
                editFormRules: {
                    name: [
                        { required: true, message: '请输入资料名', trigger: 'blur' }
                    ],
                },
            }
        },
        created() {
            this.activeName = window.sessionStorage.getItem("activeName")
            if (this.activeName == null) {
                this.activeName = "first"
            }

            this.label_id = this.$route.params.label_id
            // 如果已经切换到标签页面，刷新时，从缓存中获取标签 id
            if (this.label_id == undefined) {
                this.label_id = window.sessionStorage.getItem("activeLableId")
            }

            this.getLabelDetail(this.label_id)
            this.pageInfo.pid = this.label_id
            this.getLabelList()
        },
        methods: {
            handleSubClose(tag) {
                this.subDynamicTags.splice(this.subDynamicTags.indexOf(tag), 1);
            },
            showSubInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleSubInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.subDynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);

                this.comfirmTagUpdate()
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';

                this.comfirmTagUpdate()
            },
            comfirmTagUpdate() {
                this.label_info.content = this.dynamicTags.join(',')
                this.$http.put("/research/label/update", this.label_info)
                    .then((res) => {
                        this.getLabelDetail(this.label_id)
                    })
                    .catch((err) => {
                        this.$message.error(err.toString())
                    })
            },
            handleSizeChange(newSize) {
                this.pageInfo.page_size = newSize
                this.getLabelList()
            },
            handleCurrentChange(newPage) {
                this.pageInfo.page = newPage
                this.getLabelList()
            },
            handleClick(tab, event) {
                this.activeName = tab.props.name
                window.sessionStorage.setItem("activeName", this.activeName)
            },
            async handleDelete(row) {
                this.$confirm('此操作将永久删除标签 ' + row.name + ' , 是否继续?', '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        draggable: true,
                    }
                )
                    .then(() => {
                        this.$http.delete("/research/label/delete?label_id=" + row.label_id)
                            .then((res) => {
                                this.getLabelList()
                                return this.$message.success(row.name + " 删除成功")
                            })
                            .catch((err) => {
                                return this.$message.error(err.toString())
                            })
                    })
                    .catch(() => {
                    }) // 捕捉取消事件
            },
            handleOpen() {
            },
            handleCreate() {
                this.createForm.owner = this.label_info.name
                this.createForm.parent_id = parseInt(this.label_id)

                this.createDialogFormVisible = true
            },
            confirmCreate() {
                this.createDialogFormVisible = false

                this.createForm.content = this.subDynamicTags.join(",")
                const { data: res } = this.$http.post("/research/label/create", this.createForm)
                    .then((res) => {
                        this.getLabelList()
                        this.$message.success(this.createForm.name + " 创建成功")
                    })
                    .catch((err) => {
                        this.$message.error(err.toString())
                    })
                // 重置 createForm， 看起来this.$refs.createForm 有问题
                this.subDynamicTags = []
                this.createForm.name = ""
                this.createForm.owner = ""
                this.createForm.parent_id = 0
                this.createForm.content = ""
            },
            handleEdit(row) {
                this.editForm.name = row.name
                this.editForm.label_id = row.label_id
                this.editForm.resource_version = row.resource_version
                this.editForm.gmt_create = row.gmt_create
                this.editForm.gmt_modified = row.gmt_modified
                this.editForm.content = row.content
                this.subDynamicTags = row.content.split(',')

                this.dialogFormVisible = true
            },
            confirmEdit() {
                this.dialogFormVisible = false

                this.editForm.content = this.subDynamicTags.join(',')
                this.subDynamicTags = []
                this.$http.put("/research/label/update", this.editForm)
                    .then((res) => {
                        this.getLabelList()
                        return this.$message.success(this.editForm.research_id + " 更新成功")
                    })
                    .catch((err) => {
                        return this.$message.error(err.toString())
                    })
            },
            cancelEdit() {
                this.dialogFormVisible = false
                this.subDynamicTags = []
            },
            cancelCreate() {
                this.createDialogFormVisible = false

                this.subDynamicTags = []
                this.createForm.name = ""
                this.createForm.owner = ""
                this.createForm.parent_id = 0
                this.createForm.content = ""
            },
            editDialogClose() {
                this.$refs.editFormRef.resetFields()
            },
            createDialogClose() {
                this.$refs.createFormRef.resetFields()
            },
            async getLabelList() {
                this.loading = true
                const { data: res } = await this.$http.get('/research/label/list', { params: this.pageInfo })
                this.loading = false
                if (res.code != 200) {
                    return this.$message.error('获取标签列表失败');
                }

                // TODO 暂时后端没有做分页
                if (res.result != null) {
                    this.pageInfo.page = res.result.page
                }
                if ( res.result != null) {
                    this.pageInfo.page_size = res.result.page_size
                }

                this.labelList = res.result
                this.total = 10
            },
            async getLabelDetail(label_id) {
                this.loading = true
                const { data: res } = await this.$http.get('/research/label/detail?label_id=' + label_id)
                this.loading = false
                if (res.code != 200) {
                    return this.$message.error('获取标签详情失败');
                }

                this.label_info = res.result

                if (res.result.content== undefined ) {
                    this.dynamicTags = []
                } else {
                    this.dynamicTags = res.result.content.split(',')
                }
            },
        },
        components: {
            Search,
            Edit,
            Delete,
            ArrowDown,
            Plus,
            Upload,
            Download,
            Refresh,
            UploadFilled
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

    .el-tag+.el-tag {
        margin-left: 6px;
    }

    .ml-1 {
        margin: 2px;
    }

    .button-new-tag {
        margin-left: 10px;
        /* height: 32px; */
        /* line-height: 30px; */
        /* padding-top: 0;
     padding-bottom: 0; */
    }

    .input-new-tag {
        width: 120px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>