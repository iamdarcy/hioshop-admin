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
    }

</style>
<template>
    <div class="container">
        <topbar></topbar>
        <footerbar></footerbar>
        <div class="content">
            <transition name="router-fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
    import Topbar from './Wap/Topbar';
    import Footerbar from './Wap/Footerbar';

    export default {
        data() {
            return {
                dialogVisible: false,
            }
        },
        components: {
            Topbar,
            Footerbar
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
        },

    }

</script>
