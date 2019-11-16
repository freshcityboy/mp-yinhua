<template>
	<view class="body">
		<view class="mask" v-if="isShow" @tap="closeMenu"></view>
		<view class="menu-right" v-if="isShow">
			<view class="add-friend icon iconfont icon-sousuo" 
				hover-class="active"
			><text>加好友</text></view>
			<view class="clear icon iconfont icon-qingchu"
				hover-class="active"
			><text>清除未读</text></view>
			
		</view>
		<!-- 消息列表 -->
		<block v-for="i in 8" :key="i">
			<block v-for="(item,index) in papers" :key="index">
				<paper-list :item="item" @tapHandle="tapHandle"></paper-list>
			</block>
		</block>
		<loading-tip ref="tip"></loading-tip>
	</view>
</template>

<script>
	
	import loadingTip from "../../components/common/loading-tip.vue"
	import paperList from "../../components/paper-list/paper-list.vue"
	export default {
		data() {
			return {
				isShow:false,
				papers:[
					{
						username:'低头看鱼',
						userpic:'../../static/demo/userpic/12.jpg',
						time:'13:58',
						noreadnum:'10',
						info:'赵丽颖《知否》一句话打脸。哈哈哈哈嘻嘻嘻'
						
					}
				]
			}
		},
		methods: {
			closeMenu() {
				this.isShow = false
			},
			openMenu() {
				this.isShow = true
			},
			tapHandle() {
				uni.navigateTo({
					url:'../user-chat/user-chat'
				})
			}
		},
		onReachBottom() {
			this.$refs.tip.changeLoadingText()
		},
		onPullDownRefresh() {
			setTimeout(()=>{
				let obj = {}
				uni.showToast({
					title:"刷新完成",
					position:"top"
				})
				uni.stopPullDownRefresh()
			},2000)
			
		},
		onNavigationBarButtonTap(e){
			if(e.index === 1){
				this.openMenu()
			}else if(e.index === 0){
				uni.navigateTo({
					url:'../friend-list/friend-list'
				})
			}
		},
		components:{
			loadingTip,
			paperList
		}
	}
</script>

<style lang="less" scoped>
	.body{
		margin: 0 20upx;
		position: relative;
		.mask{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 1000;
		}	
		
		.menu-right{
			position: fixed;
			top: 80upx;
			right: 0upx;
			width: 50%;
			height: 200upx;
			z-index: 2000;
			
			>view{
				margin-left: 20upx;
				padding-left: 10upx;
				line-height: 100upx;
				font-weight: bold;
				background: #FEFEFE;
				.active{
					background: #E5E5E5;
				}
				>text{
					padding: 20upx;
				}
			}
		}
		
	}
</style>
