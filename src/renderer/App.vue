<template>
    <div id="app">
        <transition name="router-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'nideshop-admin'
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    html,
    body,
    #app {
        height: 100%;
        width: 100%;
        background: #f5f7f9;
        font-family: Lato, Helvetica, sans-serif;
    }

    a, a:hover {
        text-decoration: none;
    }

    .content-nav {
        height: 40px;
        background: #f5f7fa;
        margin: 0 0 10px 0;
        display: flex;
    }

    .content-nav .breadcrumb {
        height: 40px;
        line-height: 40px;
        flex: 1;
        color: #8492A6;
    }

    .content-nav .operation-nav {
        width: auto;
        display: flex;
        align-items: center;
    }

    .content-main {
        padding: 20px;
        background: #fff;
    }

    .filter-box {
        height: auto;
        overflow: hidden;
    }

    .page-box {
        margin-top: 20px;
        text-align: right;
    }

    .form-table-box .el-input__inner {
        max-width: 240px;
    }

    .form-table-box .el-textarea {
        width: 400px;
    }

    .router-fade-enter-active,
    .router-fade-leave-active {
        transition: opacity .3s;
    }

    .router-fade-enter,
    .router-fade-leave-active {
        opacity: 0;
    }

    .form-table-box .el-form {
        margin-top: 40px;
    }

    .form-tip{
        color: #888;
        font-size: 12px;
        line-height: 30px;
    }
</style>
