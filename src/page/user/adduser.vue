<template>
    <div class="ordering">
        <!-- 卡片视图 -->
        <el-card>
            <!-- 提示区域 -->
            <el-alert title="添加用户信息" type="info" effect="dark" center show-icon :closable="false" />

            <!-- 步骤条区域 -->
            <el-steps :active="active" finish-status="success" align-center>
                <el-step title="基本信息" />
                <el-step title="所在城市" />
                <el-step title="照片" />
                <el-step title="其他描述" />
                <el-step title="完成" />
            </el-steps>

            <!-- 表单区域 -->
            <el-form
            ref="addFormRef"
            :model="addForm"
            :rules="addFormRules"
            label-width="120px"
            label-position="top"
          >

            <el-tabs v-model="active" :tab-position="'left'"
                class="demo-tabs" :before-leave="beforeTabLeave" @tab-click="tabClicked">
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

                <el-tab-pane label="所在城市" name="2">
                    <el-form-item label="工作城市">
                        <!-- 复选框组 -->
                        <el-checkbox-group v-model="manyTableData">
                            <el-checkbox :label="city" v-for="(city, i) in manyTableData" :key="i"  border></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="职位" prop="position">
                        <el-input v-model="addForm.position"> </el-input>
                    </el-form-item>
                </el-tab-pane>

                <el-tab-pane label="照片" name="3">
                    <el-upload
                        action="uploadURL"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        list-type="picture"
                        :headers="handleHeaders"
                    >
                        <el-button type="primary" size="small">点击上传</el-button>
                        <template #tip>
                        </template>
                    </el-upload>
                </el-tab-pane>

                <!-- 个人简介，基本描述 -->
                <el-tab-pane label="其他描述" name="4">
                    <!-- 输入框内容 -->
                    <el-input v-model="desc"
                        type="textarea"
                        size="default"
                        :autosize="autosize"
                        placeholder="输入描述信息"
                        class="inputDesc"
                        > </el-input>

                    <el-button type="primary" class="btnAdd" @click="addUser"> 添加用户 </el-button>

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
            active: "1",
            // 添加用户的表单数据对象
            addForm: {
                user_name: '',
                user_sex: '',
                user_age: 18,
                position: ''
            },
            addFormRules: {
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
            },
            addFormRef: {},
            // 动态参数列表
            manyTableData: [],
            // uploadURL
            uploadURL: `http:127.0.0.1:8080/upload`,
            handleHeaders:{
                Authentication: window.sessionStorage.getItem("token")
            },
            desc: "",
            autosize: {
                minRows: 8,
                maxRows: 46
             }
        }
    },

    created(){
    },

    methods: {
        beforeTabLeave(activeName, oldActiveName){
            // 在第一页时，必须填写完成 user_name 才允许标签也切换
            if (oldActiveName == '1') {
                if (this.addForm.user_name == '') {
                     this.$message.error('请先输入用户姓名!')
                    return false
                }
            }
        },
        tabClicked(){
            if (this.active === "2") {
                // this.$http.get()
                this.manyTableData = ["北京", "无锡", "宿迁","杭州", "上海"]
            }
        },
        // 处理图片预览效果
        handlePreview(){
        },
        // 处理移除操作
        handleRemove(){
        },
        // 新增用户
        addUser(){
            console.log("add user")
            this.$refs.addFormRef.validate (valid => {
                // 校验填写项
                if (!valid){
                    return this.$message.error("请填写必要的输入项")
                }
                // 实现新增逻辑
            })
            }
        }
    }

</script>

<style scoped>
.el-alert {
  margin: 20px 0 0;
}
.el-alert:first-child {
  margin: 0;
}

.el-checkbox {
    margin: 0 10px 0 0!important;
}

.btnAdd {
    /* width: 200px; */
    display: flex;
    /* align-items: center; */
    /* justify-content: center; */
    /* margin:  10px auto 0 auto; */
    /* font-size:  16px; */
}

.inputDesc {
    width: 1170px;
    margin-bottom: 15px;
}

</style>
