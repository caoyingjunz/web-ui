<template>
    <!-- <el-header
        style="background-color: rgb(223, 226, 234); height: 45px;">
        <span>研究资料</span>
    </el-header> -->
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <span style="font-weight: bold; font-size: 18px; color: black;">研究资料</span>
            </el-breadcrumb-item>
        </el-breadcrumb>

        <div style="margin-top: 30px;">
            <el-row>
                <el-col>
                    <div>
                        <el-select v-model="pageInfo.select" style="width: 100px;">
                            <el-option label="资料名" value="1" />
                            <el-option label="标签" value="2" />
                            <el-option label="精准查找" value="3" />
                        </el-select>

                        <span v-if="pageInfo.select == 3">
                            <el-cascader style="width: 210px;" :options="options" v-model="cascaderSelectValue"
                                placeholder="标签选择" :props="{ checkStrictly: true }" @change="handleCascaderSelectChange"
                                filterable clearable>
                            </el-cascader>
                        </span>

                        <el-input placeholder="请输入搜索内容" style="width: 300px;" v-model="pageInfo.query" clearable
                            @input="getBookList" @clear="getBookList">
                        </el-input>

                        <el-button type="primary" size="default" style="margin-left: 10px;" @click="getBookList">
                            <el-icon style="vertical-align: middle; margin-right: 8px;">
                                <Search />
                            </el-icon> 搜索
                        </el-button>

                        <el-button @click="downloadBookTemplate" type="primary" plain
                            style="float: right;  margin-right: 20px;">
                            <el-icon style="vertical-align: middle;margin-right: 4px; ">
                                <DocumentCopy />
                            </el-icon> 下载资料模板
                        </el-button>

                        <el-button type="primary" @click="handleCreate" style="float: right;">
                            <el-icon style="vertical-align: middle;margin-right: 8px;">
                                <plus />
                            </el-icon> 资料上传
                        </el-button>
                    </div>
                </el-col>

            </el-row>

            <!-- table 表格区域 -->
            <el-table :data="bookList" stripe style="margin-top: 30px; width: 100% " v-loading="loading"
                @selection-change="handleSelectionChange">

                <el-table-column type="selection" width="40" />
                <el-table-column prop="research_id" label="资料编号" width="110" sortable />
                <el-table-column prop="name" label="资料名" width="360" />
                <el-table-column prop="rtype" label="类型" width="60" />
                <el-table-column prop="gmt_create" label="创建时间" width="170" sortable />
                <!-- <el-table-column prop="gmt_modified" label="更新时间" width="200"/> -->
                <!-- <el-table-column prop="press" label="出版机构" width="80"/> -->

                <el-table-column prop="label" label="标签值">
                    <template #default="scope">
                        <span v-for="(item, index) in (scope.row.label || '').split(',')">
                            <el-tag class="ml-1"> {{ item }} </el-tag>
                        </span>
                    </template>
                </el-table-column>

                <el-table-column v-if="pageInfo.select == 3" prop="contents" label="内容">
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="250">
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

                        <el-dropdown>
                            <el-button type="info" plain size="small">
                                更多
                                <el-icon style="vertical-align: middle; margin-left: 5px;">
                                    <arrow-down />
                                </el-icon>
                            </el-button>

                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="uploadFile(scope.row)">
                                        <el-icon style="vertical-align: middle; margin-right: 5px;">
                                            <Upload />
                                        </el-icon>
                                        重新上传
                                    </el-dropdown-item>
                                </el-dropdown-menu>

                                <el-dropdown-menu>
                                    <el-dropdown-item @click="downloadFile(scope.row)">
                                        <el-icon style="vertical-align: middle; margin-right: 5px;">
                                            <Download />
                                        </el-icon>
                                        下载
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div style="margin-top: 25px;">
            <div>
                <span style="vertical-align: middle;margin-right: 12px; margin-top: 4px;"> 已选择 {{ bulkValues.length }} 项
                </span>

                <el-button @click="handleBulkDownload" style="margin-right: 4px;" :disabled="bulkValues.length == 0">
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
                <el-pagination style="float: right; margin-right: 20px;" v-model:currentPage="pageInfo.page"
                    v-model:page-size="pageInfo.page_size" :page-sizes="[10, 20, 50]"
                    layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </div>
        </div>

        <!-- 创建对话框区域 -->
        <el-dialog v-model="createDialogFormVisible" width="50%" draggable @close="createDialogClose">
            <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
                <el-tab-pane label="创建" name="first">
                    <el-form ref="createFormRef" :model="createForm" :rules="createFormRules" label-width="10px"
                        label-position="top">

                        <el-upload drag multiple :on-preview="handlePreview" :on-change="handleChange"
                            :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :file-list="fileList"
                            :auto-upload="false">

                            <el-icon class="el-icon--upload">
                                <upload-filled />
                            </el-icon>
                            <div class="el-upload__text">
                                将文件拖到此处，或 <em>点击上传</em>
                            </div>
                        </el-upload>

                        <el-form-item label="标签" prop="label">
                            <el-cascader :options="options" style="width: 360px;"
                                :props="{ multiple: true, checkStrictly: true } " v-model="cascaderValue"
                                @change="handleCascaderChange" clearable>
                            </el-cascader>
                        </el-form-item>

                        <el-form-item label="出版机构" prop="press">
                            <el-input v-model="createForm.press" placeholder="请输入出版机构" />
                        </el-form-item>

                        <el-form-item label="描述" prop="description">
                            <el-input v-model="createForm.description" placeholder="请输入简介描述" type="textarea"
                                :autosize="autosize" />
                        </el-form-item>

                    </el-form>

                </el-tab-pane>
                <el-tab-pane label="批量导入" name="second">
                    <span>选择文件列表</span>
                    <el-upload drag multiple :on-preview="handlePreview" :on-change="handleChange"
                        style="margin-top: 10px;" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1"
                        :file-list="fileList" :auto-upload="false">
                        <el-icon class="el-icon--upload">
                            <upload-filled />
                        </el-icon>
                        <div class="el-upload__text">
                            将文件列表拖到此处，或 <em>点击上传</em>
                        </div>
                        <template #tip>
                            <div>
                            </div>
                        </template>
                    </el-upload>

                    <span style="margin-top: 20px;">选择文件包</span>
                    <el-upload drag multiple :on-preview="handleFilesPreview" :on-change="handleFilesChange"
                        style="margin-top: 10px;" :on-remove="handleFilesRemove" :before-remove="beforeFilesRemove"
                        :limit="1" :file-list="fileTarList" :auto-upload="false">
                        <el-icon class="el-icon--upload">
                            <upload-filled />
                        </el-icon>
                        <div class="el-upload__text">
                            将文件压缩包拖到此处，或 <em>点击上传</em>
                        </div>
                        <template #tip>
                            <div>
                            </div>
                        </template>
                    </el-upload>

                </el-tab-pane>
            </el-tabs>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancelCreate">取消</el-button>
                    <el-button type="primary" @click="confirmCreate">确定</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 编辑对话框区域 -->
        <el-dialog v-model="dialogFormVisible" title="资料更新" width="60%" draggable @close="editDialogClose">
            <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="120px"
                label-position="top">

                <el-form-item label="资料编号" prop="research_id">
                    <el-input v-model="editForm.research_id" disabled />
                </el-form-item>

                <el-form-item label="资料名" prop="name">
                    <el-input v-model="editForm.name" disabled />
                </el-form-item>

                <el-form-item label="类型" prop="rtype">
                    <el-input v-model="editForm.rtype" disabled />
                </el-form-item>

                <el-form-item label="创建时间" prop="gmt_create">
                    <el-input v-model="editForm.gmt_create" disabled />
                </el-form-item>

                <el-form-item label="标签" prop="label">
                    <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>

                    <el-cascader style="margin-left: 10px" :options="options"
                        :props="{ multiple: true, checkStrictly: true }" v-model="cascaderValue"
                        @change="handleCascaderChange" clearable>
                    </el-cascader>

                </el-form-item>

                <el-form-item label="出版机构" prop="press">
                    <el-input v-model="editForm.press" />
                </el-form-item>

                <el-form-item label="描述" prop="description">
                    <el-input v-model="editForm.description" type="textarea" :autosize="autosize" />
                </el-form-item>

            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancelEdit">取消</el-button>
                    <el-button type="primary" @click="confirmEdit">确定</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 上传对话框区域 -->
        <el-dialog v-model="uploadDialogFormVisible" title="重新上传" width="60%" draggable @close="uploadDialogClose">
            <el-form ref="uploadFormRef" :model="uploadForm" :rules="uploadFormRules" label-width="120px"
                label-position="top">

                <el-form-item label="资料编号" prop="research_id">
                    <el-input v-model="uploadForm.research_id" disabled />
                </el-form-item>

                <el-upload drag multiple :on-preview="handlePreview" :on-change="handleChange" :on-remove="handleRemove"
                    :before-remove="beforeRemove" :limit="1" :file-list="fileList" :auto-upload="false">

                    <el-icon class="el-icon--upload">
                        <upload-filled />
                    </el-icon>
                    <div class="el-upload__text">
                        将文件拖到此处，或 <em>点击上传</em>
                    </div>
                    <!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
                </el-upload>

            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancelUpload">取消</el-button>
                    <el-button type="primary" @click="confirmUpload">确定</el-button>
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
        DocumentCopy,
        ArrowDown,
        Plus,
        Upload,
        Download,
        FolderAdd,
        UploadFilled
    } from '@element-plus/icons-vue'

    import {
        ElNotification
    } from 'element-plus'

    export default {
        data() {
            return {
                activeName: "first",

                cascaderLength: "1000px",
                fileList: [],
                fileTarList: [], // 压缩包文件

                options: [],
                cascaderValue: [],
                cascaderSelectValue: [],

                // tag 属性设置
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',

                // 批量处理
                bulkIds: [],
                bulkValues: [],

                loading: false,
                pageInfo: {
                    // 搜索下拉分类
                    select: '资料名',
                    query: '',
                    use_page: true, // 默认启用分页效果
                    page: 1,
                    page_size: 10, // 默认值需要是分页定义的值
                    cascader_label: '',
                },
                deleteParam: {
                    research_id: 0
                },
                bookList: [],
                createDialogFormVisible: false,
                dialogFormVisible: false,
                uploadDialogFormVisible: false,
                total: 0,
                autosize: {
                    minRows: 4,
                },
                createForm: {
                    name: '',
                    press: '',
                    label: '',
                    description: '',
                },
                createFormRules: {
                    name: [{
                        required: true,
                        message: '请输入资料名',
                        trigger: 'blur'
                    }],
                    press: [{
                        required: false,
                        message: '请输入出版社',
                        trigger: 'blur'
                    }],
                    label: [{
                        required: false,
                        message: '请输入标签',
                        trigger: 'blur'
                    }],
                    description: [{
                        required: false,
                        message: '请输入简介',
                        trigger: 'blur'
                    }],
                },
                editForm: {
                    research_id: 0,
                    resource_version: 0,
                    name: '',
                    gmt_create: '',
                    gmt_modified: '',
                    press: '',
                    description: '',
                },
                editFormRules: {
                    name: [{
                        required: true,
                        message: '请输入资料名',
                        trigger: 'blur'
                    }],
                    press: [{
                        required: false,
                        message: '请输入出版社',
                        trigger: 'blur'
                    }],
                    description: [{
                        required: false,
                        message: '请输入简介',
                        trigger: 'blur'
                    }],
                },
                uploadForm: {
                    research_id: 0,
                }
            }
        },
        created() {
            this.getBookList()
            this.getOptionList()
        },
        methods: {
            handleClick(tab, event) {
                if (this.activeName == "first") {
                    console.log("first")
                    this.fileList = []
                } else {
                    console.log("second")
                    this.createDialogClose()
                }
            },
            handleChange(file, fileList) {
                console.log(file, fileList)
                this.fileList = fileList
            },
            handleFilesChange(file, fileTarList) {
                this.fileTarList = fileTarList
            },
            handleRemove(file, fileList) {
                console.log(file, fileList)
            },
            handleFilesRemove(file, fileTarList) {
                console.log(file, fileTarList)
            },
            handlePreview(file) {
                console.log(file);
            },
            handleFilesPreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(
                    `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            beforeFilesRemove(file, fileTarList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            downloadBookTemplate() {
                let a = document.createElement('a')
                a.href = `/static/booktemplate.xlsx`
                a.download = "资料模板.xlsx"
                a.click()
                a.remove()
            },
            handleSelectionChange(val) {
                this.bulkValues = val
            },
            handleCascaderChange(cascaderValue) {
                var localSlice = []
                for (var i = 0, len = cascaderValue.length; i < len; i++) {
                    localSlice.push(cascaderValue[i].join("/"))
                }

                this.createForm.label = localSlice.join(',')
            },
            handleCascaderSelectChange(cascaderSelectValue) {
                if (cascaderSelectValue == null) {
                    this.pageInfo.cascader_label = ''
                    return
                }
                this.pageInfo.cascader_label = cascaderSelectValue.join("/")
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
            downloadFile(row) {
                let token = window.sessionStorage.getItem("token")
                window.open('http://103.39.211.122:8090/research/download?research_id=' + row.research_id+'&Authorization='+token)
                // let routeData = this.$router.resolve({
                //     path: "/research/download",
                //     query: {
                //         "research_id": row.research_id,
                //         "token": "dddd",
                //     }
                // })
                // window.open(routeData.href)
            },
            uploadFile(row) {
                this.uploadForm.research_id = row.research_id
                this.uploadDialogFormVisible = true
            },
            editDialogClose() {
                this.$refs.editFormRef.resetFields()
            },
            createDialogClose() {
                this.$refs.createFormRef.resetFields()
                this.cascaderValue = []
                this.fileList = []
                this.fileTarList = []
            },
            uploadDialogClose() {
                this.$refs.uploadFormRef.resetFields()
            },
            handleSizeChange(newSize) {
                this.pageInfo.page_size = newSize
                this.getBookList()
            },
            handleCurrentChange(newPage) {
                this.pageInfo.page = newPage
                this.getBookList()
            },
            async getBookList() {
                this.loading = true
                const {
                    data: res
                } = await this.$http.get('/research/list', {
                    params: this.pageInfo
                })
                this.loading = false
                if (res.code != 200) {
                    return this.$message.error('获取资源列表失败');
                }
                this.pageInfo.page = res.result.page
                this.pageInfo.page_size = res.result.page_size
                this.bookList = res.result.result
                this.total = res.result.total
            },
            async getOptionList() {
                const {
                    data: res
                } = await this.$http.get('/research/label/cascade/list')
                if (res.code != 200) {
                    return this.$message.error('获取label失败');
                }
                this.options = res.result

                // 添加默认值
                // if (this.options.length > 0) {
                //     this.cascaderSelectValue.push(this.options[0].label)
                //     this.pageInfo.cascader_label = this.options[0].label
                // }
            },
            handleCreate() {
                this.activeName = "first"
                this.createDialogFormVisible = true
            },
            confirmMultiFiles() {
                if (this.fileTarList.length == 0) {
                    return this.$message.error('请选择要上传的文件包!')
                }

                var file = this.fileList[0].raw
                var fileTar = this.fileTarList[0].raw
                // 置空
                this.fileList = []
                this.fileTarList = []
                this.createDialogFormVisible = false

                let fileFormData = new FormData()
                fileFormData.append('file', file, file.name)
                fileFormData.append('files', fileTar, fileTar.name)
                let requestConfig = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }

                this.$http.post("/research/upload?research_id=1", fileFormData, requestConfig)
                    .then((res) => {
                        this.getBookList()
                        this.$message.success("批量上传资料成功")
                    })
                    .catch((err) => {
                        this.$message.error(err.toString())
                    })
            },
            confirmCreate() {
                if (this.fileList.length == 0) {
                    return this.$message.error('请选择要上传的文件列表!')
                }

                if (this.activeName != "first") {
                    console.log("执行多文件上传")
                    return this.confirmMultiFiles()
                }

                console.log("执行单文件上传")
                this.createDialogFormVisible = false
                var file = this.fileList[0].raw

                // this.createForm.label = this.dynamicTags.join(",")
                this.dynamicTags = []
                this.cascaderValue = []
                this.fileList = []

                this.$http.post("/research/create", this.createForm)
                    .then((res) => {
                        let fileFormData = new FormData();
                        fileFormData.append('file', file, file.name); //filename是键，file是值，就是要传的文件，test.zip是要传的文件名
                        let requestConfig = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                        }
                        // TODO： 先创建后，生成id之后然后上传
                        this.$http.post("/research/upload?research_id=" + res.data.result.research_id, fileFormData,
                                requestConfig)
                            .then((res) => {
                                this.getBookList()
                                this.$message.success("上传资料成功")
                                this.uploadDialogFormVisible = false
                            })
                            .catch((err) => {
                                this.$message.error(err.toString())
                            })
                    })
                    .catch((err) => {
                        return this.$message.error(err.toString())
                    })
            },
            cancelCreate() {
                this.createDialogFormVisible = false

                this.dynamicTags = []
                this.createDialogClose()
            },
            handleEdit(row) {
                this.editForm.research_id = row.research_id
                this.editForm.resource_version = row.resource_version
                this.editForm.name = row.name
                this.editForm.rtype = row.rtype
                this.editForm.gmt_create = row.gmt_create
                this.editForm.gmt_modified = row.gmt_modified
                this.editForm.press = row.press
                this.editForm.label = row.label
                this.dynamicTags = row.label.split(',')
                this.editForm.description = row.description

                this.dialogFormVisible = true
            },
            confirmEdit() {
                this.dialogFormVisible = false

                var localSlice = []
                for (var i = 0, len = this.cascaderValue.length; i < len; i++) {
                    localSlice.push(this.cascaderValue[i].join("/"))
                }
                localSlice.push(...this.dynamicTags) // TODO 去重
                this.editForm.label = localSlice.join(",")

                // 原有标签值
                this.dynamicTags = []
                this.cascaderValue = []

                this.$http.put("/research/update", this.editForm)
                    .then((res) => {
                        this.getBookList()
                        return this.$message.success(this.editForm.research_id + " 更新成功")
                    })
                    .catch((err) => {
                        return this.$message.error(err.toString())
                    })
            },
            cancelEdit() {
                this.dialogFormVisible = false
                this.cascaderValue = []
                this.dynamicTags = []
            },
            confirmUpload() {
                if (this.fileList.length == 0) {
                    return this.$message.error('请选择要上传的文件！')
                }
                var file = this.fileList[0].raw
                this.fileList = []

                let fileFormData = new FormData();
                fileFormData.append('file', file, file.name); //filename是键，file是值，就是要传的文件，test.zip是要传的文件名
                let requestConfig = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }
                this.$http.post("/research/upload?research_id=" + this.uploadForm.research_id, fileFormData,
                        requestConfig)
                    .then((res) => {
                        this.getBookList()
                        this.$message.success("上传资料成功")
                    })
                    .catch((err) => {
                        return this.$message.error(err.toString())
                    })
                this.uploadDialogFormVisible = false
            },
            cancelUpload() {
                this.fileList = []
                this.uploadDialogFormVisible = false
            },
            handleBulkDownload() {
                if (this.bulkValues.length == 0) {
                    return ElNotification({
                        message: '批量操作时至少需选中一个对象',
                        type: 'warning',
                    })
                }

                var localIds = []
                for (var i = 0; i < this.bulkValues.length; i++) {
                    localIds.push(this.bulkValues[i].research_id)
                }
            },
            handleBulkDelete() {
                if (this.bulkValues.length == 0) {
                    return ElNotification({
                        message: '批量操作时至少需选中一个对象',
                        type: 'warning',
                    })
                }

                var localIds = []
                for (var i = 0; i < this.bulkValues.length; i++) {
                    localIds.push(this.bulkValues[i].research_id)
                }

                this.$confirm('此操作将永久批量删除资料, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        draggable: true,
                    })
                    .then(() => {
                        // 批量优化
                        for (var i = 0; i < localIds.length; i++) {
                            this.$http.delete("/research/delete?research_id=" + localIds[i])
                                .then(() => {
                                    console.log("delete ok")
                                    this.getBookList()
                                })
                                .catch((err) => {
                                    console.log("delete error")
                                })
                        }
                    })
                    .catch(() => {
                        console.log("cancel")
                    }) // 捕捉取消事件
            },
            async handleDelete(row) {
                this.$confirm('此操作将永久删除资料 ' + row.name + ' , 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        draggable: true,
                    })
                    .then(() => {
                        this.$http.delete("/research/delete?research_id=" + row.research_id)
                            .then((res) => {
                                this.getBookList()
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
            FolderAdd,
            Search,
            Edit,
            Delete,
            ArrowDown,
            Plus,
            Upload,
            Download,
            Refresh,
            DocumentCopy,
            UploadFilled
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