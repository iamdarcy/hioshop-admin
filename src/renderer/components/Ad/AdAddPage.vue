<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ name: 'ad' }">广告列表</el-breadcrumb-item>
                <el-breadcrumb-item>{{infoForm.id ? '编辑广告' : '添加广告'}}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <!--<el-button type="primary" @click="test" icon="arrow-left">test</el-button>-->
                <el-button type="primary" @click="goBackPage" icon="arrow-left">返回列表</el-button>
            </div>
        </div>
        <div class="content-main">
            <div class="form-table-box">
                <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
                    <el-form-item label="广告图片" prop="image_url">
                        <img v-if="infoForm.image_url" :src="infoForm.image_url" class="image-show">
                        <el-upload
                                class="upload-demo"
                                name="file"
                                :action="qiniuZone"
                                :on-remove="adRemove"
                                :before-remove="beforeAdRemove"
                                :file-list="fileList"
                                :on-success="handleUploadImageSuccess"
                                :data="picData"
                                :before-upload="getQiniuToken"
                        >
                            <el-button v-if="!infoForm.image_url" size="small" type="primary">点击上传</el-button>
                        </el-upload>
                        <div class="form-tip">图片尺寸：750*440</div>
                    </el-form-item>
                    <el-form-item label="商品类型">
                        <el-radio-group v-model="infoForm.link_type">
                            <el-radio :label="0">商品id</el-radio>
                            <el-radio :label="1">链接</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="广告链接" prop="link" v-if="infoForm.link_type == 1">
                        <el-input class="link-input" v-model="infoForm.link"></el-input>
                    </el-form-item>
                    <el-form-item label="商品id" prop="link" v-if="infoForm.link_type == 0">
                        <el-input class="id-input" v-model="infoForm.goods_id"></el-input>
                        <el-popover
                                placement="right"
                                v-model="related_pop"
                        >
                            <el-table :data="chooseRelateGoods" stripe style="width: 100%">
                                <el-table-column prop="id" label="id" width="100"></el-table-column>
                                <el-table-column prop="list_pic_url" label="商品图片" width="120">
                                    <template scope="scope">
                                        <img :src="scope.row.list_pic_url" alt="" style="width: 40px;height: 40px">
                                    </template>
                                </el-table-column>
                                <el-table-column prop="name" label="商品名称" width="300px"></el-table-column>
                                <el-table-column label="操作">
                                    <template scope="scope">
                                        <el-button
                                                size="small"
                                                type="danger"
                                                @click="relateSelect(scope.row.id)">选择
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-button slot="reference" type="primary" @click="relateGoodsClick">添加关联商品</el-button>
                        </el-popover>
                    </el-form-item>
                    <el-form-item label="结束时间" prop="end_time">
                        <el-date-picker
                                v-model="infoForm.end_time"
                                type="datetime"
                                placeholder="选择日期"
                                default-time="23:59:59">
                            >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="排序" prop="sort_order">
                        <el-input-number v-model="infoForm.sort_order" :min="1" :max="999"></el-input-number>
                    </el-form-item>
                    <el-form-item label="广告启用">
                        <el-switch active-value="1" inactive-value="0" v-model="infoForm.enabled"></el-switch>
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
                qiniuZone:'',
                root: '',
                fileList: [],
                uploaderHeader: {
                    'X-Nideshop-Token': localStorage.getItem('token') || '',
                },
                infoForm: {
                    id: 0,
                    image_url: '',
                    link_type: 0,
                    enabled: 0,
                    end_time: '',
                    goods_id:0,
                    link:''
                },
                infoRules: {
                    image_url: [
                        {required: true, message: '请输入广告图片', trigger: 'blur'},
                    ],
                    end_time: [
                        {required: true, message: '请选择时间', trigger: 'blur'},
                    ],
                },
                picData: {
                    token: ''
                },
                url: '',
                chooseRelateGoods: [],
                related_pop: false
            }
        },
        methods: {
            relateSelect(id) {
                console.log(id);
                this.infoForm.goods_id = id;
                this.related_pop = false;
            },
            relateGoodsClick() {
                this.axios.post('ad/getallrelate', {id: this.infoForm.id}).then((response) => {
                    if (response.data.errno === 0) {
                        this.chooseRelateGoods = response.data.data
                    }
                });
            },
            test() {
                console.log(this.infoForm.end_time);
            },
            beforeAdRemove() {
                return this.$confirm(`确定移除？`);
            },
            adRemove(file, fileList) {
                this.infoForm.image_url = '';
                let id = this.infoForm.id;
                this.axios.post('ad/deleteAdImage', {id: id}).then((response) => {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                });
            },
            getQiniuToken() {
                let that = this
                this.axios.post('index/getQiniuToken').then((response) => {
                    let resInfo = response.data.data;
                    console.log(resInfo);
                    that.picData.token = resInfo.token;
                    that.url = resInfo.url;
                })
            },
            goBackPage() {
                this.$router.go(-1);
            },
            onSubmitInfo() {
                console.log(this.infoForm);
                // return false;
                let time = this.infoForm.end_time
                if (time == 0) {
                    this.$message({
                        type: 'error',
                        message: '请选择时间'
                    });
                    return false;
                }
                if (this.infoForm.link_type == 0) {
                    if(this.infoForm.goods_id == 0 ){
                        this.$message({
                            type: 'error',
                            message: '请选择商品'
                        });
                        return false;
                    }
                }
                if (this.infoForm.link_type == 1) {
                    if(this.infoForm.link == '' ){
                        this.$message({
                            type: 'error',
                            message: '请输入链接'
                        });
                        return false;
                    }
                }
                this.$refs['infoForm'].validate((valid) => {
                    if (valid) {
                        this.axios.post('ad/store', this.infoForm).then((response) => {
                            if (response.data.errno === 0) {
                                this.$message({
                                    type: 'success',
                                    message: '保存成功'
                                });
                                this.$router.go(-1);
                            } else if (response.data.errno === 100) {
                                this.$message({
                                    type: 'error',
                                    message: '该商品已经有广告关联'
                                })
                            }
                            else {
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
            handleUploadImageSuccess(res, file) {
                let url = this.url;
                this.infoForm.image_url = url + res.key;
            },
            getInfo() {
                if (this.infoForm.id <= 0) {
                    return false
                }
                //加载广告详情
                let that = this
                this.axios.get('ad/info', {
                    params: {
                        id: that.infoForm.id
                    }
                }).then((response) => {
                    let resInfo = response.data.data;
                    resInfo.enabled = resInfo.enabled ? "1" : "0";
                    that.infoForm = resInfo;
                    that.infoForm.end_time = resInfo.end_time * 1000;
                    let info = {
                        name: resInfo.name,
                        url: resInfo.image_url
                    };
                    this.fileList.push(info);
                    console.log(this.infoForm);
                })
            }
        },
        components: {},
        mounted() {
            this.infoForm.id = this.$route.query.id || 0;
            this.getInfo();
            this.root = api.rootUrl;
            this.getQiniuToken();
            this.qiniuZone = api.qiniu;
        }
    }

</script>

<style scoped>
    .image-show {
        background-color: #f8f8f8;
        min-width: 200px;
        height: 200px;
        display: block;
    }

    .id-input {
        margin-bottom: 20px;
    }

    .link-input .el-input__inner {
        width: 400px !important;
    }
</style>