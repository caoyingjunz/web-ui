<template>
<div>
    <h1>姓名: {{name}}</h1>
    <h1>年龄: {{age}} </h1>
    <h1>公司: {{company}}</h1>
    <h1>产品: {{ obj.tabao}}</h1>
    <h1 v-for="(item, index) in arr" :key="index">{{item.xiaomi}} </h1>
</div>
<hr>

<button @click="btn"> 点击更新 </button>

</template>

<script>

import {ref} from 'vue'

export default({
  setup() {
      const name = ref('曹英俊')
      const age = 18
      const company = '九州云'

      const obj = ref({tabao:'边缘云计算', tianmao:'OpenStack'})

      const arr = ref([{
          xiaomi: '小米'
      }])

      function btn() {
            console.log("btn")
            name.value = '英俊'
            obj.value.tabao= "kubernetes"
            arr.value[0].xiaomi = "小米2"
      }

      return {name, age, company, obj, btn,arr}
  }
})
</script>