// 公共弹窗

import { ElMessage } from 'element-plus'


const tips = class{
    constructor(msg, type="success"){
        this.msg = msg
        this.type = type
    }

    // element message
    print_message(){
        ElMessage({
            message: this.msg,
            type: this.type,
            duration: 3000,
            showClose: true,
        })
    }
}

export default tips