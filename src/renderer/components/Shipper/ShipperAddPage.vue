<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ name: 'dashboard' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>快递公司</el-breadcrumb-item>
                <el-breadcrumb-item>{{infoForm.id ? '编辑快递公司' : '添加快递公司'}}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <el-button type="primary" @click="goBackPage" icon="arrow-left">返回列表</el-button>
            </div>
        </div>
        <div class="content-main">
            <div class="form-table-box">
                <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
                    <el-form-item label="名字" prop="name">
                        <el-input v-model="infoForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="代号" prop="code">
                        <el-input v-model="infoForm.code"></el-input>
                    </el-form-item>
                    <el-form-item label="客户编号" v-if="infoForm.code == 'YTO'">
                        <el-input v-model="infoForm.CustomerName"></el-input>
                        <div class="tips">圆通需要必填</div>
                    </el-form-item>
                    <el-form-item label="月结账号" prop="MonthCode">
                        <el-input v-model="infoForm.MonthCode"></el-input>
                        <div class="tips">圆通、顺丰必填</div>
                    </el-form-item>
                    <el-form-item label="排序" prop="sort_order">
                        <el-input-number v-model="infoForm.sort_order" :min="1" :max="1000"></el-input-number>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmitInfo">确定保存</el-button>
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
                uploaderHeader: {
                    'X-Nideshop-Token': localStorage.getItem('token') || '',
                },
                infoForm: {
                    id: 0,
                    name: '',
                    code: '',
                    sort_order: 0
                },
                infoRules: {
                    name: [
                        {required: true, message: '请输入快递公司名字', trigger: 'blur'},
                    ],
                    code: [
                        {required: true, message: '请输入快递公司代号', trigger: 'blur'},
                    ],
                    MonthCode: [
                        {required: true, message: '请输入快递公司月结账号', trigger: 'blur'},
                    ],
                },
            }
        },
        methods: {
            goBackPage() {
                this.$router.go(-1);
            },
            onSubmitInfo() {
                this.$refs['infoForm'].validate((valid) => {
                    if (valid) {
                        this.axios.post('shipper/store', this.infoForm).then((response) => {
                            if (response.data.errno === 0) {
                                this.$message({
                                    type: 'success',
                                    message: '保存成功'
                                });
                                this.$router.go(-1)
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
            getInfo() {
                if (this.infoForm.id <= 0) {
                    return false
                }

                //加载快递公司详情
                let that = this
                this.axios.get('shipper/info', {
                    params: {
                        id: that.infoForm.id
                    }
                }).then((response) => {
                    let resInfo = response.data.data;
                    that.infoForm = resInfo;
                })
            }

        },
        components: {},
        mounted() {
            this.infoForm.id = this.$route.query.id || 0;
            this.getInfo();
            console.log(api)
        }
    }

</script>
