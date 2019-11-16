<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		//点击搜索框上的按钮触发的事件
		onNavigationBarButtonTap(e) {
			console.log(JSON.stringify(e))
			uni.navigateBack({
				delta: 1
			});
		},
		//搜索框输入时触发的事件
		onNavigationBarSearchInputChanged(e) {
			console.log(e.text)
		},
		// 点击软键盘上的搜索键触发的事件
		onNavigationBarSearchInputConfirmed(e) {
			console.log(e.text)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
