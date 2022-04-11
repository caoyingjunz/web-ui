<template>
    <div class="ordering">
        <el-button type="text" @click="handleInfo = true" >详情</el-button>

        <el-dialog v-model="handleInfo" title="Warning" width="30%" center>
          <span>It should be noted that the content will not be aligned in center by default</span>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="handleInfo = false">Cancel</el-button>
              <el-button type="primary" @click="handleInfo = false">Confirm</el-button>
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
        handleInfo:ref(false),
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