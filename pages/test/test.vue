<template>
	<view>
		哈哈
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onLoad() {
			wx.cloud.init() //先初始化云
			wx.cloud.callFunction({
			  // 要调用的云函数名称
			  name: 'getHtml',
			  data:{
				  url:'http://www.imomoe.io/'
			  },
			  success:(res)=>{
				  console.log(res);
			  }
			})
		}
	}
</script>

<style>

</style>
