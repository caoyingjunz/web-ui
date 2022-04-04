// 通用配置或者函数

import { reactive } from "vue";

function plbLic() {
    const res_a = reactive(
        {
            name: "曹英俊",
            age : 18,
            company: "99cloud"
        }
       )
      return res_a
}

export default plbLic
