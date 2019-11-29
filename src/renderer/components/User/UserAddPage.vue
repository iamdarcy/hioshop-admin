<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ name: 'user' }">会员管理</el-breadcrumb-item>
                <el-breadcrumb-item>会员详情</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <el-button type="primary" @click="goBackPage" icon="arrow-left">返回列表</el-button>
            </div>
        </div>
        <div class="content-main">
            <div class="form-table-box">
                <el-table :data="userData" style="width: 100%" border stripe>
                    <el-table-column prop="id" label="ID" width="60">
                    </el-table-column>
                    <el-table-column label="头像" width="80">
                        <template scope="scope">
                            <img :src="scope.row.avatar" alt="" style="width: 50px;height: 50px">
                        </template>
                    </el-table-column>
                    <el-table-column prop="nickname" width="80" label="昵称"></el-table-column>
                    <el-table-column prop="name" width="110" label="姓名">
                        <template scope="scope">
                            <el-input size="mini" v-model="scope.row.name" placeholder="姓名"
                                      @blur="submitName(scope.$index, scope.row)"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" width="160" label="手机">
                        <template scope="scope">
                            <el-input size="mini" v-model="scope.row.mobile" placeholder="手机"
                                      @blur="submitMobile(scope.$index, scope.row)"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="gender" label="性别" width="60">
                        <template scope="scope">
                            {{ scope.row.gender == 2 ? '女' : '男' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="register_time" label="注册时间" width="180"></el-table-column>
                    <el-table-column prop="last_login_time" label="最近登录" width="180"></el-table-column>
                </el-table>
            </div>
            <div class="block-box">
                <div class="block">
                    <div class="text">提交订单数:</div>
                    <div class="num">{{this.dataInfo.orderSum}}笔</div>
                </div>
                <div class="block">
                    <div class="text">成交订单:</div>
                    <div class="num">{{this.dataInfo.orderDone}}笔</div>
                </div>
                <div class="block">
                    <div class="text">消费金额:</div>
                    <div class="num" v-if="this.dataInfo.orderMoney == null">0元</div>
                    <div class="num" v-else>{{this.dataInfo.orderMoney}}元</div>
                </div>
                <div class="block">
                    <div class="text">加入购物车:</div>
                    <div class="num" v-if="this.dataInfo.cartSum == null">0件</div>
                    <div class="num" v-else>{{this.dataInfo.cartSum}}件</div>

                </div>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="订单" name="first"></el-tab-pane>
                <el-tab-pane label="地址管理" name="second"></el-tab-pane>
                <el-tab-pane label="购物车" name="third"></el-tab-pane>
                <el-tab-pane label="足迹" name="fourth"></el-tab-pane>
            </el-tabs>
            <div class="form-table-box" v-if="this.pIndex == 0">
                <div v-for="item in orderData" class="list-wrap clearfix">
                    <div class="header clearfix">
                        <div class="status-text">{{item.order_status_text}}</div>
                        <div class="add-time">{{item.add_time}}</div>
                        <div class="order-id">订单号：{{item.order_sn}}</div>
                        <div class="price-wrap">当前合计{{item.actual_price}}元（含运费{{item.freight_price}}元）</div>
                        <div v-if="item.change_price!= item.actual_price" class="price-change">
                            改价前{{item.change_price}}元
                        </div>
                        <div class="goods-num">共{{item.goodsCount}}件商品</div>
                    </div>
                    <div class="content-wrap clearfix">

                        <div class="left">
                            <div class="goods-list" v-for="iitem in item.goodsList">

                                <img :src="iitem.list_pic_url" class="goods-img">
                                <div class="goods-name">{{iitem.goods_name}}</div>
                                <div class="goods-spec">{{iitem.goods_specifition_name_value}}</div>
                                <div class="goods-number">数量：{{iitem.number}}</div>
                                <div class="goods-number">¥{{iitem.retail_price}}</div>
                            </div>
                        </div>
                        <div class="main">
                            <div class="m1">
                                <div class="user-name">{{item.consignee}}</div>
                                <div class="user-mobile">{{item.mobile}}</div>
                            </div>
                            <div class="user-address">{{item.full_region}}{{item.address}}</div>
                            <div class="user-post">{{item.postscript}}</div>
                        </div>
                        <div class="right">
                            <el-button class="right-detail" type="text" @click="viewDetail(item.order_sn)"
                                       size="mini">
                                查看详情
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="address-wrap" v-if="this.pIndex == 1">
                <div class="coupon-w">
                    <div class="top">
                        <div class="l">
                            <div class="f1" style="width: 100px;">收件人</div>
                            <div class="f1" style="width: 100px;">手机</div>
                            <div class="f1" style="width: 600px;">详细地址</div>
                        </div>
                        <div class="r">操作</div>
                    </div>
                    <div class="bottom" v-for="item in addressData">
                        <div class="l">
                            <div class="f1" style="width: 100px;">{{item.name}}</div>
                            <div class="f1" style="width: 100px;">{{item.mobile}}</div>
                            <div class="f1" style="width: 600px;">{{item.full_region}}</div>
                        </div>
                        <div class="r">
                            <el-button size="small" @click="addressEdit(item)">编辑</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-table-box" v-if="this.pIndex == 2">
                <el-table :data="cartData" style="width: 100%" border stripe>
                    <el-table-column prop="goods_id" label="商品ID" width="100px"></el-table-column>
                    <el-table-column prop="list_pic_url" label="图片" width="70px">
                        <template scope="scope">
                            <img :src="scope.row.list_pic_url" alt="" style="width: 50px;height: 50px">
                        </template>
                    </el-table-column>
                    <el-table-column prop="goods_name" label="商品名称"></el-table-column>
                    <el-table-column prop="goods_specifition_name_value" label="型号"></el-table-column>
                    <el-table-column prop="number" label="数量" width="70px"></el-table-column>
                    <el-table-column prop="retail_price" label="成交价"></el-table-column>
                    <el-table-column prop="add_time" label="加入时间"></el-table-column>
                    <el-table-column prop="is_delete" label="是否删除">
                        <template scope="scope">
                            <label>{{scope.row.is_delete == 1? '已删':''}}</label>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="form-table-box" v-if="this.pIndex == 3">
                <el-table :data="footData" style="width: 100%" stripe>
                    <el-table-column prop="id" label="商品ID" width="100px"></el-table-column>
                    <el-table-column prop="list_pic_url" label="图片" width="70px">
                        <template scope="scope">
                            <img :src="scope.row.list_pic_url" alt="" style="width: 50px;height: 50px">
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="商品名称"></el-table-column>
                </el-table>
            </div>
            <div class="page-box">
                <el-pagination @current-change="handlePageChange" :current-page="page" :page-size="10"
                               layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="修改地址" :visible.sync="dialogAddressVisible">
            <el-form :model="nowAddressData">
                <el-form-item label="所在地区:" label-width="120px">
                    <el-cascader
                            :options="options"
                            placeholder="请选择"
                            v-model="addOptions">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="详细地址:" label-width="120px">
                    <el-input class="el-input" v-model="nowAddressData.address" auto-complete="off"
                              placeholder="请输入详细地"></el-input>
                </el-form-item>
                <el-form-item label="收货人:" label-width="120px">
                    <el-input class="el-input" v-model="nowAddressData.name" auto-complete="off"
                              placeholder="请输入收货人"></el-input>
                </el-form-item>
                <el-form-item label="手机:" label-width="120px">
                    <el-input class="el-input" v-model="nowAddressData.mobile" auto-complete="off"
                              placeholder="请输入收货人手机"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddressVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAddress">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import api from '@/config/api';

    export default {
        data() {
            return {
                loginInfo: null,
                page: 1,
                total: 0,
                filterForm: {
                    name: ''
                },
                tableData: [],
                activeName: 'first',
                pIndex: 0,
                num: 0,
                infoForm: {
                    id: 0
                },
                userData: [],
                addressData: [],
                cartData: [],
                footData: [],
                orderData: [],
                dialogAddressVisible: false,
                nowAddressData: {},
                addOptions: [],
                options: [],
                addValue: {},
                dataInfo: {},
                data_money: [],
                data_sum: [],
                forlist: [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
            }
        },
        methods: {
            saveAddress() {
                this.nowAddressData.addOptions = this.addOptions;
                this.axios.post('user/saveaddress', this.nowAddressData).then((response) => {
                    if (response.data.errno === 0) {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        this.addressData = [];
                        this.getAddress();
                        this.dialogAddressVisible = false;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改失败'
                        })
                    }
                })
            },
            addressEdit(item) {
                this.nowAddressData = item;
                this.addOptions.push(
                    item.province_id,
                    item.city_id,
                    item.district_id,
                )

                this.dialogAddressVisible = true
            },
            viewDetail(index) {
                this.$router.push({name: 'order_detail', query: {order_sn: index}})
            },
            handleClick(tab, event) {
                let pindex = tab._data.index;
                this.page = 1;
                this.total = 0
                if (pindex == 0) {
                    this.pIndex = 0;
                    this.getOrder();
                }
                else if (pindex == 1) {
                    this.pIndex = 1;
                    this.getAddress();
                }
                else if (pindex == 2) {
                    this.pIndex = 2;
                    this.getCartData();
                }
                else if (pindex == 3) {
                    this.pIndex = 3;
                    this.getFootData();
                }
            },
            submitNick(index, row) {
                this.axios.post('user/updateInfo', {id: row.id, nickname: row.nickname}).then((response) => {

                })
            },
            submitName(index, row) {
                this.axios.post('user/updateName', {id: row.id, name: row.name}).then((response) => {
                    if (response.data.errno === 0) {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改失败'
                        })
                    }
                })
            },
            submitMobile(index, row) {
                this.axios.post('user/updateMobile', {id: row.id, mobile: row.mobile}).then((response) => {
                    if (response.data.errno === 0) {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改失败'
                        })
                    }
                })
            },
            handlePageChange(val) {
                this.page = val;
                //保存到localStorage
                localStorage.setItem('thisPage', this.page)
                let pindex = this.pIndex;
                if (pindex == 0) {
                    this.getOrder();
                }
                else if (pindex == 1) {
                    this.getAddress();
                }
                else if (pindex == 2) {
                    this.getCartData();
                }
                else if (pindex == 3) {
                    this.getFootData();
                }
            },
            goBackPage() {
                this.$router.go(-1);
            },
            datainfo() {
                if (this.infoForm.id <= 0) {
                    return false
                }
                let that = this;
                this.axios.get('user/datainfo', {
                    params: {
                        id: that.infoForm.id
                    }
                }).then((response) => {
                    let info = response.data.data;
                    this.dataInfo = info;
                })
            },
            getInfo() {
                if (this.infoForm.id <= 0) {
                    return false
                }
                let that = this;
                this.axios.get('user/info', {
                    params: {
                        id: that.infoForm.id
                    }
                }).then((response) => {
                    let info = response.data.data;
                    this.userData.push(info);
                })
            },
            getOrder() {
                if (this.infoForm.id <= 0) {
                    return false
                }
                let that = this;
                this.axios.get('user/order', {
                    params: {
                        id: that.infoForm.id,
                        page: this.page,
                    }
                }).then((response) => {
                    this.orderData = response.data.data.data;
                    this.page = response.data.data.currentPage;
                    this.total = response.data.data.count
                })
            },
            getAddress() {
                if (this.infoForm.id <= 0) {
                    return false
                }
                let that = this;
                this.axios.get('user/address', {
                    params: {
                        id: that.infoForm.id,
                        page: this.page,
                    }
                }).then((response) => {
                    this.addressData = response.data.data.data;
                    this.page = response.data.data.currentPage;
                    this.total = response.data.data.count;
                })

            },
            getCartData() {
                if (this.infoForm.id <= 0) {
                    return false
                }
                let that = this;
                this.axios.get('user/cartdata', {
                    params: {
                        id: that.infoForm.id,
                        page: this.page,
                    }
                }).then((response) => {
                    this.cartData = response.data.data.data;
                    this.page = response.data.data.currentPage;
                    this.total = response.data.data.count
                })
            },
            getFootData() {
                if (this.infoForm.id <= 0) {
                    return false
                }
                let that = this
                this.axios.get('user/foot', {
                    params: {
                        id: that.infoForm.id,
                        page: this.page,
                    }
                }).then((response) => {
                    this.footData = response.data.data.data
                    this.page = response.data.data.currentPage
                    this.total = response.data.data.count
                })
            },
            getAllRegion() {
                let that = this;
                this.axios.get('order/getAllRegion').then((response) => {
                    this.options = response.data.data;
                })
            },
        },
        components: {},
        mounted() {
            this.infoForm.id = this.$route.query.id || 0;
            this.getInfo();
            this.getOrder();
            this.datainfo();
            this.getAllRegion();
            // this.root = api.rootUrl;
            if (!this.loginInfo) {
                this.loginInfo = JSON.parse(window.localStorage.getItem('userInfo') || null);
            }
        }
    }

