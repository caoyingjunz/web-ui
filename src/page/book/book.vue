<template>
    <div class="ordering">
        <div class="heading">资料管理</div>
        <!-- 卡片视图区 -->
        <el-card >

            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="请输入内容" v-model="pageInfo.query" clearable @clear="getBookList">
                    <template #append>
                        <el-icon><Search /></el-icon>
                      <el-button :span="8" :icon="Search" @click="getBookList" />
                    </template>
                  </el-input>
                </el-col>

                <el-col :span="4">
                    <el-button type="primary" @click="gotoAddPage"> 添加资料 </el-button>
                </el-col>
            </el-row>

            <!-- table 表格区域 -->
            <el-table :data="bookList" stripe style="width: 100%">

                <el-table-column prop="research_id" label="资料编号" width="110" />
                <el-table-column prop="name" label="资料名" width="120" />
                <el-table-column prop="gmt_create" label="创建时间" width="280"/>
                <el-table-column prop="press" label="出版社" width="110"/>

                <el-table-column fixed="right" label="操作" width="180">
                    <template #default="scope">
                      <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                      <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>

            <!-- 分页区域 -->
            <el-pagination
            v-model:currentPage="pageInfo.page"
            v-model:page-size="pageInfo.page_size"
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            />

          </el-card>

          <el-dialog v-model="dialogFormVisible" title="编辑" width="50%" draggable @close="editDialogClose">
            <el-form
                ref="editFormRef"
                :model="editForm"
                :rules="editFormRules"
                label-width="120px"
                label-position="top"
              >

              <el-form-item label="资料编号" prop="research_id">
                <el-input v-model="editForm.research_id" />
              </el-form-item>
              <el-form-item label="资料名" prop="name">
                <el-input v-model="editForm.name" />
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

export default {
    data() {
        return{
            pageInfo: {
                query: '',
                page: 1,
                page_size: 8,
            },
            deleteParam: {
                research_id: 0
            },
            bookList: [],
            dialogFormVisible: false,
            total: 0,
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
            this.dialogFormVisible =false
            this.$message.success("更新成功")
        },
        cancelEdit(){
            this.dialogFormVisible =false
        },
        async handleDelete(row) {
            ElMessageBox.confirm('此操作将永久删除该用户. 是否继续?','提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                draggable: true,
            })
            .then(() => {
                this.deleteParam.research_id = row.research_id
                this.$http.delete("/research/material/delete", {params: this.deleteParam})
                .then((res)=>{
                    this.getBookList()
                    this.$message.success(row.name+" 删除成功")
                })
                .catch((err)=> {
                    this.$message.error(err.toString())
                })
            })
        }
    },
    components: {

    }
}
</script>

<style scoped>
.ordering2 {
    position: absolute;
    top: 40px;
    left: 180px;
    right: 0;
    padding: 10px 0;
    margin: 0 auto;
    max-width: 1400px;
}

.bookheading {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 1000px;
  min-height: auto;
  height: 300px;
}

</style>