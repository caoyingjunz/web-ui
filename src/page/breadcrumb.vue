<template>
    <div class="ordering">

        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="v in lists" :key="v.path"> {{v.path }} </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data() {
        return{
            list: []
        }
    },
    watch: {
        $route(to, from) {
            console.log("from",from)
            console.log("to",to.matched)
            this.list = to.matched;
        }
    },
    methods: {

    },
    mounted(){
        this.list = this.$route.matched;
    },
    components: {

    }
}
</script>