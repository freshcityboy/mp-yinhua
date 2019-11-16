<template>
	<view class="tabs animated fadeIn fast">
		<scroll-view id="tab-bar" class="scroll-h " :scroll-x="true" show-scrollbar="false">
			<block v-for="(tab, index) in tabBars" :key="tab.id">
				<view class="uni-tab-item " :class="barClass" @tap="ontabtap(index)">
					<text class="uni-tab-item-title u-f-ajc " 
						:class="[currentIdx === index ? 'active' : '']"
						>
							{{ tab.name }} {{tab.num?tab.num:''}}
						<view class="swiper-table-line"></view>
					</text>
				</view>
			</block>
		</scroll-view>	
	</view>
</template>

<script>
	export default {
		props:{
			tabBars: Array,
			currentIdx:{
				type:Number,
				default:0
			}
		},
		data(){
			return{
				barClassArr:['two','three','four','five','six','seven'],
			}
		},
		computed:{
			barClass() {
				return this.barClassArr[this.tabBars.length-2]
			}
		},
		methods:{
			ontabtap(index) {
				this.$emit('ontabtap', index)
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.tabs {
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		background-color: #ffffff;
		/* #ifdef MP-ALIPAY || MP-BAIDU */
		height: 100vh;
		/* #endif */
	}

	.scroll-h {
		width: 750upx;
		height: 100upx;
		display: flex;
		flex-direction: row;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
		/* flex-wrap: nowrap; */
	}

	.line-h {
		height: 1upx;
		background-color: #cccccc;
	}

	.uni-tab-item {
		display: inline-block;
		flex-wrap: nowrap;
		padding: 0 30upx;
		&.two{
			padding:0;
			width: 50%;
		}
		&.three{
			padding:0;
			width: 33%;
		}
		&.four{
			padding:0;
			width: 25%;
		}
		&.five{
			padding:0;
			width: 20%;
		}
		&.seven{
			padding:0;
			width: 14%;
		}
			
	}
	.uni-tab-item-title {
		color: #555;
		font-size: 20upx;
		height: 80upx;
		line-height: 80upx;
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
		&.active {
			background: $self-color-main;
			color: #FFFFFF;
			line-height: 50upx;
			font-size: 25upx;
			border-radius: 40upx;
			padding: 10upx 10upx;
			box-sizing: border-box;
			background-clip: content-box;
			&::before{
				content: '周';
				padding-right: 5upx;
				font-size: 25upx;
			}
		}
	}
</style>
