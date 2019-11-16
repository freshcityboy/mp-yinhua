<template>
	<view class="animated fadeIn fast">
		<view class="bottom-input-bar">
			<view class="u-f-ac">
				<view class="input u-f-ac">
					<input type="text" v-model="text" value="" placeholder="请文明发言" placeholder-class="placeholder"/>
				</view>
				<view class="font iconfont icon-fabu" @tap="sentMsg"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				text:''
			}
		},	
		methods:{
			sentMsg(){
				this.$emit('sentMsg',this.text)
				this.text=''
			}
		}
	}
</script>

<style lang="less" scoped>
	.bottom-input-bar{
		border-top: 1px solid #E5E5E5;
		height: 120upx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1000;
		background: #FFFFFF;
		>view{
			margin: 20upx ;
			.input{
				flex: 1;
				margin: 0 20upx;
				background: #F6F6F6;
				height: 80upx;
				border-radius: 16upx;
				input{
					width: 100%;
					margin-left: 20upx;
					.placeholder{
					}
				}
			}
			.icon-fabu{
				width: 30upx;
				font-size: 60upx;
				margin-right: 40upx;
			}
		}
	}
</style>
