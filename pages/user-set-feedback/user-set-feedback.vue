<template>
	<view>
		<uni-collapse :accordion="true">
			<uni-collapse-item v-for="item in accordion" :key="item.id" :title="item.title" :show-animation="item.animation">
				<view class="content">{{ item.content }}</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		data() {
			return {
				accordion: [{
						id: 0,
						title: '客服什么时候在线',
						content: '亲爱的糗友，客服上线时间为：周一至周六10:00-18:00，非工作时间的咨询会转成留言，客服上线后会第一时间给您答复哦',
						animation: true
					},
					{
						id: 1,
						title: '忘记账号/密码',
						content: '哈哈哈',
						animation: true
					},
					{
						id: 2,
						title: '标题文字',
						content: '手风琴效果',
						animation: true
					}
				],
			}
		},
		methods: {
			
		},
		onNavigationBarButtonTap(e) {
			if(e.index === 0){
				uni.navigateBack({
					delta:1
				})
			}
		},
		components:{
			uniCollapse,
			uniCollapseItem
		}	
	}
</script>

<style lang="less" scoped>
	.uni-collapse-cell--open{
		background: #FEE933;
	}
	.content{
		margin: 40upx;
	}
</style>
