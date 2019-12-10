<template>
	<view>
		<view class="index-list">	
			<my-video :item="item" :trimVideoUrl="trimVideoUrl"></my-video>
		</view>

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
				item:{}
			}
		},
		computed:{
			...mapState(['videoUrl']),
			trimVideoUrl(){
				let {vID} = this.item
				return this.videoUrl[vID]
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
