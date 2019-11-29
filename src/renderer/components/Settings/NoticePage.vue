<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item>公告管理</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <div style="margin-left:10px;"></div>
                <el-button type="primary" icon="plus" @click="addNotice">添加公告</el-button>
            </div>
        </div>
        <div class="content-main">
            <div class="form-table-box">
                <el-table :data="tableData" style="width: 100%" border stripe>
                    <el-table-column prop="id" label="ID" width="60"></el-table-column>
                    <el-table-column prop="content" label="内容"></el-table-column>
                    <el-table-column prop="end_time" label="结束时间" width="180"></el-table-column>
                    <el-table-column prop="enabled" label="状态" width="110px">
                        <template scope="scope">
                            {{ scope.row.is_delete == 0 ? '启用中' : '已到期下线' }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="220px">
                        <template scope="scope">
                            <el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button plain size="small" type="danger"
                                       @click="handleRowDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog :title="is_add? '添加':'编辑'" :visible.sync="dialog">
            <el-form :model="noticeData">
                <el-form-item label="内容:" label-width="120px">
                    <el-input class="el-input" v-model="noticeData.content" auto-complete="off"
                              placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="到期时间:" label-width="120px">
                    <el-date-picker
                            v-model="noticeData.time"
                            type="datetime"
                            placeholder="选择日期时间"
                            default-time="23:59:59">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog = false">取 消</el-button>
                <!--<el-button @click="test">取 消</el-button>-->
                <el-button type="primary" @click="goNotice" v-if="is_add">确定添加</el-button>
                <el-button type="primary" @click="updateNotice" v-if="!is_add">确定修改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                tableData: [],
                noticeData: {
                    time:''
                },
                dialog: false,
                is_add: false,

            }
        },
        methods: {
            test(){
              console.log(this.noticeData);
            },
            updateNotice() {
                console.log(this.noticeData);
                if(this.noticeData.content == ''){
                    this.$message({
                        type: 'error',
                        message: '内容不能为空'
                    })
                    return false;
                }
                else if(this.noticeData.time == null){
                    this.$message({
                        type: 'error',
                        message: '过期时间不能为空'
                    })
                    return false;
                }
                this.axios.post('notice/update', this.noticeData).then((response) => {
                    if (response.data.errno === 0) {
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        this.getList();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '添加失败'
                        })
                    }
                })
                this.dialog = false;
            },
            goNotice() {
                console.log(this.noticeData);
                if(this.noticeData.content == ''){
                    this.$message({
                        type: 'error',
                        message: '内容不能为空'
                    })
                    return false;
                }
                else if(this.noticeData.time == null){
                    this.$message({
                        type: 'error',
                        message: '过期时间不能为空'
                    })
                    return false;
                }
                this.axios.post('notice/add', this.noticeData).then((response) => {
                    if (response.data.errno === 0) {
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        this.getList();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '添加失败'
                        })
                    }
                })
                this.dialog = false;
            },
            addNotice() {
                this.dialog = true;
                this.is_add = true;
            },
            handleRowEdit(index, row) {
                this.noticeData.time = row.end_time;
                this.noticeData.content = row.content;
                this.noticeData.id = row.id;
                this.dialog = true;
                this.is_add = false;
            },
            submitContent(index, row) {
                this.axios.post('notice/updateContent', {id: row.id, content: row.content}).then((response) => {

                })
            },
            handleRowDelete(index, row) {
                this.$confirm('确定要删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.axios.post('notice/destory', {id: row.id}).then((response) => {
                        console.log(response.data)
                        if (response.data.errno === 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });

                            this.getList();
                        }
                    })


                });
            },
            getList() {
                this.axios.get('notice').then((response) => {
                    this.tableData = response.data.data;
                })
            }
        },
        components: {},
        mounted() {
            this.getList();
        }
    }

</script>

<style scoped>

</style>
