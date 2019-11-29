<template>
    <div class="top-box">
        <div class="top-wrap">
            <!--<img class="logo" src="static/images/logo.png"/>-->
            汇鲜
        </div>
    </div>

</template>

<script>

    export default {
        data() {
            return {
                currentPagePath: '/wap',
                loginInfo:null,
                username:''
            }
        },
        methods: {

        },
        mounted() {
            console.log(this.$route.path);
            if(!this.loginInfo){
                this.loginInfo = JSON.parse(window.localStorage.getItem('userInfo') || null);
                this.username = this.loginInfo.username;
            }
        }
    }

</script>
<style scoped>
    .top-box{
        position: fixed;
        top:0;
        width:100%;
        height:50px;
        background: #233445;
        z-index:999;
    }
    .top-wrap{
        width:100%;
        height:50px;
        display: flex;;
        justify-content: center;
        align-items: center;
        font-size:14px;
        color: #fff;
    }

    .top-wrap .logo{
        width:30px;
        height:30px;
    }

</style>