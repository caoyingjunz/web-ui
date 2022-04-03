<template>
  <div class="backg">
    父组件
    <h2>姓名：{{res_a.name}}</h2>
    <h2>年龄 {{res_a.age}}</h2>
    <h2>公司 {{ res_a.company }}</h2>

  </div>
  <HelloWorld/>

</template>

<script>


import HelloWorld from './components/vue3-013.vue'

import plbLic from './common/common'

// import {reactive} from 'vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },

  setup(){
  //   const res_a = reactive(
  //   {
  //       name: "曹英俊",
  //       age : 18,
  //       company: "99cloud"
  //   }
  //  )

  const  res_a = plbLic()

  return {res_a}
  }
}
</script>

<style scoped >
.backg {
  background-color: brown;
}



</style>

