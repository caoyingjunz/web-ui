<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>标签管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card style="margin-top: 30px;">
            <el-row :gutter="40">
                <el-col :span="6">
                    <el-input placeholder="请输入内容" v-model="pageInfo.query" clearable @input="getLabelList"  @clear="getLabelList">
                    <template #append>
                        <el-button span="8" type="primary" size="default" @click="getLabelList" >
                            <el-icon style="vertical-align: middle;" ><Search /></el-icon>
                        </el-button>
                    </template>
                  </el-input>
                </el-col>

                <el-col :span="6">
                    <el-button type="primary" @click="handleCreate">
                        <el-icon style="vertical-align: middle;margin-right: 8px;"><plus /></el-icon> 新建标签
                    </el-button>

                    <el-button  @click="getLabelList">
                        <el-icon style="vertical-align: middle;margin-right: 4px; "><refresh /></el-icon> 刷新
                    </el-button>
                </el-col>

            </el-row>

            <!-- table 表格区域 -->
            <el-table
                :data="labelList"
                stripe style="margin-top: 20px; width: 100%"
                v-loading="loading"
                >

                <el-table-column type="selection" width="40" />

                <el-table-column prop="name" label="标签名称" width="200" sortable>
                    <template #default="scope">
                        <el-link type="primary" @click="jumpRoute(scope.row.label_id)"> {{ scope.row.name }} </el-link>
                        <!-- <router-link tag="a" :to="{path: '/labelDetail', query: {label_id: scope.row.label_id}}"> {{ scope.row.name }}  </router-link> -->
                    </template>

                </el-table-column>

                <el-table-column prop="gmt_create" label="创建时间" width="200" sortable/>

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
                        <el-icon style="vertical-align: middle; margin-right: 5px;"><Edit /></el-icon> 编辑
                      </el-button>

                      <el-button type="danger" size="small" @click="handleDelete(scope.row)" style="margin-right: 10px">
                        <el-icon style="vertical-align: middle;margin-right: 5px;" ><Delete /></el-icon> 删除
                      </el-button>
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
          <el-dialog v-model="createDialogFormVisible" title="新建标签" width="60%" draggable @close="createDialogClose">
            <el-form
                ref="createFormRef"
                :model="createForm"
                :rules="createFormRules"
                label-width="10px"
                label-position="top"
              >

              <el-form-item label="标签名称" prop="name">
                <el-input v-model="createForm.name" placeholder="请输入标签名称"/>
              </el-form-item>

              <el-form-item label="标签" prop="content">
                <el-input v-model="createForm.content" placeholder="请输入标签" type="textarea" :autosize="autosize"/>
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
            <el-form
                ref="editFormRef"
                :model="editForm"
                :rules="editFormRules"
                label-width="120px"
                label-position="top"
              >

              <el-form-item label="标签名称" prop="name">
                <el-input v-model="editForm.name" disabled/>
              </el-form-item>

              <el-form-item label="创建时间" prop="gmt_create">
                <el-input v-model="editForm.gmt_create" disabled/>
              </el-form-item>

              <el-form-item label="标签值" prop="label">
                <el-input v-model="editForm.content"/>
              </el-form-item>

            </el-form>

            <template #footer>
                <span class="dialog-footer">
                  <el-button @click="cancelEdit">取消</el-button>
                  <el-button type="primary" @click="confirmEdit">确定</el-button>
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
                minRows: 4,
            },
            createForm: {
                name: '',
                parent_id: 0,
                content: '',
            },
            createFormRules: {
                name: [
                    {required: true, message: '请输入标签名称', trigger: 'blur'}
                ],
                content: [
                    {required: false, message: '', trigger: 'blur'}
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
                    {required: true, message: '请输入资料名', trigger: 'blur'}
                ],
            },
        }
    },
    created() {
        this.getLabelList()
    },
    methods: {
        jumpRoute(label_id){
            this.$router.push({
                name: 'labelDetail',
                params: {
                    label_id: label_id,
                }
            })
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
            this.getLabelList()
        },
        handleCurrentChange(newPage){
            this.pageInfo.page = newPage
            this.getLabelList()
        },
        async getLabelList(){
            this.loading = true
            const {data: res} = await this.$http.get('/research/label/list',{params: this.pageInfo})
            this.loading = false
            if (res.code != 200){
                return this.$message.error('获取标签列表失败');
            }
            this.pageInfo.page = res.result.page
            this.pageInfo.page_size = res.result.page_size
            this.labelList = res.result
            this.total = 10
        },
        handleCreate(){
            this.createDialogFormVisible = true
        },
        confirmCreate(){
            this.createDialogFormVisible = false
            const {data: res} =  this.$http.post("/research/label/create", this.createForm)
                .then((res)=>{
                    this.getLabelList()
                    return this.$message.success(this.createForm.name+" 创建成功")
                })
                .catch((err)=> {
                    return this.$message.error(err.toString())
                })
        },
        cancelCreate(){
            this.createDialogFormVisible = false
        },
        handleEdit(row){
            this.editForm.name = row.name
            this.editForm.label_id = row.label_id
            this.editForm.resource_version = row.resource_version
            this.editForm.gmt_create = row.gmt_create
            this.editForm.gmt_modified = row.gmt_modified
            this.editForm.content = row.content
            this.dialogFormVisible = true
        },
        confirmEdit(){
            this.dialogFormVisible = false

            this.$http.put("/research/label/update", this.editForm)
                .then((res)=>{
                    this.getLabelList()
                    return this.$message.success(this.editForm.research_id+" 更新成功")
                })
                .catch((err)=> {
                    return this.$message.error(err.toString())
                })
        },
        cancelEdit(){
            this.dialogFormVisible =false
        },
        async handleDelete(row) {
            this.$confirm('此操作将永久删除标签 ' + row.name +' , 是否继续?', '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    draggable: true,
                }
            )
            .then(() => {
                this.$http.delete("/research/label/delete?label_id=" + row.label_id)
                .then((res)=>{
                    this.getLabelList()
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
.el-icon {
    vertical-align: middle;
    text-align: center;
}

.ml-1 {
    margin: 2px;
}
</style>
