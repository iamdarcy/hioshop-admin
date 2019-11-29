<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ name: 'nature' }">商品设置</el-breadcrumb-item>
                <el-breadcrumb-item>{{infoForm.id ? '编辑型号' : '添加型号'}}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <el-button type="primary" @click="goBackPage" icon="arrow-left">返回列表</el-button>
            </div>
        </div>
        <div class="content-main">
            <div class="form-table-box">
                <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
                    <el-form-item label="分类名称" prop="name">
                        <el-input v-model="infoForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-input-number v-model="infoForm.sort_order" :min="1" :max="1000"></el-input-number>
                    </el-form-item>
                    <el-form-item>
                        <el-button v-if="infoForm.id > 0" type="primary" @click="updateSpec">确定保存</el-button>
                        <el-button v-else type="primary" @click="addSpec">确定添加</el-button>
                        <el-button v-if="infoForm.id > 0" type="danger" @click="specDelete">删除</el-button>
                        <el-button @click="goBackPage">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/config/api';
    export default {
        data() {
            return {
                infoForm: {
                    id: 0,
                    name: "",
                    sort_order: 1,
                },
                infoRules:{
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            addSpec(){
                let info = {
                    name:this.infoForm.name,
                    sort_order:this.infoForm.sort_order
                }
                this.$refs['infoForm'].validate((valid) => {
                    if (valid) {
                        this.axios.post('specification/add', info).then((response) => {
                            if (response.data.errno === 0) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.$router.go(-1);
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '添加失败'
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            updateSpec(){
                let info = {
                    id:this.infoForm.id,
                    name:this.infoForm.name,
                    sort_order:this.infoForm.sort_order
                }
                this.$refs['infoForm'].validate((valid) => {
                    if (valid) {
                        this.axios.post('specification/update', info).then((response) => {
                            if (response.data.errno === 0) {
                                this.$message({
                                    type: 'success',
                                    message: '保存成功!'
                                });
                                this.$router.go(-1);
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '保存失败'
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            specDelete(index, row) {
                this.$confirm('确定要删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.post('specification/delete', {id: row.id}).then((response) => {
                        console.log(response.data)
                        if (response.data.errno === 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.$router.go(-1);
                        }
                        else {
                            this.$message({
                                type: 'error',
                                message: '删除失败，该型号下有商品!'
                            });
                        }
                    })
                });
            },
            goBackPage() {
                this.$router.go(-1);
            },
            getInfo() {
                console.log(this.infoForm.id);
            console.log(this.infoForm.id);
            console.log(this.infoForm.id);
                if (this.infoForm.id <= 0) {
                    return false
                }
                let that = this
                this.axios.post('specification/detail', {
                        id: that.infoForm.id
                }).then((response) => {
                    let resInfo = response.data.data;
                    console.log(resInfo);
                    that.infoForm = resInfo;
                })
            }
        },
        components: {},
        mounted() {
            this.infoForm.id = this.$route.query.id || 0;
            
            this.getInfo();
        }
    }

</script>

<style scoped>
    .image-uploader {
        height: 105px;
    }

    .image-uploader .el-upload {
        border: 1px solid #d9d9d9;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .image-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .image-uploader .image-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        min-width: 105px;
        height: 105px;
        line-height: 105px;
        text-align: center;
    }

    .image-show {
        background-color: #f8f8f8;
        min-width: 105px;
        height: 105px;
        display: block;
    }

</style>
