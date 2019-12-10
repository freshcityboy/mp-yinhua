<template>
	<view>
		<view class="list">
			<view v-if="!likes.length">您还没有追番呢</view>
			<block v-for="(item,index) in likes" :key="index">
				<view class="list-item u-f" @tap="gotoVideo(item)">
					<image :src="item.imgUrl" mode="widthFix"></image>
					<view class="right-area">
						<view class="name">{{item.name}}</view>
						<view>已更{{item.recentUpdate}}话</view>
						<view>{{(item.playIndex>=0)?`追至第${item.playIndex + 1}话`:`开始追番吧`}}</view>
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
				
				likes:[]
			}
		},
		onLoad() {
			this.likes =  getApp().globalData.userInfo.like
		},
		onReady() {
			console.log(this.likes);
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
