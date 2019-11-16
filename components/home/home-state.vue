<template>
	<view class="my-state u-f-jse">
		<block v-for="(item,index) in list" :key="index">
			<view>{{item.num}}<view>{{item.name}}</view></view>
		</block>
	</view>
</template>

<script>
	export default {
		props:{
			list:Array
		}
	}
</script>

<style lang="less" scoped>
	.my-state{
		>view{
			flex-direction: column;
			text-align: center;
			font-size: 30upx;
			>view{
				color: #BEBEBE;
			}
		}
	}
</style>
