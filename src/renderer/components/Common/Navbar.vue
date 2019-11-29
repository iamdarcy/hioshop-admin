<template>
    <div class="right-box">
        <div class="navbar">
            <div class="menu">
                <div class="menu-item">
                    <i class="fa fa-sign-out" @click="logout"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {
            logout() {
                this.$confirm('是否要退出?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    localStorage.clear();
                    this.$router.replace({name: 'login'});
                });
            }
        }
    }

</script>

<style scoped>
    .right-box {
        background: #112233;
        height: 60px;
        display: block;
        position: fixed;
        top: 0;
        left: 200px;
        z-index: 5;
        float: left;
        width: calc(100% - 200px);
        overflow: hidden;
        -webkit-box-shadow: 0 1px 8px rgba(0,21,41,.08);
        box-shadow: 2px 6px 8px rgba(0,21,41,.08);
    }
    .fa:hover{
        cursor:pointer
    }
    /*.fa-sign-out{*/
        /*color:#000000;*/
    /*}*/
    /*.fa-user{*/
        /*color:#000000;*/
    /*}*/
    .navbar {
        height: 60px;
        /*background: #fff;*/
        display: flex;
        width: 100%;
        justify-content: center;
        flex-direction: row;

    }

    .navbar .menu {
        flex: 1;
        margin-top: 15px;
        height: 40px;
        display: flex;
        justify-content: flex-end;
    }

    .navbar .menu-item {
        margin: 0 15px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 20px;
        color: #fff;
    }

</style>
