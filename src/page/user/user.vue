<template>
    <div class="ordering">
        <div class="heading">用户列表</div>

        <div>
            <el-table :data="tableData" stripe style="width: 100%">

                <el-table-column prop="time" label="注册时间" width="160" />
                <el-table-column prop="name" label="姓名" width="120" />
                <el-table-column prop="sex" label="性别" width="110"/>
                <el-table-column prop="job" label="职位" width="120"/>
                <el-table-column prop="address" label="所在城市" width="150"/>
                <el-table-column fixed="right" label="操作" width="180">
                    <template #header>
                        <el-input v-model="search" size="small" placeholder="Type to search" />
                    </template>

                    <template #default="scope">
                      <el-button size="small" @click="detail = true">详情</el-button>
                      <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>

        <el-dialog v-model="detail" title="详细信息" width="30%" center>
          <span>It should be noted that the content will not be aligned in center by default</span>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="detail = false">Cancel</el-button>
              <el-button type="primary" @click="detail = false">Confirm</el-button>
            </span>
          </template>
        </el-dialog>

    </div>
</template>

<script>
import {reactive,ref} from 'vue'

export default{
data() {
    return{
        detail: ref(false),
        search: ref(''),
        tableData: reactive([
            {
                time: '2004-10-16',
                name: '曹英俊',
                sex: '男',
                job: '董事长',
                address: '杭州'
            },
            {
                time: '2016-10-18',
                name: '段铁蛋',
                sex: '男',
                job: '技术总监',
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
                name: '断马',
                sex: '男',
                job: 'CTO',
                address: '香港'
            },
            {
                time: '2006-10-18',
                name: '靓仔',
                sex: '男',
                job: '总经理',
                address: '北京'
            },
         ]),
         page: {
            pageTotal:1,
            rows:1,
            pageNo:1,
            pageSize:2
             }
        }
    },
    methods: {
        handleAdd() {
            console.log("add")
        },
        handleDelete(index, row) {
            console.log("delete index",index)
            console.log("delete row",row.name)
        }
    },
    components: {

    }
}
</script>

<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>