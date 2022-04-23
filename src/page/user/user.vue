<template>
    <div class="ordering">
        <div class="heading">用户列表</div>

        <!-- 卡片视图区 -->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
                    <template #append>
                        <el-icon><Search /></el-icon>
                      <el-button :span="8" :icon="Search" @click="getUserList" />
                    </template>
                  </el-input>
                </el-col>

                <el-col :span="4">
                    <el-button type="primary" @click="gotoAddPage"> 添加用户 </el-button>
                </el-col>
            </el-row>

            <!-- table 表格区域 -->
            <el-table :data="userList" stripe style="width: 100%">

                <el-table-column prop="time" label="注册时间" width="160" />
                <el-table-column prop="name" label="姓名" width="120" />
                <el-table-column prop="sex" label="性别" width="110"/>
                <el-table-column prop="job" label="职位" width="120"/>
                <el-table-column prop="address" label="所在城市" width="150"/>
                <el-table-column fixed="right" label="操作" width="180">
                    <template #default="scope">
                      <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                      <!-- <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                      <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>

            <!-- 分页区域 -->
            <el-pagination
            v-model:currentPage="queryInfo.pageNo"
            v-model:page-size="queryInfo.pageSize"
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />

        </el-card>

          <!-- 编辑对话框 -->
          <el-dialog v-model="dialogFormVisible" title="编辑" width="50%" draggable @close="editDialogClose">
            <el-form
                ref="editFormRef"
                :model="editForm"
                :rules="editFormRules"
                label-width="120px"
                label-position="top"
              >

              <el-form-item label="用户姓名" prop="user_name">
                <el-input v-model="editForm.user_name" />
              </el-form-item>

              <el-form-item label="性别" prop="user_sex">
                <el-radio-group v-model="editForm.user_sex">
                  <el-radio label="男" />
                  <el-radio label="女" />
                </el-radio-group>
              </el-form-item>

              <el-form-item label="年龄(岁)" prop="user_age">
                <el-input v-model="editForm.user_age" type="number"> </el-input>
            </el-form-item>

              <!-- <el-form-item label="Activity time" required>
                <el-col :span="11">
                  <el-form-item prop="date1">
                    <el-date-picker
                      v-model="editForm.date1"
                      type="date"
                      placeholder="Pick a date"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col class="text-center" :span="2">
                  <span class="text-gray-500">-</span>
                </el-col>
                <el-col :span="11">
                  <el-form-item prop="date2">
                    <el-time-picker
                      v-model="editForm.date2"
                      placeholder="Pick a time"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
              </el-form-item> -->

              <!-- <el-form-item label="Instant delivery" prop="delivery">
                <el-switch v-model="editForm.delivery" />
              </el-form-item> -->

              <el-form-item label="工作城市" prop="cities">
                  <el-checkbox v-model="editForm.cities.beijing" label="北京" border />
                  <el-checkbox v-model="editForm.cities.wuxi" label="无锡" border />
                  <el-checkbox v-model="editForm.cities.suqian" label="宿迁" border />
                  <el-checkbox v-model="editForm.cities.hangzhou" label="杭州" border />
                  <el-checkbox v-model="editForm.cities.shanghai" label="上海" border />
              </el-form-item>

              <el-form-item label="职位" prop="position">
                <el-input v-model="editForm.position"> </el-input>
              </el-form-item>

              <el-form-item label="其他描述" prop="description">
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

    </div>
</template>

<script>
import {reactive,ref} from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

export default{
data() {
    return{
        detail: ref(false),
        //  查询参数对象
         queryInfo: {
            query: '',
            pageNo: 1,
            pageSize: 5
        },
        editForm: {
                user_name: '',
                user_sex: '',
                user_age: 18,
                position: '',
                description: '',
                cities: {
                    beijing: false,
                    wuxi: false,
                    suqian: false,
                    hangzhou: false,
                    shanghai: false
                },
        },
        editFormRules: {
            user_name: [
                {required: true, message: '请输入用户姓名', trigger: 'blur'}
            ],
            user_sex: [
                {required: true, message: '请输入性别', trigger: 'blur'}
            ],
            user_age: [
                {required: false, message: '请输入年龄', trigger: 'blur'}
            ],
            position: [
                {required: false, message: '请输入用户职位', trigger: 'blur'}
            ],
            description: [
                {required: false, message: '请输入用户职位', trigger: 'blur'}
            ],
        },
        editFormRef: {},
        // 用户列表
        userList: [],
        // 总数据数
        total: 0,
        dialogFormVisible: false,
        autosize: {
            minRows: 4,
        },
      }
    },
    created() {
        this.getUserList()
        // 默认初始化性别
        // this.editForm.user_sex = "男"
    },
    methods: {
        handleSizeChange(newSize){
            this.queryInfo.pageSize = newSize
            this.getUserList()
        },
        handleCurrentChange(newPage){
            this.queryInfo.pageNo = newPage
            this.getUserList()
        },
        // 根据分页获取对应的用户列表
        async getUserList(){
        //    const {data: res} = await this.$http.get('user',{params: this.queryInfo})
        //    if (res.meta.status != 200) {
        //        return this.$tips.error('获取用户列表失败');
        //    }

        //    this.$tips.success('获取用户列表成功')
        //    console.log(res.data)
        //    this.userList = res.data.users
        //    this.total = res.data.total
        this.total = 6
        this.userList = reactive([
            {
                time: '2004-10-16',
                name: '曹英俊',
                sex: '男',
                age: 18,
                job: '董事长',
                address: '杭州'
            },
            {
                time: '2004-6-16',
                name: '张小胖',
                sex: '女',
                age: 18,
                job: '财务总监',
                address: '南京'
            },
            {
                time: '2016-10-18',
                name: '段铁蛋',
                sex: '男',
                age: 16,
                job: 'CEO',
                address: '郑州'
            },
            {
                time: '2008-09-28',
                name: '张狗蛋',
                sex: '男',
                age: 19,
                job: '体育老师',
                address: '日照'
            },
            {
                time: '2006-10-18',
                name: '孙皮蛋',
                sex: '男',
                age: 14,
                job: 'CTO',
                address: '香港'
            }])
        },
        gotoAddPage() {
            this.$router.push('/user/add')
        },
        handleEdit(row){
            // 编辑显示初始化
            // TODO: 字段统一优化
            this.editForm.user_name = row.name
            this.editForm.user_sex = row.sex
            this.editForm.user_age = row.age
            this.editForm.position = row.job

            // TODO： 应根据实际字段初始化
            this.editForm.cities.beijing = false
            this.editForm.cities.wuxi = false
            this.editForm.cities.suqian = false
            this.editForm.cities.hangzhou = false
            this.editForm.cities.shanghai = false

            this.dialogFormVisible = true
        },
        confirmEdit(){
            // TODO
            console.log("确定", this.editForm.user_name)
            this.dialogFormVisible =false
            this.$message.success("更新成功")
        },
        cancelEdit(){
            // TODO
            console.log("取消", this.editForm.user_name)
            this.dialogFormVisible =false
        },
        editDialogClose(){
            this.$refs.editFormRef.resetFields()
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
                console.log("确定操作",row.name)
                ElMessage({
                    type: 'success',
                    message: 'Delete completed',
                })
            })
            .catch(() => {
                console.log("取消操作",row.name)
                ElMessage({
                    type: 'info',
                    message: 'Delete canceled',
                })
            })
        }
    },
    components: {
        Search,
    }
}
</script>

<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>