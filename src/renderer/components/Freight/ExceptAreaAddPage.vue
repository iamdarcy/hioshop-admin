<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ name: 'freight' }">运费模板</el-breadcrumb-item>
                <el-breadcrumb-item>{{infoForm.id ? '编辑偏远地区' : '添加偏远地区'}}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <el-button type="primary" @click="goBackPage" icon="arrow-left">返回列表</el-button>
            </div>
        </div>
        <div class="content-main">
            <div class="form-table-box">
                <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
                    <el-form-item label="名称" prop="content">
                        <el-input v-model="infoForm.content" placeholder="请输入名称" autofocus></el-input>
                    </el-form-item>
                    <el-form-item class="special-freight">
                        <div class="form-table-box">
                            <el-table :data="tableData" style="width: 100%" border stripe>
                                <el-table-column prop="areaName" label="偏远地区"></el-table-column>
                                <el-table-column label="操作" width="160">
                                    <template scope="scope">
                                        <el-button size="small" type="primary" plain
                                                   @click="handleRowEdit(scope.$index, scope.row)">编辑地区
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <!--<div class="add-btn" v-if="tableData.length == 0">-->
                        <!--<el-button type="text" @click="add_template">+添加偏远地区</el-button>-->
                        <!--</div>-->
                    </el-form-item>
                    <el-form-item>
                        <el-button v-if="infoForm.id" type="primary" @click="onSaveTemplate">确定保存</el-button>
                        <el-button v-else type="primary" @click="onAddTemplate">确定添加</el-button>
                        <el-button @click="goBackPage">返回列表</el-button>
                        <!--<el-button @click="testCallBack">回调</el-button>-->
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-dialog size="tiny" title="设置偏远地区" :visible.sync="specEditVisible">
            <el-form ref="specForm" class="specFormDialig">
                <el-form-item label="" label-width="100px">
                    <el-transfer v-model="selectedArea" :props="{key: 'id',label: 'name'}"
                                 :data="areaData" :titles="['可选', '已选']"></el-transfer>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="specEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateArea">确定</el-button>
                <!--<el-button type="primary" @click="updateSpec" v-if="!is_spec_add">确定修改</el-button>-->
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import api from '@/config/api';

    export default {
        data() {
            return {

                areaData: [],
                selectedArea: [],
                specEditVisible: false,
                infoForm: {
                    id: 0,
                    content: ''
                },
                infoRules: {
                    content: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ],
                },
                tableData: [{
                    area: '',
                    ghost: 0
                }],
            }
        },
        methods: {
            testCallBack() {
                console.log(this.tableData);
            },
            updateArea() {

                let all = this.areaData;
                let selected = this.selectedArea;
                selected = selected.join(',')
                this.tableData[0].area = selected;

                let areaName = this.selectedArea;

                let newName = [];
                for (const item in areaName) {
                    all.map((ele) => ele.id == areaName[item] ? newName.push(ele.name) : '')
                }
                let that = this;
                let name = newName.join(',');

                that.tableData = [];
                that.tableData.push({
                    area: selected,
                    areaName: name
                })

                // console.log(this.tableData[index].areaName);
                that.specEditVisible = false;


            },
            onSaveTemplate() {
                this.$refs['infoForm'].validate((valid) => {
                    if (valid) {
                        let data = this.tableData[0];
                        if (data.area == '') {
                            this.$message({
                                type: 'error',
                                message: '地区不能为空'
                            })
                            return false;
                        }
                        let that = this;
                        this.axios.post('shipper/saveExceptArea', {
                            table: that.tableData,
                            info: that.infoForm
                        }).then((response) => {
                            if (response.data.errno === 0) {
                                this.$message({
                                    type: 'success',
                                    message: '保存成功'
                                });
                                that.getInfo();
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
            onAddTemplate() {
                console.log('哈哈哈');
                this.$refs['infoForm'].validate((valid) => {
                    if (valid) {
                        let data = this.tableData[0];
                        if (data.area == '') {
                            this.$message({
                                type: 'error',
                                message: '地区不能为空'
                            })
                            return false;
                        }
                        let that = this;
                        this.axios.post('shipper/addExceptArea', {
                            table: that.tableData,
                            info: that.infoForm
                        }).then((response) => {
                            if (response.data.errno === 0) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
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
            test() {
                console.log(this.defaultData);
            },
            goBackPage() {
                this.$router.go(-1);
            },
            getAllAreaData() {
                let that = this;
                this.axios.post('shipper/getareadata').then((response) => {
                    if (response.data.errno === 0) {
                        that.areaData = response.data.data;
                    }
                })
            },
            handleRowEdit(index, row) {

                let nowArea = this.tableData[0].area;
                this.selectedArea = nowArea.split(',').map(Number);

                let area = nowArea;
                area = area.split(',');
                let all = this.areaData;

                this.specEditVisible = true;
            },

            getInfo() {
                if (this.infoForm.id <= 0) {
                    return false
                }
                //加载快递公司详情
                let that = this
                this.axios.post('shipper/exceptAreaDetail', {
                    id: that.infoForm.id
                }).then((response) => {
                    // console.log(response.data.data);
                    let info = response.data.data;
                    that.infoForm = info;
                    that.tableData = [{
                        area: info.area,
                        areaName: info.areaName
                    }]
                    // that.tableData = response.data.data.data;
                })
            }

        },
        components: {},
        mounted() {
            this.infoForm.id = this.$route.query.id || 0;
            // console.log(this.infoForm.id);
            this.getInfo();
            this.getAllAreaData();
        }
    }

</script>

<style scoped>
    .number_input {
        width: 90px;
    }

    .money_input {
        width: 100px;
    }

    .el-form-item__content {
        display: flex;
        justify-content: flex-start;
    }

    .line-wrap {
        display: flex;
        justify-content: flex-start;
    }

    .default-freight .el-input {
        width: 130px;
        float: left;
    }

    .default-freight .el-input .el-input__inner {
        width: 100px;
    }

    .default-freight .line {
        display: flex;
        justify-content: flex-start;
        border-right: 1px solid #f1f1f1;
        /*padding-right: 40px;*/
        margin-right: 40px;
    }

    .default-freight .line2 {
        display: flex;
        justify-content: flex-start;
    }

    .default-freight .text {
        width: 60px;
        float: left;
        margin-left: 10px;
    }

    .default-freight .text2 {
        width: 50px;
        float: left;
        /*margin: 10px;*/
    }

    .float-right {
        float: right;
    }

    .add-btn {
        color: #3a8ee6;
        font-size: 14px;
        padding: 20px;
        border: 1px solid #f1f1f1;
        border-top: none;
        display: flex;
        justify-content: space-between;
    }
</style>