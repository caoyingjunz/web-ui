<template>
    <div class="ordering">
        <!-- 卡片视图 -->
        <el-card>
            <!-- 提示区域 -->
            <el-alert title="添加用户信息" type="info" effect="dark" center show-icon :closable="false" />

            <!-- 步骤条区域 -->
            <el-steps :active="active" finish-status="success" align-center>
                <el-step title="基本信息" />
                <el-step title="用户属性" />
                <el-step title="用户详情" />
                <el-step title="完成" />
            </el-steps>

            <!-- 表单区域 -->
            <el-form
            ref="addFormRef"
            :model="addForm"
            :rules="addFormRules"
            label-width="120px"
            label-position="top"
            :size="formSize"
          >

            <el-tabs v-model="active" :tab-position="'left'" class="demo-tabs">
                <el-tab-pane label="基本信息" name="1">
                    <el-form-item label="用户姓名" prop="user_name">
                       <el-input v-model="addForm.user_name"> </el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="user_sex">
                        <el-input v-model="addForm.user_sex"> </el-input>
                    </el-form-item>

                    <el-form-item label="年龄(岁)" prop="user_age">
                        <el-input v-model="addForm.user_age" type="number"> </el-input>
                    </el-form-item>
                </el-tab-pane>

                <el-tab-pane label="用户属性" name="2">
                    用户属性
                </el-tab-pane>

                <el-tab-pane label="用户详情" name="3">
                    用户详情
                </el-tab-pane>

                <el-tab-pane label="完成" name="4">
                    完成
                </el-tab-pane>
            </el-tabs>


            </el-form>

        </el-card>
    </div>
</template>

<script>
export default{
    data(){
        return {
            active: '1',
            // 添加用户的表单数据对象
            addForm: {
                user_name: '',
                user_sex: '',
                user_age: 0
            },
            addFormRules: {
                user_name: [
                    {required: true, message: '请输入用户姓名', trigger: 'blur'}
                ],
                user_sex: [
                    {required: true, message: '请输入性别', trigger: 'blur'}
                ],
                user_age: [
                    {required: true, message: '请输入年龄', trigger: 'blur'}
                ],
            },
            addFormRef: {}
        }
    },

    created(){
    },

    methods: {}

}
</script>

<style scoped>
.el-alert {
  margin: 20px 0 0;
}
.el-alert:first-child {
  margin: 0;
} </style>