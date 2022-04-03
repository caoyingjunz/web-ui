<template>
    <div>
        <h1>姓名: {{obj.name}}</h1>
        <h1>年龄: {{obj.age}} </h1>
        <h1>产品: {{ obj.company }}</h1>
    </div>
    <hr>

    <button @click="btn"> 点击更新 </button>

    </template>

    <script>

    import {reactive} from 'vue'
    export default({
      setup() {
          const name = '曹英俊'
          const age = '18'
          const company = '九州云'
          const obj =reactive({name, age,company})

          function btn() {
              obj.name = '英俊'
              obj.age = 19
              obj.company = '九州牛'
          }

          return { btn,obj}
      }
    })
    </script>