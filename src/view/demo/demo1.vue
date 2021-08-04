<template>
    <div class="wrap">
        <button @click="link()">返回</button>
        <input type="text" v-model="text">
    </div>
</template>
<script>
    export default{
        data(){
            return {
                text: ''
            }
        },
        methods:{
            link() {
                this.$router.push({ path: '/demo', query: { userId: 123 }})
                // this.$router.go(-1)
            }
        }
    }
</script>
<style scoped>
.canvas {
    width: 400px;
    height: 400px;
    margin: 0 auto;
    border: 2px solid #999;
}
</style>