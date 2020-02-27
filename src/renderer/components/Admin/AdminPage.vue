<template>
	<div class="content-page">
		<div class="content-nav">
			<el-breadcrumb class="breadcrumb" separator="/">
				<el-breadcrumb-item>管理员</el-breadcrumb-item>
			</el-breadcrumb>
			<!-- <div class="operation-nav">
				<router-link to="/dashboard/user">
					<el-button type="primary" icon="plus">添加管理员</el-button>
				</router-link>
			</div> -->
		</div>
		<div class="content-main">
			<div class="form-table-box">
				<el-table :data="tableData" style="width: 100%" border stripe>
					<el-table-column prop="id" label="ID" width="60"></el-table-column>
					<el-table-column prop="username" label="会员名称"></el-table-column>
					<el-table-column prop="last_login_time" label="最近登录" width="200"></el-table-column>
					<el-table-column prop="last_login_ip" label="登录IP" width="200"></el-table-column>
					<el-table-column label="操作" width="180">
						<template scope="scope">
							<el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button v-if="scope.row.id != loginInfo.id" plain size="small" type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除</el-button>
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
			page: 1,
			total: 0,
			filterForm: {
				username: ''
			},
			tableData: [],
            loginInfo:null,
		}
	},
	methods: {

		handleRowEdit(index, row) {
			this.$router.push({ name: 'admin_add', query: { id: row.id } })
		},
		handleRowDelete(index, row) {
			console.log(row);
			this.$confirm('确定要删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.axios.post('admin/deleAdmin', { id: row.id }).then((response) => {
					console.log(response.data);
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
			this.axios.get('admin').then((response) => {
                this.tableData = response.data.data;
				console.log(this.tableData);
			})
		}
	},
	components: {
	},
	mounted() {
		this.getList();
        if(!this.loginInfo){
            this.loginInfo = JSON.parse(window.localStorage.getItem('userInfo') || null);
        }
	}
}

</script>

<style scoped>

</style>
