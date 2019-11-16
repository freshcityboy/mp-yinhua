<template>
	<view>
		<!-- 顶部选项卡 -->
		
		<head-tab @ontabtap="ontabtap" :tabBars="tabBars" :currentIdx="currentIdx" ></head-tab>
		<!-- 与选项卡对应的滑块 -->
		
		<swiper :style="{ height: swiperHeight + 'px' }"
				@change="handleSwiper" 
				:current="currentIdx" 
				>
			<swiper-item v-for="(items,index) in detailInfo" :key="index">
				<scroll-view scroll-y
							:style="{'height': '100%'}"
							@scrolltolower="scrolltolower"
							>
					<index-list :items="items" @gotoDetail="gotoDetail"></index-list>
					<!-- 下拉提示 -->
					<loading-tip ref="loadingTip"></loading-tip>
					
				</scroll-view>
		
			</swiper-item>
			
		</swiper>
	</view>
</template>

<script>
import everydayList from '../../components/everyday/everyday-list.vue';
import headTab from '../../components/everyday/head-tab.vue';
import loadingTip from '../../components/common/loading-tip.vue'


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
		if(!detailInfo[currentIdx+1].length){
			this.$store.dispatch('getDetailInfo',currentIdx+1)
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
			if(currentIdx<6 && !detailInfo[currentIdx+1].length){
				this.$store.dispatch('getDetailInfo',currentIdx+1)
			}
		}
	},
	components: {
		everydayList,
		headTab,
		loadingTip,

	}
};
</script>

<style lang="less">

</style>
