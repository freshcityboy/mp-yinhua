<template>
	<view>
		<view class="head-logo u-f-ajc">
			<image src="../../static/demo/about.png" mode="widthFix"></image>
		</view>
		<view class="version">
			version 1.0.0
		</view>
		<block v-for="(item,index) in list" :key="index">
			<home-set-item :item="item" @tapEvent="gotoPage"></home-set-item>
		</block>
	</view>
</template>

<script>
	import homeSetItem from "../../components/home/home-set-item.vue"
	export default {
		data() {
			return {
				list:[
					{
						text:'新版本检测',
						// url:'../user-set-safety/user-set-safety'
					},
					{
						text:'仿糗事百科用户协议',
						// url:'../user-set-email/user-set-email'
					}
				]
			}
		},
		methods: {
			gotoPage(url){
				console.log(url);
			}
		},
		components:{
			homeSetItem
		}
	}
</script>

<style lang="less" scoped>
	.head-logo{
		margin: 80upx;
	}
	.version{
		text-align: center;
		color: #CCCCCC;
		margin: 40upx;
	}
</style>
