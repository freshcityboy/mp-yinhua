<template>
	<view>	
		<!-- 已登陆 -->
		<template>
			<view class="my-info u-f">
				<image :src="userInfo.avatarUrl" mode="widthFix"></image>
				<view class="username" @tap="gotoPage">
					<view>{{userInfo.nickName}}</view>
					<view>总访客0 今日0</view>
				</view>
				<view class="u-f-ac icon iconfont icon-jinru"></view>
			</view>
			<!-- 糗事状态 -->
			<!-- <home-state :list="list"></home-state> -->
			<!-- 广告位	 -->
			<!-- <hoeme-advertisement></hoeme-advertisement> -->
			<!-- 功能列表 -->
			<profile-list :likeLength="likeLength" :userInfo="userInfo" :playInfo="playInfo"></profile-list>
		</template>
	</view>
</template>

<script>
	import profileList from "../../components/profile/profile-list.vue"
	export default {
		data() {
			return {
				userInfo:{},
				playInfo:{}
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
			profileList
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
				font-size: 35upx;
			}
			>view:last-child{
				color: #BEBEBE;
				font-size: 20upx;
			}
		}
		.icon-jinru{
			width: 50upx;
		}
	}
</style>
