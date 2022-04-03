<template>
   <div class="backtt">
    子组件
    <h2>姓名：{{ res_a.name }}</h2>
    <h2>年龄：{{ res_a.age }}</h2>
    <h2>公司 {{ res_a.company }}</h2>
<hr>
 <button @click="btn" > 更新子组件姓名 </button>

   </div>
</template>
<script>

import plbLic from '../common/common'

export default({
setup(){
   const res_a = plbLic()

   function btn () {
       res_a.name = "caoyingjun"

   }

   return { res_a,btn}
}
})
</script>

<style scoped >
.backtt{
    background-color: aquamarine;
}
</style>
