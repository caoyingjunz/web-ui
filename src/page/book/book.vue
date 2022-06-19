<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>研究资料</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card style="margin-top: 20px;">
            <el-row :gutter="40">
                <el-col :span="9">
                    <div>
                        <el-input placeholder="请输入搜索内容" style="width: 430px;" v-model="pageInfo.query" clearable @input="getBookList"  @clear="getBookList" class="input-with-select">
                          <template #prepend>
                            <el-select v-model="pageInfo.select" style="width: 100px">
                              <el-option label="资料名" value="1" />
                              <el-option label="标签" value="2" />
                              <el-option label="精准查找" value="3" />
                            </el-select>
                          </template>

                          <template #append>
                            <el-button span="8" type="primary" size="default" @click="getBookList" >
                                <el-icon style="vertical-align: middle;" ><Search /></el-icon>
                            </el-button>
                          </template>
                        </el-input>
                    </div>
                </el-col>

                <el-col :span="2">
                    <el-button @click="getBookList" style="margin-left: 2px;">
                        <el-icon style="vertical-align: middle;margin-right: 4px; "><refresh /></el-icon> 刷新
                    </el-button>
                </el-col>

                <el-col :span="6" :offset="6">
                    <el-button type="primary" @click="handleCreate">
                        <el-icon style="vertical-align: middle;margin-right: 8px;"><plus /></el-icon> 资料上传
                    </el-button>

                    <el-button type="success" @click="handleBulkDownload" style="padding-right: 10px;">
                        <el-icon style="vertical-align: middle;margin-right: 8px;"><Download /></el-icon> 批量下载
                    </el-button>

                    <!-- <el-button @click="handleBulkDelete" style="padding-right: 10px;">
                       <el-icon style="vertical-align: middle;margin-right: 8px;"><delete /></el-icon> 批量删除
                    </el-button> -->

                </el-col>
            </el-row>

            <!-- table 表格区域 -->
            <el-table :data="bookList"
                stripe
                style="margin-top: 20px; width: 100%"
                v-loading="loading"
                >

                <el-table-column type="selection" width="40" />
                <el-table-column prop="research_id" label="资料编号" width="110" sortable/>
                <el-table-column prop="name" label="资料名" width="200" />
                <el-table-column prop="rtype" label="类型" width="60" />
                <el-table-column prop="gmt_create" label="创建时间" width="168" sortable/>
                <!-- <el-table-column prop="gmt_modified" label="更新时间" width="200"/> -->
                <!-- <el-table-column prop="press" label="出版机构" width="80"/> -->

                <el-table-column prop="label" label="标签值">
                    <template #default="scope">
                        <span v-for="(item, index) in (scope.row.label || '').split(',')">
                            <el-tag class="ml-1"> {{ item }} </el-tag>
                        </span>
                    </template>
                </el-table-column>


                <el-table-column fixed="right" label="操作" width="250">
                    <template #default="scope">
                      <el-button type="primary" size="small" @click="handleEdit(scope.row)">
                        <el-icon style="vertical-align: middle; margin-right: 5px;"><Edit /></el-icon> 编辑
                      </el-button>

                      <el-button type="danger" size="small" @click="handleDelete(scope.row)" style="margin-right: 10px">
                        <el-icon style="vertical-align: middle;margin-right: 5px;" ><Delete /></el-icon> 删除
                      </el-button>

                        <el-dropdown>
                          <el-button type="info" size="small">
                             更多
                             <el-icon style="vertical-align: middle; margin-left: 5px;"><arrow-down /></el-icon>
                          </el-button>

                          <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="uploadFile(scope.row)">
                                    <el-icon style="vertical-align: middle; margin-right: 5px;"><Upload /></el-icon>
                                    重新上传
                                </el-dropdown-item>
                            </el-dropdown-menu>

                            <el-dropdown-menu>
                                <el-dropdown-item @click="downloadFile(scope.row)">
                                  <el-icon style="vertical-align: middle; margin-right: 5px;"><Download /></el-icon>
                                    下载
                                  </el-dropdown-item>
                              </el-dropdown-menu>
                          </template>
                        </el-dropdown>

                    </template>
                </el-table-column>

            </el-table>

            <!-- 分页区域 -->
            <el-pagination style="margin-top: 20px;"
            v-model:currentPage="pageInfo.page"
            v-model:page-size="pageInfo.page_size"
            :page-sizes="[10, 20, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            />
          </el-card>

          <!-- 创建对话框区域 -->
          <el-dialog v-model="createDialogFormVisible" title="资料上传" width="60%" draggable @close="createDialogClose">
            <el-form
                ref="createFormRef"
                :model="createForm"
                :rules="createFormRules"
                label-width="10px"
                label-position="top"
              >

              <el-upload
                class="upload-demo"
                ref="upload"
                action="doUpload"
                drag
                multiple
                :limit="1"
                :before-upload="beforeUpload">

                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    将文件拖到此处，或 <em>点击上传</em>
                </div>

                <template #tip>
                    <div class="el-upload__tip">
                        只能上传jpg/png文件，且不超过500kb
                    </div>
                </template>
                 <!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
              </el-upload>

              <el-form-item label="标签" prop="label">
                <el-cascader
                    :options="options"
                    :props="{ multiple: true, checkStrictly: true }"
                    v-model="cascaderValue"
                    @change="handleCascaderChange"
                    clearable>
                 </el-cascader>
              </el-form-item>

              <el-form-item label="出版机构" prop="press">
                <el-input v-model="createForm.press" placeholder="请输入出版机构" />
              </el-form-item>

              <el-form-item label="描述" prop="description">
                <el-input v-model="createForm.description" placeholder="请输入简介描述" type="textarea" :autosize="autosize"/>
              </el-form-item>

            </el-form>

            <template #footer>
                <span class="dialog-footer">
                  <el-button @click="cancelCreate">取消</el-button>
                  <el-button type="primary" @click="confirmCreate2">确定</el-button>
                </span>
              </template>
            </el-dialog>

          <!-- 编辑对话框区域 -->
          <el-dialog v-model="dialogFormVisible" title="资料更新" width="60%" draggable @close="editDialogClose">
            <el-form
                ref="editFormRef"
                :model="editForm"
                :rules="editFormRules"
                label-width="120px"
                label-position="top"
              >

              <el-form-item label="资料编号" prop="research_id">
                <el-input v-model="editForm.research_id" disabled/>
              </el-form-item>

              <el-form-item label="资料名" prop="name">
                <el-input v-model="editForm.name" disabled/>
              </el-form-item>

              <el-form-item label="类型" prop="rtype">
                <el-input v-model="editForm.rtype" disabled/>
              </el-form-item>

              <el-form-item label="创建时间" prop="gmt_create">
                <el-input v-model="editForm.gmt_create" disabled/>
              </el-form-item>

              <el-form-item label="标签" prop="label">
                <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                    {{tag}}
                </el-tag>

                <el-cascader style="margin-left: 10px"
                    :options="options"
                    :props="{ multiple: true, checkStrictly: true }"
                    v-model="cascaderValue"
                    @change="handleCascaderChange"
                    clearable>
                </el-cascader>

              <!-- <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>

              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button> -->
              </el-form-item>

              <el-form-item label="出版机构" prop="press">
                <el-input v-model="editForm.press" />
              </el-form-item>

              <el-form-item label="描述" prop="description">
                <el-input v-model="editForm.description" type="textarea" :autosize="autosize"/>
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
            <el-form
                ref="uploadFormRef"
                :model="uploadForm"
                :rules="uploadFormRules"
                label-width="120px"
                label-position="top"
              >

              <el-form-item label="资料编号" prop="research_id">
                <el-input v-model="uploadForm.research_id" disabled/>
              </el-form-item>

            <el-upload
                class="upload-demo"
                ref="upload"
                action="doUpload"
                :limit="1"
                :before-upload="beforeUpload">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
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
    ArrowDown,
    Plus,
    Upload,
    Download,
    UploadFilled
} from '@element-plus/icons-vue'

