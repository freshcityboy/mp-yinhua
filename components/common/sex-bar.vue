<template>
	<view class="sex">
		<view class="icon iconfont " :class="[sex==='男'?'icon-nan':'icon-nv']"><slot></slot></view>
	</view>
</template>

<script>
	export default {
		props:{
			sex:String
		}
	}
</script>

<style lang="less" scoped>
	.sex{
		margin-left: 10upx;
		.iconfont{
			font-size: 8upx;
			color: #FFFFFF;
			line-height: 1.5;
			background:#43B2FE ;
			padding: 0 10upx;
			border-radius: 16upx;
			&.icon-nv{
				background: #FE6286;
			}
		}	
	}
</style>
