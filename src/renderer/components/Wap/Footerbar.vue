<template>
    <div class="footer-box">
        <el-menu class="foot-wrap" :unique-opened="true" :default-active="currentPagePath"
                 :router="true">
            <el-menu-item class="btn-footer" index="/wap">
                <i class="fa fa-cube"></i>
                <span>商品</span>
            </el-menu-item>
            <el-menu-item class="btn-footer" index="/wap/order">
                <i class="fa fa-inbox"></i>
                <span>订单</span>

            </el-menu-item>
            <el-menu-item class="btn-footer" index="" @click="logout">
                <i class="fa fa-sign-out"></i>
                <span>退出</span>

            </el-menu-item>
        </el-menu>
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
            logout() {
                this.$confirm('是否要退出?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    localStorage.clear();
                    this.$router.replace({name: 'login'});
                });
            },
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
<style>
    .footer-box{
        position: fixed;
        bottom: 0;
        width:100%;
        height:50px;
        background: #fff;
        z-index:999;
        border-top:1px solid #f1f1f1;
    }
    .foot-wrap{
        width:100%;
        height:50px;
        display: flex;;
        justify-content: space-around;

    }
    .btn-footer{
        display: flex;
        flex-direction: column;
        padding-top:6px;
        padding-left: 0 !important;
        padding-right: 0 !important;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .btn-footer span{
        height:30px;
        line-height:30px;
        font-size:12px;
    }
    .btn-footer .fa{
        width:16px;
        height:16px;
        font-size:16px;
        margin:0 auto;
    }
    .btn-footer:focus,.btn-footer .is-active {
        background: none;
    }

    .el-message-box {
        width: 300px !important;
    }


</style>