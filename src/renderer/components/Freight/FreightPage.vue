<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item>快递模板</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <!--<el-button icon="plus" @click="expressList">快递列表</el-button>-->
                <el-button icon="plus" @click="exceptareaList">偏远地区</el-button>
                <el-button type="primary" icon="plus" @click="addFreightTemplate">添加快递模板</el-button>
            </div>
        </div>
        <div class="content-main">
            <div class="form-table-box">
                <el-table :data="tableData" style="width: 100%" border stripe>
                    <el-table-column prop="id" label="ID" width="100px"></el-table-column>
                    <el-table-column prop="name" label="名字"></el-table-column>
                    <el-table-column prop="package_price" label="包装费"></el-table-column>
                    <el-table-column prop="freight_type" label="按件/按重" width="200">
                        <template scope="scope">
                            {{ scope.row.freight_type == 0 ? '按件' : '按重' }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="170">
                        <template scope="scope">
                            <el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="small" type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            expressList(){
                this.$router.push({name: 'shipper'});
            },
            exceptareaList(){
                this.$router.push({name: 'except_area'});
            },
            addFreightTemplate(){
                this.$router.push({name: 'freight_add'});
            },
            handleRowEdit(index, row) {
                this.$router.push({name: 'freight_add', query: {id: row.id}})
            },
            handleRowDelete(index, row) {
                this.$confirm('确定要删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.post('shipper/destory', {id: row.id}).then((response) => {
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
                this.axios.get('shipper/freight').then((response) => {
                    console.log(response);
                    this.tableData = response.data.data
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
