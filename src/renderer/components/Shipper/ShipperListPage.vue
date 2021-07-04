<template>
	<div class="content-page">
		<div class="content-nav">
			<el-breadcrumb class="breadcrumb" separator="/">
				<el-breadcrumb-item :to="{ name: 'shipper' }">快递设置</el-breadcrumb-item>
				<el-breadcrumb-item>快递列表</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="operation-nav">
				<el-button plain type="primary" @click="addShipper" icon="arrow-left">添加快递</el-button>
				<el-button @click="goBackPage" icon="arrow-left">返回</el-button>
			</div>
		</div>
		<div class="content-main">
			<div class="filter-box">
				<el-form :inline="true" :model="filterForm" class="demo-form-inline">
					<el-form-item label="快递公司">
						<el-input v-model="filterForm.name" placeholder="搜索快递公司"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmitFilter">查询</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="form-table-box">
				<el-table :data="tableData" style="width: 100%" border stripe>
					<el-table-column prop="id" label="ID" width="100px">
					</el-table-column>
					<el-table-column prop="name" label="名字" width="220">
					</el-table-column>
					<el-table-column prop="code" label="代号" width="220">
					</el-table-column>
					<el-table-column prop="sort_order" label="排序" width="220">
					    <template scope="scope">
					        <el-input-number class="sort-width" size="mini" :min="1" :max="100" controls-position="right" v-model="scope.row.sort_order" placeholder="排序" @blur="submitSort(scope.$index, scope.row)" @change="submitSort(scope.$index, scope.row)"></el-input-number>
					    </template>
					</el-table-column>
					<el-table-column label="使用" width="80">
					    <template scope="scope">
					        <el-switch
					                v-model="scope.row.enabled"
					                active-text=""
					                inactive-text=""
					                @change='changeStatus($event,scope.row.id)'>
					        </el-switch>
					    </template>
					</el-table-column>
					<el-table-column label="操作">
						<template scope="scope">
							<el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button size="small" type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="page-box">
				<el-pagination @current-change="handlePageChange" :current-page="page" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			page: 1,
			total: 0,
			filterForm: {
				name: ''
			},
			tableData: []
		}
	},
	methods: {
		submitSort(index, row){
		    this.axios.post('shipper/updateSort', { id: row.id,sort:row.sort_order }).then((response) => {})
		},
        goBackPage() {
            this.$router.go(-1);
        },
		handlePageChange(val) {
			this.page = val;
			//保存到localStorage
			localStorage.setItem('shipperPage', this.page)
			localStorage.setItem('shipperFilterForm', JSON.stringify(this.filterForm));
			this.getList()
		},
		addShipper() {
			this.$router.push({ name: 'shipper_add', query: { id: 0 } })
		},
		handleRowEdit(index, row) {
			this.$router.push({ name: 'shipper_add', query: { id: row.id } })
		},
		handleRowDelete(index, row) {
			this.$confirm('确定要删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.axios.post('shipper/destory', { id: row.id }).then((response) => {
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
		onSubmitFilter() {
			this.page = 1
			this.getList()
		},
		getList() {
			this.axios.get('shipper/list', {
				params: {
					page: this.page,
					name: this.filterForm.name
				}
			}).then((response) => {
                this.tableData = response.data.data.data
                this.page = response.data.data.currentPage
                this.total = response.data.data.count
				console.log(this.tableData)
				for(const item of this.tableData){
					item.enabled = item.enabled?true:false
				}
			})
		},
		changeStatus($event, para) {
		    this.axios.get('shipper/enabledStatus', {
		        params: {
		            status: $event,
		            id: para
		        }
		    }).then((response) => {
				this.$message({
					type: 'success',
					message: '更新成功!'
				});
		    })
		},
	},
	components: {

	},
	mounted() {
		this.getList();
	}
}

</script>

<style scoped>

</style>
