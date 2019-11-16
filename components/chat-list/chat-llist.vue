<template>
	<view class="animated fadeIn fast">
		<view v-if="msg.gstime" class="time u-f-ajc">{{msg.gstime}}</view>
		<view class="msg-box u-f " :class="[msg.isMe?'right':'left']">
			<image v-if="!msg.isMe" :src="msg.userpic" mode="widthFix" lazy-load></image>
			<view class="content">
				<text>{{msg.text}}</text>
				<image v-if="false" src="" mode="widthFix"></image>
				<view class="arrow" :class="[msg.isMe?'right':'left']"></view>
			</view>
			
			<image v-if="msg.isMe" :src="msg.userpic" mode="widthFix" lazy-load></image>
		</view>
	</view>
		
</template>

<script>
	export default {
		props:{
			msg:Object
		}
	}
</script>

<style lang="less" scoped>
	.time{
		margin: 40upx 0;
		font-size: 20upx;
		color: #BEBEBE;
	}
	.msg-box{
		display: flex;
		&.right{
			margin: 40upx 20upx  40upx 100upx;
			justify-content: flex-end;
		}
		&.left{
			margin: 40upx 100upx  40upx 20upx;
		}
		.content{
			position: relative;
			background: #F3F3F3;
			margin: 0 20upx;
			padding: 20upx;
			border-radius: 16upx;
			max-width: 400upx;
			.arrow{
				position: absolute;
				top: 20upx;
				border: 20upx solid #000000;
				&.right{
					right: -40upx;
					border-color: transparent transparent transparent #F3F3F3 ;
				}
				&.left{
					left: -40upx;
					border-color: transparent #F3F3F3 transparent transparent ;
				}
			}
		}
		
		image{
			width: 100upx;
			border-radius: 100%;
			flex-shrink: 0;
		}
		
	}
</style>
