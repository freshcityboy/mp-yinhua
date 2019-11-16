<template>
	<view>
		<button hover-class="active" type="primary"  @tap="update('getWeekList')">一键更新周更列表信息</button>
		<button hover-class="active" type="primary" @tap="update('doWeekUpdate')">一键更新周更视频播放地址</button>
		<view class="add">
			<input type="text" v-model="vID" placeholder="请输入新番的vID"/>
			<checkbox-group @change="change">
				<label>
					<checkbox :checked="isAddRecommend" />是否添加到好番推荐
				</label>
			</checkbox-group>
		</view>
		<button hover-class="active"  type="primary" @tap="add">添加新番</button>
	</view>
</template>

<script>
	import api from "../../api/index.js"
	const {reqVideoUrl} = api
	export default {
		data() {
			return {
				vID:'',
				isAddRecommend: true
			}
		},
		methods: {
			change(){
				this.isAddRecommend = !this.isAddRecommend
			},
			update(name){
				wx.cloud.callFunction({ // 调用云函数读取用户信息
				  // 要调用的云函数名称
				  name,
				  success: res => { 
					  uni.showModal({
					  	title: '更新成功' 
						
					  })
				  },
				  fail: err => {
					uni.showModal({
						title:'更新失败',
						showCancel:false
					})
				  }
				})	
			},
			add(){
				if(this.vID === ''){
					uni.showToast({
						title:'请输入vID'
					})
					return
				}
				let length = 0
				reqVideoUrl(this.vID).then(res => { // 判断一下 是否已经添加
					if(res.length) {
						uni.showToast({
							title:'此番已经添加了哦'
						})
						return 	
					} 
					wx.cloud.callFunction({ // 调用云函数读取用户信息
					  // 要调用的云函数名称
					  name: 'addOneVideo',
					  data:{
						  vID: this.vID,
						  isAddRecommend: this.isAddRecommend
					  },
					  success: res => { 
						  uni.showModal({
						  	title: '更新成功' ,
							showCancel:false
						  })
					  },
					  fail: err => {
						  console.log(err);
						uni.showModal({
							title:'更新失败' ,
							showCancel:false
						})
					  }
					})	
				})
				
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	button{
		background: $self-color-main;
		margin: 20upx;
		&.active{
			background: #007AFF;
		}
	}
	.add{
		font-size: 40upx;
		margin: 20upx;
		input{
			border: 1px solid $self-color-gray;
			margin: 20upx 0;
			height: 80upx;
			box-sizing: border-box;
			padding: 0 20upx;
			border-radius: 10upx;
			box-shadow: 1px 1px 1px $self-color-gray;
		}
	}
</style>
