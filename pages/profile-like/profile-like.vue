<template>
	<view>
		<view class="list">
			<view>您还没有追番呢</view>
			<block v-for="(item,index) in likes" :key="index">
				<view class="list-item u-f" @tap="gotoVideo(item)">
					<image :src="item.imgUrl" mode="widthFix"></image>
					<view class="right-area">
						<view class="name">{{item.name}}</view>
						<view>已更{{item.recentUpdate}}话</view>
						<view>看到第{{item.palyIndex + 1}}话</view>				
					</view>
				</view>	
			</block>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// item:{ 
				// 	    "_id" : "5dc5481428ca0117bbdcf2e8", 
				// 	    "vID" : "318", 
				// 	    "name" : "黑色五叶草", 
				// 	    "nation" : "日本", 
				// 	    "style" : [
				// 	        "冒险", 
				// 	        "奇幻"
				// 	    ], 
				// 	    "year" : "2016", 
				// 	    "language" : "日语", 
				// 	    "recentUpdate" : "108", 
				// 	    "updateTime" : "18:25", 
				// 	    "updateDay" : 1, 
				// 	    "info" : "《黑色五叶草》讲述改编自田畠裕基原作漫画。在一个魔法等於一切的世界里，身为孤儿的亚斯塔虽然天生就没有魔力，但仍毫不怠懈地努力锻鍊自己。他和同为孤儿的好友尤诺立志要一起竞争魔法帝的宝座。在魔法书授与仪式中，尤诺得到了传说中的四叶魔导书，而亚斯塔则得到了反魔法的五叶魔导书。之後两人还一起去参加魔法骑士团的入团考试，亚斯塔在历经一番波折後，总算是成为「黑色暴牛骑士团」的一员", 
				// 	    "imgUrl" : "http://p.xiaomingming.org/FileUpload/20171041463530516.jpg"
				// }
				likes:[]
			}
		},
		onLoad() {
			this.likes =  getApp().globalData.userInfo.like
		},
		methods: {
			gotoVideo(item){
				uni.navigateTo({
					url:'../everyday-list-detail/everyday-list-detail?item='+ JSON.stringify(item)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		.list-item{
			margin: 10upx 30upx;
			border-bottom:1px solid $self-color-gray;
			padding-bottom: 20upx;
			image{
				width: 150upx;
				flex-shrink: 0;
				border-radius: 8upx;
			}
			.right-area{
				color: $self-color-word;
				margin: 0 20upx;
				.name{
					font-size: 35upx;
					color: #000000;
				}
			}
			
		}
	}
</style>
