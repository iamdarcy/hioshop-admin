<!-- <template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
                <el-breadcrumb-item>轮播图顺序</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <el-button size="small" type="primary" @click="onSubmitInfo">确定保存</el-button>
                <el-button size="small" @click="goBackPage" icon="arrow-left">返回列表</el-button>
            </div>
        </div>
        <div class="content-main">
            <el-form ref="infoForm" :model="infoForm">
                <el-form-item class="in-wrap" label="图片" v-for="item in infoForm.data">
                    <img class="img-wrap" :src="item.img_url" />
                    <el-input class="input-wrap" type="number" size="small" v-model="item.sort_order"
                              placeholder=""></el-input>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template> -->

<template>
	<div class="com-image-drag">
		<div class="button-list">
			<el-button @click="openDrag" v-if="!drag_open" :disabled="banner_list.length <= 1" type="text" size="small" class="operation-success"></el-button>
			<el-button @click="save" v-if="drag_open" type="text" size="small" class="operation-success"></el-button>
			<el-button @click="cancle" v-if="drag_open" type="text" size="small" class="operation-error"></el-button>
		</div>
		<div class="image-list">
			<!-- 拖拽层 -->
			<div class="list-wrap">
				<draggable v-model="banner_list" :options="{
					animation: 150,
					ghostClass: 'sortable-ghost',
					chosenClass: 'chosenClass',
					scroll: true,
					scrollSensitivity: 200
				  }">
				<div class="image-item" v-for="($item, $index) in banner_list" :key="$index" :style="{ backgroundImage: `url(${$item.url})` }"></div>
				</draggable>
			</div>
			<!-- 展示层 -->
			<div class="list-wrap" v-show="!drag_open">
				<div class="image-item" v-for="($item, $index) in banner_list" :key="$index" :style="{ backgroundImage: `url(${$item.url})` }"
				 @mouseover.prevent="$item.is_hover = true" @mouseleave.prevent="$item.is_hover = false">
					<div class="label" v-show="!$item.is_hover">
						<i class="el-icon-upload-success el-icon-check icon-success"></i>
					</div>
				</div>
				<el-upload list-type="picture-card" name="file" class="upload-machine" :disabled="drag_open" action="https://up.qiniu.com/"
				 :on-success="onSuccess" :before-upload="beforeUpload" :show-file-list="false" :multiple="multiple" enctype="multipart/form-data"></el-upload>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/config/api';
	import draggable from "vuedraggable";
	export default {
		props: {
			list: {
				type: Array
			},
			limit: {
				type: Number,
				default: 0
			},
			multiple: {
				type: Boolean,
				default: false
			},
			action: {
				type: Function,
				default: () => {}
			},
			beforeUpload: {
				type: Function,
				default: () => {}
			},
			onError: {
				type: Function,
				default: () => {}
			},
			onSuccess: {
				type: Function,
				default: () => {}
			}
		},
		data() {
			return {
				banner_list: [], //拖拽插件不建议直接改变父组件的传值，所以另建一个新数组
				file_list: [], //保存开启拖拽之前排序的数组
				drag_open: false, //拖拽开启开关,
				infoForm: {}
			}
		},
		methods: {
			// goBack(){
			// 	this.$router.push({name: 'goods_add', query: {id: infoForm.id}})
			// },
			//          test() {
			//              console.log(this.infoForm);
			//          },
			//          onSubmitInfo() {
			//              this.axios.post('goods/galleryEdit', this.infoForm).then((response) => {
			//                  if (response.data.errno === 0) {
			//                      this.$message({
			//                          type: 'success',
			//                          message: '保存成功'
			//                      });
			//                  } else {
			//                      this.$message({
			//                          type: 'error',
			//                          message: '保存失败'
			//                      })
			//                  }
			//              })
			//          },
			//          goBackPage() {
			//              this.$router.go(-1);
			//          },
			//          getInfo() {
			//              console.log(this.infoForm.id)
			//              if (this.infoForm.id <= 0) {
			//                  return false
			//              }
			//              let that = this
			//              this.axios.get('goods/galleryList', {
			//                  params: {
			//                      id: that.infoForm.id
			//                  }
			//              }).then((response) => {
			//                  console.log(response.data);
			//                  that.infoForm = response.data;
			//              })
			//          }

			getInfo() {
				console.log(this.infoForm.id)
				if (this.infoForm.id <= 0) {
					return false
				}
				let that = this
				this.axios.get('goods/galleryList', {
					params: {
						id: that.infoForm.id
					}
				}).then((response) => {
					console.log(response.data);

					that.infoForm = response.data;
					// console.log(api)
					that.banner_list = that.infoForm.data.map(function(v) {
						let obj = {
							url: v.img_url,
							is_hover: false
						};
						return obj;
					});
				})
			},

			// 开启拖拽
			openDrag() {
				this.file_list = JSON.parse(JSON.stringify(this.banner_list)); //数组深拷贝
				this.drag_open = true;
			},
			// 取消拖拽
			cancle() {
				this.banner_list = this.file_list;
				this.drag_open = false;
			},
			// 拖拽保存
			save() {
				this.drag_open = false;
			}
		},
		components: {
			draggable
		},
		mounted() {
			this.infoForm.id = this.$route.query.id || 0;
			this.getInfo();

		}
	}
</script>

<style scoped>
	.image-item{
		width: 200px;
		height: 200px;
	}
	.in-wrap {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-left: 0;
	}

	.img-wrap {
		float: left;
		width: 100px;
		height: 100px;
	}

	.input-wrap {
		width: 100px;
		float: left;
		margin-left: 30px;
		margin-top: 30px;
	}
</style>
