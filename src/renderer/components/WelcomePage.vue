<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item>后台主页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content-main clearfix">
            <div class="notice">
                <div class="l">本演示后台数据为演示数据，可以随意操作，系统每5分钟重置一次</div>
                <div class="r" v-if="resetVision">
                    <label>重置倒计时：</label>
                    <countdown class="count" endTime="" :callback="callback" endText="已经结束了"></countdown>
                </div>
            </div>
            <div class="github">
                <a target="_blank" href="https://github.com/iamdarcy">github地址</a>
                <div class="l">请您在github给个star。 技术交流QQ群：824781955</div>
            </div>
            <div class="header clearfix">
                <el-card class="box-card card-red">
                    <router-link class="link-color" :to="{ path: '/dashboard/order' }">
                        <h1>{{infoData.orderToDelivery}}</h1>
                        <div class="text item">待发货订单</div>
                    </router-link>
                </el-card>
                <el-card class="box-card card-green">
                    <router-link class="link-color" :to="{ path: '/dashboard/goods' }">
                        <h1>{{infoData.goodsOnsale}}</h1>
                        <div class="text item">上架中的商品</div>
                    </router-link>
                </el-card>
                <el-card class="box-card card-black">
                    <router-link class="link-color"  :to="{ path: '/dashboard/user' }">
                        <h1>{{infoData.user}}</h1>
                        <div class="text item">总用户数</div>
                    </router-link>
                </el-card>
            </div>
            <div class="main">
                <el-tabs class="o-tab" v-model="activeName2" type="card" @tab-click="handleClick">
                    <el-tab-pane label="今天" name="first"></el-tab-pane>
                    <el-tab-pane label="昨天" name="second"></el-tab-pane>
                    <el-tab-pane label="最近7天" name="third"></el-tab-pane>
                    <el-tab-pane label="最近30天" name="fourth"></el-tab-pane>
                </el-tabs>
                <div class="tab-content clearfix">
                    <el-card class="box-card2">
                        <div slot="header" class="clearfix">
                            <span style="line-height: 36px;">顾客</span>
                            <el-popover
                                    placement="right"
                                    v-model="related_pop"
                            >
                                <el-tabs class="user-tab" v-model="userTab" type="card" @tab-click="userTabClick">
                                    <el-tab-pane label="新增" name="first"></el-tab-pane>
                                    <el-tab-pane label="老客户" name="second"></el-tab-pane>
                                </el-tabs>
                                <el-table :data="userData" style="width: 100%" height="550" border stripe>
                                    <el-table-column label="头像" width="80">
                                        <template scope="scope">
                                            <img :src="scope.row.avatar" alt="" style="width: 50px;height: 50px">
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="nickname" label="昵称" width="140"></el-table-column>
                                    <el-table-column prop="gender" label="性别" width="50">
                                        <template scope="scope">
                                            {{ scope.row.gender == 2 ? '女' : '男' }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="register_time" label="注册时间" width="170">
                                    </el-table-column>
                                    <el-table-column prop="last_login_time" label="最近登录" width="170">
                                    </el-table-column>
                                </el-table>
                                <el-button class="float-right" slot="reference" size="mini" type="primary" @click="seeClick">查看</el-button>
                            </el-popover>
                        </div>
                        <div class="text item">
                            <span>新增</span>
                            <h3 style="float: right;">{{mainInfo.newUser}}</h3>
                        </div>
                        <div class="text item">
                            <span>老顾客</span>
                            <h3 style="float: right;">{{mainInfo.oldUser}}</h3>
                        </div>
                    </el-card>
                    <el-card class="box-card2">
                        <div slot="header" class="clearfix">
                            <span style="line-height: 36px;">下单</span>
                        </div>
                        <div class="text item">
                            <span>加入购物车</span>
                            <h3 style="float: right;">{{mainInfo.addCart}}</h3>
                        </div>
                        <div class="text item">
                            <span>提交订单数/金额</span>
                            <h3 style="float: right;">{{mainInfo.addOrderNum}} / {{mainInfo.addOrderSum}}</h3>
                        </div>
                    </el-card>
                    <el-card class="box-card2">
                        <div slot="header" class="clearfix">
                            <span style="line-height: 36px;">支付</span>
                        </div>
                        <div class="text item">
                            <span>成交订单数</span>
                            <h3 style="float: right;">{{mainInfo.payOrderNum}}</h3>
                        </div>
                        <div class="text item">
                            <span>成交金额</span>
                            <h3 style="float: right;">{{mainInfo.payOrderSum}}</h3>
                        </div>
                    </el-card>
                </div>
                <div class="line clearfix"></div>
                <div class="block-4 clearfix">
                    <el-card class="box-card">
                        <div class="text item">
                            <span>客单价</span>
                            <p style="float: right;">{{mainInfo.payOrderSum / mainInfo.payOrderNum | numFilter}}</p>
                        </div>
                        <p class="tips">成交金额/成交订单数</p>
                    </el-card>
                    <el-card class="box-card">
                        <div class="text item">
                            <span>下单转化率</span>
                            <p style="float: right;">
                                {{mainInfo.addOrderNum / (mainInfo.newUser + mainInfo.oldUser) | numFilter}}</p>
                        </div>
                        <p class="tips">下单人数/访问人数</p>
                    </el-card>
                    <el-card class="box-card">
                        <div class="text item">
                            <span>下单-支付转化率</span>
                            <p style="float: right;">{{mainInfo.payOrderNum / mainInfo.addOrderNum | numFilter}}</p>
                        </div>
                        <p class="tips">支付人数/下单人数</p>
                    </el-card>
                    <el-card class="box-card">
                        <div class="text item">
                            <span>支付转化率</span>
                            <p style="float: right;">
                                {{mainInfo.payOrderNum / (mainInfo.newUser + mainInfo.oldUser) | numFilter}}</p>
                        </div>
                        <p class="tips">支付人数/访问人数</p>
                    </el-card>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Countdown from './Common/Countdown';
    export default {
        data() {
            return {
                dialogVisible: false,
                infoData: {},
                activeName2: 'first',
                userTab:'first',
                mainInfo: {},
                loginInfo: null,
                username: '',
                label:'',
                userData:[],
                newData:[],
                oldData:[],
                related_pop:false,
                resetVision:true,

            }
        },
        methods: {
            callback(){
                this.resetVision = false;
            },
            seeClick(){
                console.log('????');
            },
            getInfo() {
                this.axios.get('index',).then((response) => {
                    this.infoData = response.data.data;
                })
            },
            handleClick(tab, event) {
                this.related_pop = false;
                this.userTab = 'first';
                console.log(tab._data.index);
                let pindex = tab._data.index;
                console.log('pindex:' + pindex);
                this.getMainInfo(pindex);
            },
            userTabClick(tab, event){
                let pindex = tab._data.index;
                console.log(pindex);
                if(pindex == 0){
                    this.userData = this.newData;
                    console.log(this.userData);
                }
                else{
                    this.userData = this.oldData;
                    console.log(this.userData);
                }
            },
            getMainInfo(index) {
                this.axios.get('index/main', {
                    params: {
                        pindex: index
                    }
                }).then((response) => {
                    this.mainInfo = response.data.data;
                    this.newData = response.data.data.newData;
                    this.oldData = response.data.data.oldData;
                    this.userData = this.newData;
                    console.log(this.mainInfo);
                })
            },
        },
        components: {
            Countdown
        },
        mounted() {
            this.getInfo();
            this.getMainInfo(0);
            if(!this.loginInfo){
                this.loginInfo = JSON.parse(window.localStorage.getItem('userInfo') || null);
                this.username = this.loginInfo.username;
            }
        },

        filters: {
            numFilter(value) {
                let realVal = Number(value).toFixed(2);
                return Number(realVal);
            }
        }
    }
</script>

<style scoped>
    .notice{
        width: 100%;
        height: 60px;
        padding: 30px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background: #ffecd5;
        margin-bottom: 20px;
        font-size: 16px;
        border-radius: 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .github{
        width: 100%;
        height: 60px;
        padding: 30px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background: #f8f8f8;
        margin-bottom: 20px;
        font-size: 16px;
        border-radius: 6px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .notice .r{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .github a{
        margin-right: 20px;
    }
    .count{
        background: #fff;
        padding: 10px;
    }
    .float-right{
        float:right;
    }
    .tips {
        color: #8c939d;
        font-size: 13px;
    }

    .text {
        font-size: 14px;
    }

    .item {
        padding: 10px 0;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
    .tab-content{
        margin-bottom: 20px;
    }
    .box-card {
        width: 32%;
        float: left;
        margin:0 20px 14px 0;
    }

    .box-card:last-child {
        margin-right: 0px;
    }


    .box-card .link-color{
        color: #fff;
    }

    .box-card:last-child {
        margin-right: 0;
    }

    .box-card2 {
        width: 32%;
        float: left;
        margin-right: 17px;
    }

    .box-card2:last-child {
        margin-right: 0;
    }

    .header {
        margin-bottom: 30px;
    }

    .line {
        margin: 20px 0;
        border-top: 1px solid #d1dbe5;
    }

    .card-red {
        background: #e64242;
        border: none;
        color: #fff;
    }

    .card-blue {
        background: #4db3ff;
        border: none;
        color: #fff;
    }
    .card-green{
        background: #11b95c;
        border:none;
        color: #fff;
    }
    .card-black{
        background: #1f2d3d;
        border:none;
        color: #fff;
    }
    .card-gray{
        background: #d1dbe5;
        border:none;

    }
    .card-gray a{
        color: #1f2d3d;
    }
    .card-yellow{
        background: #f8dd66;
        border:none;
        color: #111111;
    }

     .card-yellow .link-color{
        color: #111111;
    }



</style>
