<template>
	<view class="animated fadeUp fast">	
		<!-- 已登陆 -->
		<getUserInfo :isRefresh="isRefresh"></getUserInfo>
		<template>
			<view class="my-info u-f-ac">
				<image :src="userInfo.avatarUrl" mode="widthFix"></image>
				<view class="username" @tap="gotoPage">
					<view>{{userInfo.nickName}}</view>
				</view>
				<view class="u-f-ac icon iconfont icon-shuaxin" @tap="refresh"></view>
			</view>
			<profile-list :likeLength="likeLength" :userInfo="userInfo" :playInfo="playInfo"></profile-list>
		</template>
	</view>
</template>

<script>
	import profileList from "../../components/profile/profile-list.vue"
	import getUserInfo from "../../components/common/getUserInfo.vue"
	export default {
		data() {
			return {
				userInfo:{},
				playInfo:{},
				isRefresh:false
			}
		},
		computed:{
			likeLength(){
				let length = this.userInfo.like.length || 0
				console.log(this.userInfo);
				return length 
			}
		},
		methods: {
			refresh(){
				this.isRefresh = true
			}
		},
		onLoad(){
			this.userInfo =  getApp().globalData.userInfo
			this.playInfo =  getApp().globalData.playInfo
			let {like} = this.userInfo
			like.forEach(res => {
				this.$store.dispatch('getVideoUrl',res.vID)
			})
		},
		components:{
			profileList,
			getUserInfo
		}
	}
</script>

<style lang="less" scoped>
	.my-info{
		margin: 20upx;
		image{
			width: 15%;
			margin-right: 20upx;
			flex-shrink: 0;
			border-radius: 100%;
		}
		.username{
			flex: 1;
			>view:first-child{
				font-size: 40upx;
			}
			
		}
		.icon-shuaxin{
			width: 50upx;
			font-size: 40upx;
			margin-right: 20upx;
		}
	}
</style>
