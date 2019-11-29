<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ name: 'freight' }">运费模板</el-breadcrumb-item>
                <el-breadcrumb-item>{{infoForm.id ? '编辑模板' : '添加模板'}}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <el-button type="primary" @click="goBackPage" icon="arrow-left">返回列表</el-button>
                <!--<el-button type="primary" @click="test" icon="arrow-left">测试</el-button>-->
            </div>
        </div>
        <div class="content-main">
            <div class="form-table-box">
                <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
                    <el-form-item label="模板名字" prop="name">
                        <el-input v-model="infoForm.name" placeholder="请输入模板名称" autofocus></el-input>
                    </el-form-item>
                    <el-form-item label="包装费用">
                        <el-input v-model="infoForm.package_price"></el-input>
                    </el-form-item>
                    <el-form-item label="快递收费方式">
                        <el-radio-group v-model="infoForm.freight_type">
                            <el-radio :label="0">按件计费</el-radio>
                            <el-radio :label="1">按重量计费</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="默认运费" class="default-freight">
                        <!--<div class="line-wrap">-->
                        <!--<div class="line">-->
                        <!--<el-input v-model="defaultData.start"></el-input>-->
                        <!--<div class="text">{{infoForm.freight_type == 0?'件内':'KG内'}}</div>-->
                        <!--<el-input v-model="defaultData.start_fee"></el-input>-->
                        <!--<div class="text">元</div>-->
                        <!--</div>-->
                        <!--<div class="line2">-->
                        <!--<div class="text2">每增加</div>-->
                        <!--<el-input v-model="defaultData.add"></el-input>-->
                        <!--<div class="text">{{infoForm.freight_type == 0?'件':'KG'}}</div>-->
                        <!--<div class="text2">增加</div>-->
                        <!--<el-input v-model="defaultData.add_fee"></el-input>-->
                        <!--<div class="text">元</div>-->
                        <!--</div>-->
                        <!--</div>-->

                        <div class="form-table-box">
                            <el-table :data="defaultData" style="width: 100%" border stripe>
                                <el-table-column prop="start" :label="infoForm.freight_type == 0?'首件(个)':'首重(KG)'"
                                >
                                    <template scope="scope">
                                        <el-input size="mini" v-model="scope.row.start" placeholder="个"
                                                  @blur="submitValue(scope.$index, scope.row.start)"
                                                  autofocus></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="start_fee" label="运费(元)">
                                    <template scope="scope">
                                        <el-input size="mini" v-model="scope.row.start_fee" placeholder="运费"
                                                  @blur="submitValue(scope.$index, scope.row.start_fee)"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="add" :label="infoForm.freight_type == 0?'续件(个)':'续重(KG)'"
                                >
                                    <template scope="scope">
                                        <el-input size="mini" v-model="scope.row.add" placeholder="个"
                                                  @blur="submitValue(scope.$index, scope.row.add)"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="add_fee" label="运费(元)">
                                    <template scope="scope">
                                        <el-input size="mini" v-model="scope.row.add_fee" placeholder="运费"
                                                  @blur="submitValue(scope.$index, scope.row.add_fee)"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="free_by_number" label="按件包邮" width="140">
                                    <template scope="scope">
                                        <el-switch v-if="scope.row.free_by_number == 0"
                                                   v-model="scope.row.freeByNumber"
                                                   active-color="#13ce66"
                                                   @change="changeDefaultNumberSwitch(scope.$index, scope.row)">
                                        </el-switch>
                                        <el-input-number v-if="scope.row.free_by_number > 0" class="number_input"
                                                         :min="0" :max="99999" controls-position="right" size="mini"
                                                         v-model="scope.row.free_by_number" placeholder="件"
                                                         @blur="changeDefaultNumberInput(scope.$index, scope.row.free_by_number)"
                                                         @change="changeDefaultNumberInput(scope.$index, scope.row.free_by_number)"
                                        ></el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="free_by_money" label="按金额包邮" width="140">
                                    <template scope="scope">
                                        <el-switch v-if="scope.row.free_by_money == 0"
                                                   v-model="scope.row.freeByMoney"
                                                   active-color="#13ce66"
                                                   @change="changeDefaultMoneySwitch(scope.$index, scope.row)">
                                        </el-switch>
                                        <el-input-number v-if="scope.row.free_by_money > 0" class="money_input" :min="0"
                                                         :max="99999"
                                                         controls-position="right" size="mini"
                                                         v-model="scope.row.free_by_money" placeholder="金额"
                                                         @blur="changeDefaultMoneyInput(scope.$index, scope.row.free_by_money)"
                                                         @change="changeDefaultMoneyInput(scope.$index, scope.row.free_by_money)"
                                        ></el-input-number>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>

                    </el-form-item>
                    <el-form-item label="指定区域运费" class="special-freight">
                        <div class="form-table-box">
                            <el-table :data="tableData" style="width: 100%" border stripe>
                                <el-table-column prop="areaName" label="运送到"></el-table-column>
                                <el-table-column prop="start" :label="infoForm.freight_type == 0?'首件(个)':'首重(KG)'"
                                                 width="90">
                                    <template scope="scope">
                                        <el-input size="mini" v-model="scope.row.start" placeholder="个"
                                                  @blur="submitValue(scope.$index, scope.row.start)"
                                                  autofocus></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="start_fee" label="运费(元)" width="90">
                                    <template scope="scope">
                                        <el-input size="mini" v-model="scope.row.start_fee" placeholder="运费"
                                                  @blur="submitValue(scope.$index, scope.row.start_fee)"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="add" :label="infoForm.freight_type == 0?'续件(个)':'续重(KG)'"
                                                 width="90">
                                    <template scope="scope">
                                        <el-input size="mini" v-model="scope.row.add" placeholder="个"
                                                  @blur="submitValue(scope.$index, scope.row.add)"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="add_fee" label="运费(元)" width="90">
                                    <template scope="scope">
                                        <el-input size="mini" v-model="scope.row.add_fee" placeholder="运费"
                                                  @blur="submitValue(scope.$index, scope.row.add_fee)"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="free_by_number" label="按件包邮" width="120">
                                    <template scope="scope">
                                        <el-switch v-if="scope.row.free_by_number == 0"
                                                   v-model="scope.row.freeByNumber"
                                                   active-color="#13ce66"
                                                   @change="changeNumberSwitch(scope.$index, scope.row)">
                                        </el-switch>
                                        <el-input-number v-if="scope.row.free_by_number > 0" class="number_input"
                                                         :min="0" :max="99999" controls-position="right" size="mini"
                                                         v-model="scope.row.free_by_number" placeholder="件"
                                                         @blur="changeNumberInput(scope.$index, scope.row.free_by_number)"
                                                         @change="changeNumberInput(scope.$index, scope.row.free_by_number)"
                                        ></el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="free_by_money" label="按金额包邮" width="120">
                                    <template scope="scope">
                                        <el-switch v-if="scope.row.free_by_money == 0"
                                                   v-model="scope.row.freeByMoney"
                                                   active-color="#13ce66"
                                                   @change="changeMoneySwitch(scope.$index, scope.row)">
                                        </el-switch>
                                        <el-input-number v-if="scope.row.free_by_money > 0" class="money_input" :min="0"
                                                         :max="99999"
                                                         controls-position="right" size="mini"
                                                         v-model="scope.row.free_by_money" placeholder="金额"
                                                         @blur="changeMoneyInput(scope.$index, scope.row.free_by_money)"
                                                         @change="changeMoneyInput(scope.$index, scope.row.free_by_money)"
                                        ></el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="160">
                                    <template scope="scope">
                                        <el-button size="mini" type="primary" plain
                                                   @click="handleRowEdit(scope.$index, scope.row)">编辑地区
                                        </el-button>
                                        <el-button
                                                @click.native.prevent="deleteRow(scope.$index, tableData)"
                                                type="text"
                                                size="small">
                                            移除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="add-btn">
                            <el-button type="text" @click="add_template">+添加指定地区运费</el-button>
                            <el-form-item>
                                <el-button v-if="infoForm.id" type="danger" class="float-right" @click="onSaveTemplate">
                                    保存模板
                                </el-button>
                                <el-button v-else type="danger" class="float-right" @click="onAddTemplate">保存模板2
                                </el-button>
                            </el-form-item>
                        </div>
                    </el-form-item>

                </el-form>
            </div>
        </div>
        <el-dialog size="tiny" title="设置运送到到区域" :visible.sync="specEditVisible">
            <el-form ref="specForm" class="specFormDialig">
                <el-form-item label="" prop="value" label-width="100px">
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
                value: true,
                nowTableIndex: 0,
                areaData: [],
                selectedArea: [],
                hiddenSelectedArea: [],
                specEditVisible: false,
                infoForm: {
                    id: 0,
                    freight_type: 0,
                    package_price: 0,
                    name: ''
                },
                infoRules: {
                    name: [
                        {required: true, message: '请输入模板名称', trigger: 'blur'},
                    ],
                },
                tableData: [],
                defaultData: [{
                    start: 1,
                    start_fee: 0,
                    add: 1,
                    add_fee: 0,
                    freeByMoney: false,
                    freeByNumber: false,
                    free_by_money: 0,
                    free_by_number: 0,
                }]
            }
        },
        methods: {

            changeDefaultNumberSwitch(index, row) {
                if (row.freeByNumber == true) {
                    this.defaultData[index].free_by_number = 1;
                }
            },
            changeDefaultMoneySwitch(index, row) {
                if (row.freeByMoney == true) {
                    this.defaultData[index].free_by_money = 1;
                }
            },
            changeDefaultNumberInput(index, row) {
                if (row == 0) {
                    this.defaultData[index].freeByNumber = false;
                }
            },
            changeDefaultMoneyInput(index, row) {
                if (row == 0) {
                    this.defaultData[index].freeByMoney = false;
                }
            },

            changeNumberSwitch(index, row) {
                if (row.freeByNumber == true) {
                    this.tableData[index].free_by_number = 1;
                }
            },
            changeMoneySwitch(index, row) {
                if (row.freeByMoney == true) {
                    this.tableData[index].free_by_money = 1;
                }
            },
            changeNumberInput(index, row) {
                if (row == 0) {
                    this.tableData[index].freeByNumber = false;
                }
            },
            changeMoneyInput(index, row) {
                if (row == 0) {
                    this.tableData[index].freeByMoney = false;
                }
            },
            submitValue(index, row) {
                // console.log(row);
                if (row == '' || row < 0) {
                    this.$message({
                        type: 'error',
                        message: '值不能为空或小于零'
                    })
                    return false;
                }
            },
            updateArea() {
                let index = this.nowTableIndex;
                let all = this.areaData;
                let selected = this.selectedArea;
                // console.log(all);
                selected = selected.join(',')
                // console.log(selected);
                // 将area 变成 selected
                this.tableData[index].area = selected;

                let areaName = this.selectedArea;

                // let i = 0;
                // for (const item of areaName) {
                //     all.map((ele) => ele.id == item ? areaName[i] = ele.name : '')
                //     i++;
                // }

                // for (const item in areaName) {
                //     all.map((ele) => ele.id == areaName[item] ? areaName[item] = ele.name : '')
                // }

                let newName = [];
                for (const item in areaName) {
                    all.map((ele) => ele.id == areaName[item] ? newName.push(ele.name) : '')
                }

                // 将areaName 变成selected后等areaName;
                let that = this;
                that.tableData[index].areaName = newName.join(',');
                that.tableData[index].start = 1;
                that.tableData[index].add = 1;
                // console.log(this.tableData[index].areaName);
                console.log('--------');
                console.log(that.tableData[index].area);
                console.log('--------');
                that.specEditVisible = false;
            },
            onSaveTemplate() {
                let name = this.infoForm.name;
                let defa = this.defaultData;

                // console.log(this.tableData);

                if (name == '') {
                    this.$message({
                        type: 'error',
                        message: '名称不能为空'
                    })
                    return false;
                }

                for (const ele of defa) {
                    if (ele.start == 0 || ele.add == 0 || ele.start_fee < 0 || ele.add_fee < 0) {
                        this.$message({
                            type: 'error',
                            message: '值不能为空'
                        })
                        return false;
                    }
                    if (ele.area == '') {
                        this.$message({
                            type: 'error',
                            message: '地区不能为空'
                        })
                        return false;
                    }
                }

                let data = this.tableData;

                for (const ele of data) {

                    if (ele.start == 0 || ele.add == 0 || ele.start_fee < 0 || ele.add_fee < 0) {
                        this.$message({
                            type: 'error',
                            message: '值不能为空'
                        })
                        return false;
                    }
                    if (ele.area == '') {
                        this.$message({
                            type: 'error',
                            message: '地区不能为空'
                        })
                        return false;
                    }
                }

                let that = this;
                this.axios.post('shipper/saveTable', {
                    table: that.tableData,
                    defaultData: that.defaultData,
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
            },

            onAddTemplate() {
                let name = this.infoForm.name;
                let freight_type = this.infoForm.freight_type;

                let defa = this.defaultData;

                // console.log(this.tableData);

                if (name == '') {
                    this.$message({
                        type: 'error',
                        message: '名称不能为空'
                    })
                    return false;
                }

                for (const ele of defa) {
                    if (ele.start == 0 || ele.add == 0 || ele.start_fee < 0 || ele.add_fee < 0) {
                        this.$message({
                            type: 'error',
                            message: '值不能为空'
                        })
                        return false;
                    }
                    if (ele.area == '') {
                        this.$message({
                            type: 'error',
                            message: '地区不能为空'
                        })
                        return false;
                    }
                }

                let data = this.tableData;

                for (const ele of data) {

                    if (ele.start == 0 || ele.add == 0 || ele.start_fee < 0 || ele.add_fee < 0) {
                        this.$message({
                            type: 'error',
                            message: '值不能为空'
                        })
                        return false;
                    }
                    if (ele.area == '') {
                        this.$message({
                            type: 'error',
                            message: '地区不能为空'
                        })
                        return false;
                    }
                }

                let that = this;

                this.axios.post('shipper/addTable', {
                    table: that.tableData,
                    defaultData: that.defaultData,
                    info: that.infoForm
                }).then((response) => {
                    if (response.data.errno === 0) {
                        that.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        that.$router.go(-1);
                    } else {
                        that.$message({
                            type: 'error',
                            message: '添加失败'
                        })
                    }
                })
            },

            deleteRow(index, rows) {

                this.$confirm('确定要删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    rows.splice(index, 1);
                    // this.axios.post('ad/destory', { id: row.id }).then((response) => {
                    //     console.log(response.data)
                    //     if (response.data.errno === 0) {
                    //         this.$message({
                    //             type: 'success',
                    //             message: '删除成功!'
                    //         });
                    //
                    //         this.getList();
                    //     }
                    // })
                });
            },
            test() {
                console.log(this.tableData[0]);
            },
            add_template() {
                let ele = {
                    template_id: '',
                    area: '',
                    start: '',
                    start_fee: '',
                    add: '',
                    add_fee: '',
                    free_by_money: false,
                    free_by_number: false,
                }
                this.tableData.push(ele)
            },
            goBackPage() {
                this.$router.go(-1);
            },
            getAllAreaData() {
                let that = this;
                this.axios.post('shipper/getareadata').then((response) => {
                    if (response.data.errno === 0) {
                        that.areaData = response.data.data;
                        // console.log(that.areaData);
                        // let otherArea =
                        // 建立一个新的组，这个组是所有已选择的地区的组合，每次操作都要去重新变化这个数组
                        // tableData中将数据中的area集合在一起
                        // 然后将这些area的地区从all将已存在的disable，
                        // 从右到左时，应该要将那个值从all中恢复掉


                    }
                })
            },
            handleRowEdit(index, row) {

                // console.log(row.id);
                this.nowTableIndex = index;
                let nowArea = this.tableData[index].area;
                // console.log(nowArea);
                // console.log(typeof(nowArea));
                this.selectedArea = nowArea.split(',').map(Number);

                let table = this.tableData;
                let area = '';
                for (const ele in table) {
                    if (ele != index) {
                        area = table[ele].area + ',' + area;
                    }
                }
                // console.log(area.split(','));
                area = area.split(',');

                let all = this.areaData;

                // tableData中将数据中的area集合在一起
                // 然后将这些area的地区从all将已存在的disabled，

                for (const item of all) {
                    item.disabled = false;
                    for (const ele of area) {
                        if (item.id == ele) {
                            item.disabled = true;
                        }
                    }
                }

                this.specEditVisible = true;
            },

            getAreaData() {
                let that = this
                this.axios.post('shipper/freightdetail', {
                    id: that.infoForm.id
                }).then((response) => {
                    that.infoForm = response.data.data.freight;
                    that.tableData = response.data.data.data;
                    // console.log(this.tableData);
                    // that.defaultData = response.data.data.defaultData;

                })
            },
            getInfo() {
                if (this.infoForm.id <= 0) {
                    return false
                }
                //加载快递公司详情
                let that = this
                this.axios.post('shipper/freightdetail', {
                    id: that.infoForm.id
                }).then((response) => {
                    that.infoForm = response.data.data.freight;
                    that.tableData = response.data.data.data;
                    that.defaultData = response.data.data.defaultData;
                    console.log(that.defaultData);
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