<template>
	<view>
		<!-- 顶部选项卡 -->
		<view>
			<head-tab @ontabtap="ontabtap" :tabBars="tabBars" :currentIdx="currentIdx"></head-tab>
		</view>
		<!-- 与选项卡对应的滑块 -->
		<swiper :style="{ height: swiperHeight + 'px' }"
				@change="handleSwiper" 
				:current="currentIdx"
				>
			<swiper-item v-for="(items,index) in 9" :key="index">
				<template v-if="items<5">
					<scroll-view scroll-y
								:style="{'height': '100%'}"
								@scrolltolower="scrolltolower"
								>
						 <!-- 图文列表 -->
						<block v-for="item in 5" :key="item">
							<recent-updates ></recent-updates>
						</block>
						<!-- 下拉提示 -->
						<loading-tip ref="loadingTip"></loading-tip>
					</scroll-view>
				</template>
				<template v-else>
					<nothing-tip></nothing-tip>
				</template>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import headTab from "../../components/index/head-tab.vue"
	import recentUpdates from "../../components/topic/recent-updates.vue"
	import loadingTip from "../../components/common/loading-tip.vue"
	import nothingTip from "../../components/common/nothing-tip.vue"
	export default {
		data() {
			return {
				currentIdx:0,
				tabBars: [
					{
						name: '关注',
						id: 'guanzhu'
					},
					{
						name: '推荐',
						id: 'tuijian'
					},
					{
						name: '体育',
						id: 'tiyu'
					},
					{
						name: '热点',
						id: 'redian'
					},
					{
						name: '财经',
						id: 'caijing'
					},
					{
						name: '娱乐',
						id: 'yule'
					},
					{
						name: '军事',
						id: 'junshi'
					},
					{
						name: '历史',
						id: 'lishi'
					},
					{
						name: '本地',
						id: 'bendi'
					}
				],
			}
		},
		methods: {
			ontabtap(index) {
				this.currentIdx = index;
			},
			handleSwiper(event) {
				this.currentIdx = event.target.current;
			},
			scrolltolower() {
				this.$refs.loadingTip[0].changeLoadingText()	
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta:1
			})
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.swiperHeight = res.windowHeight - uni.upx2px(104);
				}
			});
		},
		components:{
			headTab,
			recentUpdates,
			loadingTip,
			nothingTip
		}
	}
</script>

<style>

</style>
