<template>
	<view class="list u-f" @tap="tapHandle">
		
		<image :src="item.userpic" mode="widthFix" lazy-load></image>
		<view class="right">
			<view class="list-one u-f-jsb">{{item.username}}<view class="time">{{item.time}}</view>
			</view>
			<view class="list-two u-f-jsb">
				<view class="info">{{item.info}}</view>
				<uni-badge class="uni-badge" :text="item.noreadnum" type="error" /></view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from "../../components/uni-badge/uni-badge.vue"
	export default {
		props:{
			item:Object
		},
		methods:{
			tapHandle(){
				this.$emit('tapHandle')
			}
		},
		components:{
			uniBadge
		}
	}
</script>

<style lang="less" scoped>
	.list{
		margin: 30upx 0;
		padding-bottom: 20upx;
		border-bottom: 1px solid #EEEEEE;
		image{
			margin-right: 20upx;
			width: 18%;
			border-radius: 100%;
			flex-shrink: 0;
		}
		
		.right{
			flex: 1;
			.list-one{
				position: relative;
				font-size: 30upx;
				font-weight: bold;
				.time{
					position: absolute;
					top: 0;
					right: 20upx;
					color: #D0D0D0;
					padding-right: 20upx;
				}
			}
			.list-two{
				position: relative;
				.info{
					color: #AAAAAA;
					width: 70%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				.uni-badge{
					position: absolute;
					top: 10upx;
					right: 30upx;
				}	
			}
		}
	}
</style>
