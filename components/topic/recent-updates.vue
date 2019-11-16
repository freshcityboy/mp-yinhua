<template>
	<view class="recent-updates">
		<view>最近更新</view>
		<view class="list u-f-ac">
			<image src="../../static/demo/topicpic/10.jpeg" mode="widthFix" @tap="gotoToopicDetail"></image>
			<view class="artical">
				<view class="title">#你亲生经历的灵异事件#</view>
				<view class="content">走出去才发祥你和别人差的不是一点点</view>
				<view class="info">
					动态 547 今日 120
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			gotoToopicDetail() {
				uni.navigateTo({
					url: '../../pages/topic-detail/topic-detail'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.recent-updates{
		margin: 20upx;
		.list{
			margin: 20upx 0;
			border-bottom: 1px solid #EEEEEE;
			image{
				margin-right: 20upx;
				width: 30%;
				border-radius: 16upx;
			}
			.artical{
				flex: 1;
				.title{
					
					top: 0;
					font-size: 35upx;
				}
				.content,.info{
					color: #CCCCCC;
				}
			}
		}
	}
</style>
