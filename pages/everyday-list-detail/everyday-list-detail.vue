<template>
	<view>
		<view class="index-list">	
			<my-video :item="item" :trimVideoUrl="trimVideoUrl"></my-video>
		</view>
		<!-- 底部输入框 -->
			<!-- 占位框，防止输入框盖住评论 -->
			<!-- <view style="height:100px;"></view>
			<bottom-input-bar @sentMsg="sentMsg"></bottom-input-bar> -->
		<!-- 蒙版层	 -->
		<!-- <mask-layer :show="isShowShareMore" @toggleShow="toggleShow"></mask-layer >	 -->
	</view>
</template>

<script>
	import bottomInputBar from "../../components/common/bottom-input-bar.vue"
	import maskLayer from "../../components/common/mask-layer.vue"
	import myVideo	from "../../components/video/video.vue"
	
	import {mapState} from "vuex"
	export default {
		
		data() {
			return {
				isShowShareMore:false,
				item:{},
				trimVideoUrl:[]
			}
		},
		computed:{
			...mapState(['videoUrl'])
		},
		watch:{
			item(newVal){
				let {vID} = newVal
				this.trimVideoUrl = this.videoUrl[vID]
			}
		},
		methods: {
			sentMsg(text){
				if(!text){ return}
				let now = Date.now()
				// let gstime = time.getChatTime(now,this.msgs[this.msgs.length-1].time)
				
			},
			toggleShow(){
				this.isShowShareMore = !this.isShowShareMore
			}
		},
		onLoad(data) {
			this.item = JSON.parse(data.item)
			uni.setNavigationBarTitle({
				title: this.item .name
			})
			
		},
		onNavigationBarButtonTap(e) {
			if(e.index===0){
				uni.navigateBack({
					delta:1
				})
			}else if(e.index === 1) {
				this.toggleShow()
			}
			
		},
		components:{
			bottomInputBar,
			maskLayer,
			myVideo
		}
	}
</script>

<style lang="less" scoped>


</style>
