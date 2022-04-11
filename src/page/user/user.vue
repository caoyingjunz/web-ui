<template>
    <div class="ordering">
        <div class="heading">用户列表</div>

        <!-- <div>
            <el-button type="primary" @click="handleAdd">新增用户</el-button>
        </div> -->

        <div>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="time" label="注册时间" width="160" />
                <el-table-column prop="name" label="姓名" width="120" />
                <el-table-column prop="sex" label="性别" width="110"/>
                <el-table-column prop="job" label="职位" width="120"/>
                <el-table-column prop="address" label="所在城市" width="150"/>

                <el-table-column fixed="right" label="操作" width="180">
                    <template #default>
                      <el-button type="text" size="small" @click="handleClick">详情</el-button>
                      <el-button type="text" size="small" @click="hanldeEdit">编辑</el-button>

                    </template>
                  </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import {reactive} from 'vue'

export default{
data() {
    return{
        tableData: reactive([
            {
                time: '2004-10-16',
                name: '曹英俊',
                sex: '男',
                job: '董事长',
                address: '杭州'
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
            }
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
        handleClick() {
            console.log('click')
        },
        handleAdd() {
            console.log("add")
        },
        hanldeEdit() {
            console.log("edit")
        }
    },
    components: {

    }
}
</script>

<style>
</style>