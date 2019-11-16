<template>
	<view>
		<!-- 顶部选项卡 -->
		<head-tab @ontabtap="ontabtap" :tabBars="tabBars" :currentIdx="currentIdx" ></head-tab>
		<!-- 与选项卡对应的滑块 -->
		<loading></loading>
		<swiper :style="{ height: swiperHeight + 'px' }"
				@change="handleSwiper" 
				:current="currentIdx" 
				>
			<swiper-item v-for="(items,index) in detailInfo" :key="index">
				<scroll-view scroll-y
							:style="{'height': '100%'}"
							@scrolltolower="scrolltolower"
							>
					<everyday-list :items="items" @gotoDetail="gotoDetail"></everyday-list>
				</scroll-view>
		
			</swiper-item>
			
		</swiper>
	</view>
</template>

<script>
import everydayList from '../../components/everyday/everyday-list.vue';
import headTab from '../../components/everyday/head-tab.vue';
import loadingTip from '../../components/common/loading-tip.vue'
import loading from "../../components/common/loading.vue"

import { mapState } from 'vuex'
export default {
	data() {
		return {
			loadingText:'上拉加载更多',
			swiperHeight: 500,
			currentIdx: 0,
			tabBars: [
				{
					name: '一',
					id: 'guanzhu'
				},
				{
					name: '二',
					id: 'tuijian'
				},
				{
					name: '三',
					id: 'tiyu'
				},
				{
					name: '四',
					id: 'redian'
				},
				{
					name: '五',
					id: 'caijing'
				},
				{
					name: '六',
					id: 'yule'
				},
				{
					name: '日',
					id: 'junshi'
				}
			],
		}	
	},
	computed:{
		...mapState(['detailInfo'])
	},
	methods:{
		
	},
	onLoad() {
		let {detailInfo, currentIdx} = this		
		detailInfo[0].forEach(item => { //获取第一屏的所有视频的播放地址
			this.$store.dispatch('getVideoUrl',item.vID)
		})
		
		if(!detailInfo[currentIdx+1].length){ // 加载一整个星期的视频信息
			for (let i = 0 ; i < 7; i++) {
				this.$store.dispatch('getDetailInfo',i)
			}		
		}	
		// uni.getStorage({
		//     key: 'user-info',
		//     success: function (res) {
		//         this.userinfo = res
		// 		console.log(res);
		//     }
		// });
		
	},
	onNavigationBarSearchInputClicked() {
		uni.navigateTo({
			url: '../search/search',
		});
	},
	onNavigationBarButtonTap(e) {
		console.log(e)
		if(e.index === 1) {
			uni.navigateTo({
				url: '../input-bar/input-bar'
			})
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
	watch:{
		currentIdx(newVal){
			let {detailInfo, currentIdx} = this	
			detailInfo[currentIdx].forEach(item => { //获取第一屏的所有视频的播放地址
				this.$store.dispatch('getVideoUrl',item.vID)
			})
		}
	},
	components: {
		everydayList,
		headTab,
		loadingTip,
		loading

	}
};
</script>

<style lang="less">

</style>
