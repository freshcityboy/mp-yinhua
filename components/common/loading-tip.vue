<!-- 需要父组件调用changeLoadingText() 方法 -->
<template>
	<view>
		<view class="loading">{{loadingText}}</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				loadingText: '上拉加载更多'
			}
		},
		methods: {
			changeLoadingText() {
				if(this.loadingText !== '上拉加载更多'){
					return
				}
				this.loadingText = "正在加载中..."
				// 请求数据
				setTimeout(() => {
					
				this.loadingText = "加载完毕"
				// 根据请求结果判断
				// this.loadingText = "没有更多了"
				},1000)
			
			}
		}
	}
</script>

<style lang="less">
	.loading{
		text-align: center;
		font-size: 30upx;
	}
</style>
