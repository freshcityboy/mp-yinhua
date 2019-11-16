<template>
	<view>
		<view >
			<headTab :tabBars="tabBars" @ontabtap="ontabtap" :currentIdx="currentIdx"></headTab>
		</view>
		<swiper :current="currentIdx" @change="handleSwiper">
			<block v-for="i in 3" :key="i">
				<swiper-item>
					<view class="friend-list u-f-ac">
						<image src="../../static/demo/userpic/15.jpg" 
							mode="widthFix" 
							lazy-load
						></image>
						<view class="info">
							<view class="name">60king </view>
							<view style="display: inline-block;"><sex-bar>28</sex-bar></view>
						</view>
						<view class="font iconfont icon-zengjia1"></view>
						<view class="font iconfont icon-xuanze"></view>
					</view>
				</swiper-item>
			</block>
		</swiper>
		
	</view>
</template>

<script>
	import headTab from "../../components/index/head-tab.vue"
	import sexBar from "../../components/common/sex-bar.vue"
	export default {
		data() {
			return {
				currentIdx:0,
				tabBars:[
					{
						name:'互关',
						num:1
					},
					{
						name:'关注',
						num:10
					},
					{
						name:'粉丝',
						num:10
					}
				]
			}
		},
		methods: {
			ontabtap(index){
				this.currentIdx = index
			},
			handleSwiper(event) {
				this.currentIdx = event.target.current;
			},
		},
		onNavigationBarButtonTap(e) {
			uni.navigateBack({
				delta:1
			})
		},
		components:{
			headTab,
			sexBar
		}
	}
</script>

<style lang="less" scoped>
	.friend-list{
		margin: 0 20upx;
		padding: 20upx 0;
		border-bottom: 1px solid #E5E5E5;
		image{
			width: 20%;
			flex-shrink: 0;
			border-radius: 100%;
		}
		.info{
			flex: 1;
			margin: 0 20upx;
		}
		.icon-zengjia1{
			color:#F88733;
		}
	}
</style>