</script>

<style>
    .form-table-box {
        margin-bottom: 20px;
    }

    .addr-w {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f1f1f1;
    }

    .addr-w .l {
        display: flex;
        justify-content: flex-start;
    }

    .addr-w .l .f1 {
        min-width: 100px;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        margin-right: 20px;
    }

    .addr-w .r {
        min-width: 100px;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        text-align: center;
    }

    .coupon-w {
        display: flex;
        flex-direction: column;
    }

    .coupon-w .top {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f1f1f1;
        color: #888;
    }

    .coupon-w .bottom {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f1f1f1;

    }

    .coupon-w .l {
        display: flex;
        justify-content: flex-start;
    }

    .coupon-w .l .f1 {
        min-width: 100px;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        margin-right: 20px;
    }

    .coupon-w .r {
        min-width: 100px;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        text-align: center;
    }

    .list-wrap {
        width: 100%;
        border: 1px solid #dfe5ed;
        margin-bottom: 10px;
    }

    .goods-img {
        width: 40px;
        height: 40px;
    }

    .list-wrap .header {
        width: 100%;
        height: 40px;
        background-color: rgba(236, 245, 255, 0.51);
        line-height: 40px;
        color: #1f2d3d;
        font-size: 13px;
        padding: 0 10px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .status-text {
        float: left;
        color: #f0797f;
        margin-right: 10px;
    }

    .add-time {
        float: left;
        margin-right: 20px;
    }

    .order-id {
        float: left;
    }

    .goods-num {
        float: right;
        margin-right: 20px;
    }

    .price-wrap {
        float: right;
        margin-right: 20px;
    }

    .edit-wrap {
        float: right;
        margin-top: 5px;
    }

    .price-change {
        float: right;
        margin-right: 10px;
        color: #e64242;
    }

    .content-wrap {
        width: 100%;
        display: flex;
        justify-content: flex-start;
    }

    .content-wrap .left {
        width: 50%;
        border-right: 1px solid #d1dbe5;
        padding: 10px;
    }

    .content-wrap .main {
        width: 40%;

        border-right: 1px solid #d1dbe5;
        padding: 20px 10px;
    }

    .content-wrap .right {
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .right .right-detail {
        margin-left: 0;
        margin-top: 6px;
    }

    .goods-list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .goods-name {
        color: #5e7382;
        font-size: 14px;
        margin-right: 20px;
        width: 200px;
    }

    .goods-spec {
        color: #0066cc;
        font-size: 14px;
        margin-right: 30px;
    }

    .goods-number {
        color: #000000;
        font-size: 14px;
        margin-right: 20px;
    }

    .m1 {
        display: flex;
        justify-content: flex-start;
    }

    .user-name {
        color: #000000;
        font-size: 14px;
        margin-right: 10px;
        line-height: 20px;
    }

    .user-mobile {
        color: #000000;
        font-size: 14px;
        line-height: 20px;
        margin-right: 20px;
    }

    .user-address {
        color: #333;
        font-size: 13px;
        line-height: 20px;
    }

    .user-post {
        color: #333;
        font-size: 14px;
        line-height: 20px;
        margin-top: 4px;
        background-color: #e6e3b8;
    }

    .block-box {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .block-box .block {
        display: flex;
        justify-content: flex-start;
        background: #fafafa;
        align-items: center;
        border: 1px solid #f1f1f1;
        padding: 40px;
        width: 24%;
        box-sizing: border-box;
        box-shadow: 1px 4px 4px #f1f1f1;
    }

    .block-box .a-block {
        display: flex;
        background: #fdf6ec;
        flex-direction: column;
        border: 1px solid #f1f1f1;
        padding: 20px;
        width: 160px;
    }

    .a-block .text {
        font-size: 20px;
    }

    .a-block .time .label1 {
        margin-right: 10px;
    }

    .a-block .time {
        font-size: 12px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .block .text {
        font-size: 14px;
        color: #888;
        margin-right: 10px;
    }

    .block .num {
        color: #222;
        font-size: 18px;
    }
</style>
