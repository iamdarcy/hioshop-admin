<style scoped>
    body {
        background: #f5f7fa;
        display: block;
    }

    .container {
        height: 100%;
        width: 100%;
    }

    .content {
        box-sizing: border-box;
        padding: 20px 20px 20px 220px;
        min-height: 700px;
        overflow: auto;
    }

    .footer {
        margin-top: 10px;
        text-align: center;
        line-height: 30px;
        color: #999;
        display: block;
    }
</style>
<template>
    <div class="container">
        <sidebar></sidebar>
        <!-- <navbar></navbar> -->
        <div class="content">
            <transition name="router-fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
    import Sidebar from './Common/Sidebar';
    import Navbar from './Common/Navbar';

    export default {
        data() {
            return {
            }
        },
        components: {
            Sidebar,
            Navbar
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
    }

</script>
