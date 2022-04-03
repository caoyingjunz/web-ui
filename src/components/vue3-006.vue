<template>
    <div>
        曹英俊年龄: <input type="number" v-model="yingjun">
        <br>
        张三年龄: <input type="number" v-model="zhangsan">
        <br>
        年龄总和: <input type="number" v-model="sum">
    </div>
    <hr>

    <button @click="btn"> 点击更新 </button>

    </template>

    <script>

    import {computed, reactive, toRefs} from 'vue'

    export default({
      setup() {
    const yingjun= ''
    const zhangsan = ''
    const res = reactive({yingjun, zhangsan})

    const sum = computed(()=>{
        return res.yingjun + res.zhangsan
    })

    return{...toRefs(res), sum}  }
    })
    </script>