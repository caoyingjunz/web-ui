<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <!-- <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item> -->
            <el-breadcrumb-item>
                <span style="font-weight: bold; font-size: 18px; color: black;">标签管理</span>
            </el-breadcrumb-item>
        </el-breadcrumb>

        <div style="margin-top: 30px;">
            <el-row>
                <el-col>
                    <el-input placeholder="请输入内容" v-model="pageInfo.query" style="width: 430px;" clearable
                        @input="getLabelList" @clear="getLabelList">
                        <template #append>
                            <el-button type="primary" size="default" @click="getLabelList">
                                <el-icon style="vertical-align: middle; margin-right: 6px;">
                                    <Search />
                                </el-icon> 搜索
                            </el-button>
                        </template>
                    </el-input>

                    <el-button type="primary" @click="handleCreate" style="margin-left: 20px;">
                        <el-icon style="vertical-align: middle;margin-right: 4px;">
                            <plus />
                        </el-icon> 新建标签
                    </el-button>

                    <el-button @click="getLabelList" type="primary" plain>
                        <el-icon style="vertical-align: middle;margin-right: 4px; ">
                            <refresh />
                        </el-icon> 刷新
                    </el-button>

                    <el-button @click="downloadLabelTemplate" type="primary" plain
                        style="float: right;  margin-right: 50px;">
                        <el-icon style="vertical-align: middle;margin-right: 4px;">
                            <DocumentCopy />
                        </el-icon> 下载标签模板
                    </el-button>

                    <el-button type="primary" @click="uploadLabelTemplate" style="float: right;">
                        <el-icon style="vertical-align: middle;margin-right: 4px;">
                            <FolderOpened />
                        </el-icon> 导入标签模板
                    </el-button>

                </el-col>
            </el-row>

            <!-- table 表格区域 -->
            <el-table :data="labelList" stripe style="margin-top: 30px; width: 100%" v-loading="loading"
                @selection-change="handleSelectionChange">

                <el-table-column type="selection" width="40" />

                <el-table-column prop="name" label="标签名称" width="200" sortable>
                    <template #default="scope">
                        <el-link type="primary" @click="jumpRoute(scope.row.label_id)"> {{ scope.row.name }} </el-link>
                    </template>
                </el-table-column>

                <el-table-column prop="gmt_create" label="创建时间" width="200" sortable />
                <el-table-column prop="gmt_modified" label="更新时间" width="200" sortable />
                <el-table-column prop="description" label="描述" />

                <!-- <el-table-column prop="content" label="标签值">
                    <template #default="scope">
                        <span v-for="(item, index) in (scope.row.content || '').split(',')">
                            <el-tag class="ml-1"> {{ item }} </el-tag>
                        </span>
                    </template>
                </el-table-column> -->

                <el-table-column fixed="right" label="操作" width="200">
                    <template #default="scope">
                        <el-button type="primary" plain size="small" @click="handleEdit(scope.row)">
                            <el-icon style="vertical-align: middle; margin-right: 5px;">
                                <Edit />
                            </el-icon> 编辑
                        </el-button>

                        <el-button type="danger" plain size="small" @click="handleDelete(scope.row)"
                            style="margin-right: 10px">
                            <el-icon style="vertical-align: middle;margin-right: 5px;">
                                <Delete />
                            </el-icon> 删除
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>

            <div style="margin-top: 25px;">
                <div>
                    <span style="vertical-align: middle;margin-right: 12px; margin-top: 4px;"> 已选择
                        {{ bulkValues.length }} 项 </span>

                    <el-button @click="handleBulkDownload" style="margin-right: 4px;"
                        :disabled="bulkValues.length == 0">
                        <el-icon style="vertical-align: middle;margin-right: 8px;">
                            <FolderAdd />
                        </el-icon> 批量下载
                    </el-button>

                    <el-button @click="handleBulkDelete" :disabled="bulkValues.length == 0">
                        <el-icon style="vertical-align: middle;margin-right: 8px;">
                            <delete />
                        </el-icon> 批量删除
                    </el-button>

                    <!-- 分页区域 -->
                    <el-pagination style="float: right; margin-right: 40px;" v-model:currentPage="pageInfo.page"
                        v-model:page-size="pageInfo.page_size" :page-sizes="[10, 20, 50]"
                        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" />
                </div>
            </div>
        </div>

        <!-- 创建对话框区域 -->
        <el-dialog v-model="createDialogFormVisible" title="新建标签" width="60%" draggable @close="createDialogClose">
            <el-form ref="createFormRef" :model="createForm" :rules="createFormRules" label-width="10px"
                label-position="top">

                <el-form-item label="标签名称" prop="name">
                    <el-input v-model="createForm.name" placeholder="请输入标签名称" />
                </el-form-item>

                <el-form-item label="描述" prop="description">
                    <el-input v-model="createForm.description" placeholder="请输入简介描述" type="textarea"
                        :autosize="autosize" />
                </el-form-item>
                <!--
                <el-form-item label="标签值" prop="content">
                    <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput"
                        size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </el-form-item> -->

            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancelCreate">取消</el-button>
                    <el-button type="primary" @click="confirmCreate">确定</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 编辑对话框区域 -->
        <el-dialog v-model="dialogFormVisible" title="编辑标签" width="50%" draggable @close="editDialogClose">
            <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="120px"
                label-position="top">

                <el-form-item label="标签名称" prop="name">
                    <el-input v-model="editForm.name" disabled />
                </el-form-item>

                <el-form-item label="创建时间" prop="gmt_create">
                    <el-input v-model="editForm.gmt_create" disabled />
                </el-form-item>

                <el-form-item label="描述" prop="description">
                    <el-input v-model="editForm.description" placeholder="请输入简介描述" type="textarea"
                        :autosize="autosize" />
                </el-form-item>

                <el-form-item label="标签值" prop="label">

                    <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>

                    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput"
                        size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                    </el-input>

                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

                </el-form-item>

            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancelEdit">取消</el-button>
                    <el-button type="primary" @click="confirmEdit">确定</el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="labelDialogVisible" title="导入标签文件" width="50%" :before-close="handleLabelClose"
            draggable="true">

            <el-upload drag multiple :on-preview="handlePreview" :on-change="handleChange" :on-remove="handleRemove"
                :before-remove="beforeRemove" :limit="1" :file-list="fileList" :auto-upload="false">

                <el-icon class="el-icon--upload">
                    <upload-filled />
                </el-icon>
                <div class="el-upload__text">
                    将标签文件拖到此处，或 <em>点击上传</em>
                </div>
            </el-upload>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleLabelClose">取消</el-button>
                    <el-button type="primary" @click="confirmUploadLabelTemplate">确定</el-button>
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
        Plus,
        Upload,
        Download,
        UploadFilled,
        DocumentCopy,
        FolderOpened,
        FolderAdd
    } from '@element-plus/icons-vue'

    export default {
        data() {
            return {
                labelDialogVisible: false,
                fileList: [],

                // 批量操作
                bulkValues: [],

                dynamicTags: [],
                inputVisible: false,
                inputValue: '',

                loading: false,
                pageInfo: {
                    query: '',
                    use_page: true, // 默认启用分页效果
                    page: 1,
                    page_size: 10, // 默认值需要是分页定义的值
                },
                labelList: [],
                createDialogFormVisible: false,
                dialogFormVisible: false,
                uploadDialogFormVisible: false,
                total: 0,
                autosize: {
                    minRows: 8,
                },
                createForm: {
                    name: '',
                    parent_id: 0,
                    content: '',
                    description: '',
                },
                createFormRules: {
                    name: [{
                        required: true,
                        message: '请输入标签名称',
                        trigger: 'blur'
                    }],
                    content: [{
                        required: false,
                        message: '',
                        trigger: 'blur'
                    }]
                },
                editForm: {
                    label_id: 0,
                    resource_version: 0,
                    parent_id: 0,
                    name: '',
                    gmt_create: '',
                    gmt_modified: '',
                    content: '',
                    description: '',
                },
                editFormRules: {
                    name: [{
                        required: true,
                        message: '请输入资料名',
                        trigger: 'blur'
                    }],
                },
            }
        },
        created() {
            this.getLabelList()
        },
        methods: {
            handleSelectionChange(val) {
                this.bulkValues = val
            },
            handleChange(file, fileList) {
                console.log(file, fileList)
                this.fileList = fileList
            },
            handleRemove(file, fileList) {
                console.log(file, fileList)
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(
                    `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            uploadLabelTemplate() {
                console.log("uploadLabelTemplate")
                this.labelDialogVisible = true
            },

            // 取消
            handleLabelClose() {
                this.fileList = []
                this.labelDialogVisible = false
            },
            // 确认上传
            confirmUploadLabelTemplate() {
                if (this.fileList.length == 0) {
                    return this.$message.error('未选择需要导入的标签列表文件')
                }

                this.labelDialogVisible = false
                var file = this.fileList[0].raw
                this.fileList = []

                // 创建文件内容
                let fileFormData = new FormData();
                fileFormData.append('file', file, file.name); //filename是键，file是值，就是要传的文件，test.zip是要传的文件名
                let requestConfig = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }
                this.$http.post("/research/label/upload", fileFormData, requestConfig)
                    .then((res) => {
                        this.getLabelList()
                        this.$message.success("批量导入标签成功")
                    })
                    .catch((err) => {
                        this.$message.error(err.toString())
                    })
            },
            downloadLabelTemplate() {
                let a = document.createElement('a')
                a.href = `/static/labeltemplate.xlsx`
                a.download = "标签模板.xlsx"
                a.click()
                a.remove()
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
            },
            jumpRoute(label_id) {
                window.sessionStorage.setItem("activeLableId", label_id)
                window.sessionStorage.setItem("activeName", "first")
                this.$router.push({
                    name: 'labelDetail',
                    params: {
                        label_id: label_id,
                    }
                })
            },
            editDialogClose() {
                this.$refs.editFormRef.resetFields()
            },
            createDialogClose() {
                this.$refs.createFormRef.resetFields()
            },
            uploadDialogClose() {
                this.$refs.uploadFormRef.resetFields()
            },
            handleSizeChange(newSize) {
                this.pageInfo.page_size = newSize
                this.getLabelList()
            },
            handleCurrentChange(newPage) {
                this.pageInfo.page = newPage
                this.getLabelList()
            },
            async getLabelList() {
                this.loading = true
                const {
                    data: res
                } = await this.$http.get('/research/label/list', {
                    params: this.pageInfo
                })
                this.loading = false
                if (res.code != 200) {
                    return this.$message.error('获取标签列表失败');
                }
                this.pageInfo.page = res.result.page
                this.pageInfo.page_size = res.result.page_size
                this.labelList = res.result
                this.total = 10
            },
            handleCreate() {
                this.createDialogFormVisible = true
            },
            confirmCreate() {
                this.createDialogFormVisible = false

                this.createForm.content = this.dynamicTags.join(",")
                this.dynamicTags = []
                const {
                    data: res
                } = this.$http.post("/research/label/create", this.createForm)
                    .then((res) => {
                        this.getLabelList()
                        return this.$message.success(this.createForm.name + " 创建成功")
                    })
                    .catch((err) => {
                        return this.$message.error(err.toString())
                    })
            },
            cancelCreate() {
                this.createDialogFormVisible = false
                this.dynamicTags = []
            },
            handleEdit(row) {
                this.editForm.name = row.name
                this.editForm.label_id = row.label_id
                this.editForm.resource_version = row.resource_version
                this.editForm.gmt_create = row.gmt_create
                this.editForm.gmt_modified = row.gmt_modified
                this.editForm.content = row.content
                this.editForm.description = row.description
                this.dynamicTags = row.content.split(',')

                this.dialogFormVisible = true
            },
            confirmEdit() {
                this.dialogFormVisible = false

                this.editForm.content = this.dynamicTags.join(',')
                this.dynamicTags = []
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
                this.dynamicTags = []
            },
            async handleDelete(row) {
                this.$confirm('此操作将永久删除标签 ' + row.name + ' , 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        draggable: true,
                    })
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
                    .catch(() => {}) // 捕捉取消事件
            }
        },
        components: {
            DocumentCopy,
            Search,
            Edit,
            Delete,
            ArrowDown,
            Plus,
            Upload,
            Download,
            Refresh,
            UploadFilled,
            FolderOpened,
            FolderAdd
        }
    }
</script>

<style scoped>
    .el-icon {
        vertical-align: middle;
        text-align: center;
    }

    .ml-1 {
        margin: 2px;
    }

    .el-tag+.el-tag {
        margin-left: 6px;
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