export default {
    data() {
        return{
            options: [],
            cascaderValue: [],

            // tag 属性设置
            dynamicTags: [],
            inputVisible: false,
            inputValue: '',

            loading: false,
            file:'',
            pageInfo: {
                // 搜索下拉分类
                select: '标签',
                query: '',
                use_page: true, // 默认启用分页效果
                page: 1,
                page_size: 10, // 默认值需要是分页定义的值
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
                name: [
                    {required: true, message: '请输入资料名', trigger: 'blur'}
                ],
                press: [
                    {required: false, message: '请输入出版社', trigger: 'blur'}
                ],
                label: [
                    {required: false, message: '请输入标签', trigger: 'blur'}
                ],
                description: [
                    {required: false, message: '请输入简介', trigger: 'blur'}
                ],
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
                name: [
                    {required: true, message: '请输入资料名', trigger: 'blur'}
                ],
                press: [
                    {required: false, message: '请输入出版社', trigger: 'blur'}
                ],
                description: [
                    {required: false, message: '请输入简介', trigger: 'blur'}
                ],
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
        handleCascaderChange(cascaderValue){
            var localSlice = []
            for (var i=0, len=cascaderValue.length; i<len; i++)
            {
                localSlice.push(cascaderValue[i].join("/"))
            }

            this.createForm.label = localSlice.join(',')
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
        beforeUpload(file){
            this.file = file
            return false // 返回false不会自动上传
        },
        downloadFile(row){
            window.open('/research/download?research_id=' + row.research_id)
        },
        uploadFile(row){
            this.uploadForm.research_id = row.research_id
            this.uploadDialogFormVisible = true
        },
        editDialogClose(){
            this.$refs.editFormRef.resetFields()
        },
        createDialogClose(){
            this.$refs.createFormRef.resetFields()
        },
        uploadDialogClose(){
            this.$refs.uploadFormRef.resetFields()
        },
        handleSizeChange(newSize){
            this.pageInfo.page_size = newSize
            this.getBookList()
        },
        handleCurrentChange(newPage){
            this.pageInfo.page = newPage
            this.getBookList()
        },
        async getBookList(){
            this.loading = true
            const {data: res} = await this.$http.get('/research/list',{params: this.pageInfo})
            this.loading = false
            if (res.code != 200){
                return this.$message.error('获取资源列表失败');
            }
            this.pageInfo.page = res.result.page
            this.pageInfo.page_size = res.result.page_size
            this.bookList = res.result.result
            this.total = res.result.total
        },
        async getOptionList(){
            const {data: res} = await this.$http.get('/research/label/cascade/list')
            if (res.code != 200){
                return this.$message.error('获取label失败');
            }
            this.options = res.result
        },
        handleCreate(){
            this.createDialogFormVisible = true
        },
        confirmCreate2(){
            this.createDialogFormVisible = false
            if (this.file == ''){
                return this.$message.error('请选择要上传的文件！')
            }
            // this.createForm.label = this.dynamicTags.join(",")
            this.dynamicTags = []
            this.cascaderValue = []

            this.$http.post("/research/create", this.createForm)
                .then((res)=>{
                    let fileFormData = new FormData();
                    fileFormData.append('file', this.file, this.file.name); //filename是键，file是值，就是要传的文件，test.zip是要传的文件名
                    let requestConfig = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                    }
                    // TODO： 先创建后，生成id之后然后上传
                    this.$http.post("/research/upload?research_id=" + res.data.result.research_id, fileFormData, requestConfig)
                        .then((res)=>{
                            this.file = ''
                            this.getBookList()
                            this.$message.success("上传资料成功")
                            this.uploadDialogFormVisible = false
                        })
                        .catch((err)=> {
                            this.$message.error(err.toString())
                        })
                })
                .catch((err)=> {
                    return this.$message.error(err.toString())
                })
        },
        cancelCreate(){
            this.createDialogFormVisible = false
            this.cascaderValue = []
            this.dynamicTags = []
        },
        handleEdit(row){
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
        confirmEdit(){
            this.dialogFormVisible = false

            var localSlice = []
            for (var i=0, len=this.cascaderValue.length; i<len; i++)
            {
                localSlice.push(this.cascaderValue[i].join("/"))
            }
            localSlice.push(...this.dynamicTags) // TODO 去重
            this.editForm.label = localSlice.join(",")

            // 原有标签值
            this.dynamicTags = []
            this.cascaderValue = []

            this.$http.put("/research/update", this.editForm)
                .then((res)=>{
                    this.getBookList()
                    return this.$message.success(this.editForm.research_id+" 更新成功")
                })
                .catch((err)=> {
                    return this.$message.error(err.toString())
                })
        },
        cancelEdit(){
            this.dialogFormVisible =false
            this.cascaderValue = []
            this.dynamicTags = []
        },
        confirmUpload(){
            if (this.file == ''){
                return this.$message.error('请选择要上传的文件！')
            }
            let fileFormData = new FormData();
            fileFormData.append('file', this.file, this.file.name); //filename是键，file是值，就是要传的文件，test.zip是要传的文件名
            let requestConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
            this.$http.post("/research/upload?research_id=" + this.uploadForm.research_id, fileFormData, requestConfig)
                .then((res)=>{
                    this.getBookList()
                    this.$message.success("上传资料成功")
                    // 重置
                    this.file = ''
                })
                .catch((err)=> {
                    this.file = ''
                    return this.$message.error(err.toString())
                })
            this.uploadDialogFormVisible = false
        },
        cancelUpload(){
            this.uploadDialogFormVisible = false
        },
        handleBulkDownload(){
            console.log("handleBulkDownload")
        },
        handleBulkDelete(){
            this.$confirm('此操作将永久批量删除资料, 是否继续?', '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    draggable: true,
                }
            )
            .then(() => {
                console.log("删除 删除")
            })
            .catch(()=> {
            }) // 捕捉取消事件

        },
        async handleDelete(row) {
            this.$confirm('此操作将永久删除资料 ' + row.name +' , 是否继续?', '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    draggable: true,
                }
            )
            .then(() => {
                this.$http.delete("/research/delete?research_id=" + row.research_id)
                .then((res)=>{
                    this.getBookList()
                    return this.$message.success(row.name+" 删除成功")
                })
                .catch((err)=> {
                    return this.$message.error(err.toString())
                })
            })
            .catch(()=> {
            }) // 捕捉取消事件
        }
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
    }
}
</script>

<style scoped>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

.el-icon {
    vertical-align: middle;
    text-align: center;
}

.ml-1 {
    margin: 2px;
}

.el-tag + .el-tag {
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
