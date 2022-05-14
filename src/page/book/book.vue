<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>资料管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card style="margin-top: 30px;">
            <el-row :gutter="40">

                <el-col :span="6">
                    <el-input placeholder="请输入内容" v-model="pageInfo.query" clearable @clear="getBookList">
                    <template #append>
                        <el-button span="8" type="primary" size="default" @click="getBookList" >
                            <el-icon style="vertical-align: middle;" ><Search /></el-icon>
                        </el-button>
                    </template>
                  </el-input>
                </el-col>

                <el-col :span="4">
                    <el-button type="primary" @click="handleCreate">
                        <el-icon style="vertical-align: middle;margin-right: 8px;" ><plus /></el-icon> 新建资料
                    </el-button>
                </el-col>
            </el-row>

            <!-- table 表格区域 -->
            <el-table :data="bookList" stripe  style="margin-top: 20px; width: 100%">

                <el-table-column prop="research_id" label="资料编号" width="110" />
                <el-table-column prop="name" label="资料名" width="180" />
                <el-table-column prop="gmt_create" label="创建时间" width="200"/>
                <el-table-column prop="gmt_modified" label="更新时间" width="200"/>
                <el-table-column prop="press" label="出版社" width="160"/>

                <el-table-column fixed="right" label="操作" width="500">
                    <template #default="scope">
                      <el-button type="primary" size="small" @click="handleEdit(scope.row)">
                        <el-icon style="vertical-align: middle; margin-right: 5px;"><Edit /></el-icon> 编辑
                      </el-button>

                      <el-button type="danger" size="small" @click="handleDelete(scope.row)" style="margin-right: 10px">
                        <el-icon style="vertical-align: middle;margin-right: 5px;" ><Delete /></el-icon> 删除
                      </el-button>

                        <!-- <el-dropdown>
                          <el-button type="primary" size="small">
                             其他
                             <el-icon style="vertical-align: middle; margin-left: 5px;"><arrow-down /></el-icon>
                          </el-button>
                          <template #dropdown>
                            <el-dropdown-menu>
                              <el-dropdown-item>下载</el-dropdown-item>
                            </el-dropdown-menu>
                          </template>
                        </el-dropdown> -->

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
          <el-dialog v-model="createDialogFormVisible" title="创建" width="60%" draggable @close="createDialogClose">
            <el-form
                ref="createFormRef"
                :model="createForm"
                :rules="createFormRules"
                label-width="10px"
                label-position="top"
              >
              <el-form-item label="资料名" prop="name">
                <el-input v-model="createForm.name" placeholder="请输入资料名"/>
              </el-form-item>

              <el-form-item label="出版社" prop="press">
                <el-input v-model="createForm.press" placeholder="请输入出版社" />
              </el-form-item>

              <el-form-item label="描述" prop="description">
                <el-input v-model="createForm.description" placeholder="请输入简介描述" type="textarea" :autosize="autosize"/>
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
          <el-dialog v-model="dialogFormVisible" title="编辑" width="60%" draggable @close="editDialogClose">
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
                <el-input v-model="editForm.name" />
              </el-form-item>

              <el-form-item label="创建时间" prop="gmt_create">
                <el-input v-model="editForm.gmt_create" disabled/>
              </el-form-item>

              <el-form-item label="出版社" prop="press">
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
    </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
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
            Search: '',
            Plus: '',
            Delete: '',
            Edit: '',
            ArrowDown: '',
            pageInfo: {
                query: '',
                page: 1,
                page_size: 10, // 默认值需要是分页定义的值
            },
            deleteParam: {
                research_id: 0
            },
            bookList: [],
            createDialogFormVisible: false,
            dialogFormVisible: false,
            total: 0,
            autosize: {
                minRows: 4,
            },
            createForm: {
                name: '',
                press: '',
                description: '',
            },
            createFormRules: {
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
        }
    },
    created() {
        this.getBookList()
    },
    methods: {
        editDialogClose(){
            this.$refs.editFormRef.resetFields()
        },
        createDialogClose(){
            this.$refs.createFormRef.resetFields()
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
            const {data: res} = await this.$http.get('/research/material/pagelist',{params: this.pageInfo})
            if (res.code != 200){
                return this.$message.error('获取资源列表失败');
            }
            this.pageInfo.page = res.result.page
            this.pageInfo.page_size = res.result.page_size
            this.bookList = res.result.research_materials
            this.total = res.result.total
        },
        handleCreate(){
            this.createDialogFormVisible = true
        },
        confirmCreate(){
            this.createDialogFormVisible =false

            this.$http.post("/research/material/create", this.createForm)
                .then((res)=>{
                    this.getBookList()
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
            this.editForm.research_id = row.research_id
            this.editForm.resource_version = row.resource_version
            this.editForm.name = row.name
            this.editForm.gmt_create = row.gmt_create
            this.editForm.gmt_modified = row.gmt_modified
            this.editForm.press = row.press
            this.editForm.description = row.description

            this.dialogFormVisible = true
        },
        confirmEdit(){
            this.dialogFormVisible = false

            this.$http.put("/research/material/update", this.editForm)
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
        },
        async handleDelete(row) {
            ElMessageBox.confirm('此操作将永久删除该资料. 是否继续?','提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                draggable: true,
            })
            .then(() => {
                // this.deleteParam.research_id = row.research_id
                // this.$http.delete("/research/material/delete", {params: this.deleteParam})
                this.$http.delete("/research/material/delete?research_id=" +row.research_id)
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
        Plus
    }
}
</script>

<style scoped>
.el-icon {
    vertical-align: middle;
    text-align: center;
}

</style>
