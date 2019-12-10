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
import loading from "../../components/common/loading.vue"

import { mapState } from 'vuex'
export default {
	data() {
		return {
			loadingText:'上拉加载更多',
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
		...mapState(['detailInfo']),
		swiperHeight(){
			let height = 0;
			uni.getSystemInfo({
			    success: function (res) {
			      height = res.windowHeight - uni.upx2px(100)
			    }
			});
			return height
		}
		
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
	onPullDownRefresh() {
	        console.log('refresh');
			for (let i = 0 ; i < 7; i++) {
				this.$store.dispatch('getDetailInfo',i)
				console.log(i);
			}
	        uni.stopPullDownRefresh();
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
		loading

	}
};
</script>

<style lang="less"> 

</style>
