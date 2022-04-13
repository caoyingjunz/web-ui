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
                    <el-button type="primary"> 添加用户 </el-button>
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
                      <el-button type="primary" size="small" @click="detail = true">编辑</el-button>
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
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />

        </el-card>
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
            pageNo:1,
            pageSize:2
        },
        // 用户列表
        userList: [],
        // 总数据数
        total: 0

      }
    },
    created() {
        this.getUserList()

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
                job: '董事长',
                address: '杭州'
            },
            {
                time: '2004-6-16',
                name: '张小胖',
                sex: '女',
                job: '财务总监',
                address: '南京'
            },
            {
                time: '2016-10-18',
                name: '段铁蛋',
                sex: '男',
                job: 'CEO',
                address: '郑州'
            },
            {
                time: '2008-09-28',
                name: '张狗蛋',
                sex: '男',
                job: '体育老师',
                address: '日照'
            },
            {
                time: '2006-10-18',
                name: '孙皮蛋',
                sex: '男',
                job: 'CTO',
                address: '香港'
            }])
        },
        handleAdd() {
            console.log("add")
        },
        async handleDelete(raw) {
            console.log(raw)
            ElMessageBox.confirm('此操作将永久删除该用户. 是否继续?','提示',
            {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            }
        )
            .then(() => {
                ElMessage({
                    type: 'success',
                    message: 'Delete completed',
                })
            })
            .catch(() => {
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