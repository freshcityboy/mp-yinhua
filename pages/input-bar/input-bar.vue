<template>
	<view>
		<uni-nav-bar :status-bar="true" 
					 left-icon="arrowleft"
					 rightText="发布"
					 @click-left="back" 
					 @click-right="publish" 
					>
					<template>
						<view class="title u-f-ajc" @click="choseTitle">
							{{textBarTitle}}
							<view class="icon iconfont icon-xialazhankai"></view>
						</view>
					</template>
		</uni-nav-bar>
		<view>
			<textarea class="textarea" 
					  v-model="text" 
					  placeholder="留下美好足迹吧..."
					  focus
					  />
		</view>
		<!-- 上传多图 -->
		<view><upload-img @upload="upload"></upload-img></view>
		<!-- 弹窗（公告） -->
		<view><bulletin></bulletin></view>
					
	</view>
</template>

<script>
	
	import uniIcons from "../../components/uni-icons/uni-icons.vue"
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import uploadImg from "../../components/common/upload-img.vue"
	import bulletin from "../../components/bulletin/bulletin.vue"
	export default {
		data() {
			return {
				titleArr:['所有人可见', '仅好友可见', '仅自己可见'],
				textBarTitle: '所有人可见',
				text: '',
				imageList:[],
				
				
			}
		},
		
		methods: {
			choseTitle () {
				uni.showActionSheet({
					itemList: this.titleArr,
					success: (res) => {
						this.title = this.titleArr[res.tapIndex]
					}
				})
			},
			back () {
				uni.navigateBack({
					delta: 1
				})
			},
			publish () {
				//回调发布成功
				console.log(this.text)
				uni.showToast({
					title: "发布成功"
				})
			},
			upload(arr) { // 上传图片
				this.imageList = arr
			},	
			
		},
		components: {
			uniIcons,
			uniNavBar,
			uploadImg,
			bulletin
		}
	}
</script>

<style lang="less" scoped>
	.title{
		width: 100%;
	}
	.textarea{
		width: 100%;
		border: 1px solid #CCCCCC;
	}
	
	
</style>
