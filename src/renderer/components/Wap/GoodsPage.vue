<template>
    <div class="wrap">
        <div class="main">
            <el-tabs class="tabs-wrap" v-model="activeName" @tab-click="handleClick">
                <!--<el-tab-pane label="全部商品" name="first">-->
                <!--</el-tab-pane>-->
                <el-tab-pane label="出售中" name="second"></el-tab-pane>
                <!--<el-tab-pane label="已售完" name="third"></el-tab-pane>-->
                <el-tab-pane label="已下架" name="fourth"></el-tab-pane>
            </el-tabs>
            <div class="form-table-box">
                <el-table :data="tableData" style="width: 100%" stripe>
                    <el-table-column prop="list_pic_url" label="图片" width="80">
                        <template scope="scope">
                            <img :src="scope.row.list_pic_url" alt="" style="width: 60px;height: 60px">
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="商品名称">
                    </el-table-column>
                    <el-table-column prop="retail_price" label="售价" width="90" sortable>
                        <template scope="scope">
                            <el-input v-model="scope.row.retail_price" placeholder="售价"
                                      @blur="submit(scope.$index, scope.row)"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="上架" width="60">
                        <template scope="scope">
                            <el-switch
                                    v-model="tableData[scope.$index].is_on_sale"
                                    active-text=""
                                    inactive-text=""
                                    @change='changeStatus($event,tableData[scope.$index].goods_id)'>
                            </el-switch>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
        </div>

    </div>
</template>
<script>
    import api from '@/config/api';

    export default {
        data() {
            return {
                page: 1,
                total: 0,
                filterForm: {
                    name: ''
                },
                tableData: [],
                activeName: 'second',
                pIndex: 0,
                num: 0,
                activeClass: 0,
            }
        },
        components: {},
        methods: {
            submit(index, row) {
                this.axios.post('wap/updatePrice', {
                    id: row.goods_id,
                    sn: row.goods_sn,
                    price: row.retail_price
                }).then((response) => {

                })
            },
            changeStatus($event, para) {
                this.axios.get('goods/saleStatus', {
                    params: {
                        status: $event,
                        id: para
                    }

                }).then((response) => {
                    this.getList();
                })
            },
            logout() {
                this.$confirm('是否要退出?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    localStorage.clear();
                    this.$router.replace({name: 'login'});
                });
            },
            handleClick(tab, event) {
                let pindex = tab._data.index;
                this.activeClass = 0;
                if (pindex == 0) {
                    this.getOnSaleList();
                    this.pIndex = 0;
                }
                else if (pindex == 1) {
                    this.getOutSaleList();
                    this.pIndex = 1;
                }
            },
//            getList() {
//                this.axios.get('wap').then((response) => {
//                    console.log(response.data)
//                    this.tableData = response.data.data
//                })
//            },
            getOnSaleList() {
                this.axios.get('wap/onsale').then((response) => {
                    console.log(response.data)
                    this.tableData = response.data.data
                })
            },
            getOutSaleList() {
                this.axios.get('wap/drop').then((response) => {
                    console.log(response.data)
                    this.tableData = response.data.data
                })
            },
        },
        mounted() {
            this.getOnSaleList();
            this.root = api.rootUrl;
        }
    }
</script>
<style scoped>
    .tabs-wrap {
        padding: 0 10px;
    }

    .main {
        padding: 50px 0;
    }

    .top {
        width: 100%;
        background: #233445;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .top img {
        width: 40px;
        height: 40px;
    }

    .top .menu {
        width: 100px;
        display: flex;
        justify-content: flex-end;
    }

    .menu .menu-item {
        margin: 0 15px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 20px;
        color: #fff;
    }

    .menu-item a {
        color: #fff;
    }

    .wrap {
        background: #fff;
    }

    .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .el-card {
        width: 46%;
        box-shadow: none !important;
    }

</style>