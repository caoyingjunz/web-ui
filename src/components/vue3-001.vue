<template>
  <div>caoyingjun {{ res }}</div>
  <div v-for="(item, index) in arr" :key="index">
    <h1> {{ item }} </h1>
  </div>

  <button @click="btn"> 确定 </button>

</template>

<script>
export default {
  setup(){
    console.log('8090')
    // 常量
    const res = '123456'
    // 数组
    const arr = ['1','2','3']
    // 函数定义
    function btn(){
      console.log('========')
    }

    // 返回定义的对象
    return {res, arr, btn}
  }
}
</script>

<style scoped>

</style>
