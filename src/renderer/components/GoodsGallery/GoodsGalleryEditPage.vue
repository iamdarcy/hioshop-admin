<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ name: 'dashboard' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{infoForm.id ? '编辑商品标头图片' : '添加商品标头图片'}}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <el-button size="small" type="primary" @click="onSubmitInfo">确定保存</el-button>
                <!--<el-button size="small" type="primary" @click="test">测试</el-button>-->
                <el-button size="small" type="primary" @click="goBackPage" icon="arrow-left">返回列表</el-button>
            </div>
        </div>
        <div class="content-main">
            <el-form ref="infoForm" :model="infoForm">
                <el-form-item class="in-wrap" label="图片" v-for="item in infoForm.data">
                    <img class="img-wrap" :src="item.img_url" />
                    <el-input class="input-wrap" type="number" size="small" v-model="item.sort_order"
                              placeholder=""></el-input>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
    import api from '@/config/api';

    export default {
        data() {
            return {
                uploaderHeader: {
                    'X-Nideshop-Token': localStorage.getItem('token') || '',
                },
                infoForm: {
                    id: 0,
                },
                tableData: []
            }
        },
        methods: {
            test() {
                console.log(this.infoForm);
            },
            onSubmitInfo() {
                this.axios.post('goods/galleryEdit', this.infoForm).then((response) => {
                    if (response.data.errno === 0) {
                        this.$message({
                            type: 'success',
                            message: '保存成功'
                        });
//                        this.$router.go(-1);
                    } else {
                        this.$message({
                            type: 'error',
                            message: '保存失败'
                        })
                    }
                })
            },
            goBackPage() {
                this.$router.go(-1);
            },
            getInfo() {
                console.log(this.infoForm.id)
                if (this.infoForm.id <= 0) {
                    return false
                }
                //加载广告详情
                let that = this
                this.axios.get('goods/galleryList', {
                    params: {
                        id: that.infoForm.id
                    }
                }).then((response) => {
                    console.log(response.data);
                    that.infoForm = response.data;
                })
            }
        }
        ,
        components: {},
        mounted() {
            this.infoForm.id = this.$route.query.id || 0;
            this.getInfo();
            console.log(api)
        }
    }

</script>

<style scoped>
    .in-wrap{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 0;
    }
    .img-wrap{
        float: left;
        width: 100px;
        height: 100px;
    }
    .input-wrap{
        width:100px;
        float: left;
        margin-left: 30px;
        margin-top:30px;
    }
</style>