<template>
    <div class="wrap">
        <input type="text" v-model="text">
        <button @click="link()">跳转</button>
        <div>{{this.$route.query.userId}}</div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                text: 'huang'
            }
        },
        methods:{
            link() {
                this.$router.push('/demo1')
            }
        }
    }
</script>
<style scoped>

</style>