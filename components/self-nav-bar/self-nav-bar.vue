<template>
	<view class="uni-navbar u-f ">
		<view class="uni-navbar-l u-f-ajc">
			<view class="icon iconfont icon-qiandao "></view>
		</view>
		<view class="uni-navbar-c u-f-ajc">
			<block v-for="(item, index) in title" :key="index">
				<view :class="[index===currentIdx?'active':'']" @tap="chose(index)">{{item}}</view>
			</block>
		</view>
		<view class="uni-navbar-r  u-f-ajc">
			<view class="icon iconfont icon-fabu" @tap="gotoPublish"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:Array,
				default() {
					return ['关注','话题']
				}
			},
			currentIdx:{
				type: Number,
				default: 0
			}
		},
		data() {
			return {
			}
		},
		methods: {
			chose(index) {
				this.curIdx = index
				this.$emit('ontabtap',index)
			},
			gotoPublish(){
				this.$emit('gotoPublish')
			}
		}
	}
</script>

<style lang="less" scoped>
	.uni-navbar{
		width: 100%;
		height: 100upx;
		border-bottom: 2upx solid #EEEEEE;
		.iconfont{
			font-size: 45upx;
		}	
		.uni-navbar-l{
			flex:1;
			color: #FEC37C;
		}
		.uni-navbar-c{
			flex:7;
			>view{
				font-size: 30upx;
				font-weight: bold;
				padding: 0 10upx;
				color: #939393;
				&.active{
					border-bottom: 8upx solid #FDDD31;
					padding-top: 8upx;
					color: #000000;
				}
			}
		}
		.uni-navbar-r{
			width: 100upx;
			flex:1;
		}
	}
</style>
