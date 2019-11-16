<template>
	<view>
		<block v-for="(item,index) in list" :key="index">
			<home-set-item :item="item" @tapEvent="gotoSet"></home-set-item>
		</block>
		<bottom-button-bar :text="'退出登录'" @tapEvent="tapEvent"></bottom-button-bar>
	</view>
</template>

<script>
	import bottomButtonBar from "../../components/common/bottom-button-bar.vue"
	import homeSetItem from "../../components/home/home-set-item.vue"
	export default {
		data() {
			return {
				list:[
					{
						text:'账号与安全',
						url:'../user-set-safety/user-set-safety',
						type:'navigateTo'
					},
					{
						text:'绑定邮箱',
						url:'../user-set-email/user-set-email',
						type:'navigateTo'
					},
					{
						text:'资料编辑',
						url:''
					},
					{
						text:'小纸条',
						url:''
					},
					{
						text:'清除缓存',
						url:'',
						type:'clear'
					},
					{
						text:'意见反馈',
						url:'../user-set-feedback/user-set-feedback',
						type:'navigateTo'
					},
					{
						text:'关于仿糗百',
						url:'../user-set-about/user-set-about',
						type:'navigateTo'
					},
				]
			}
		},
		methods: {
			tapEvent(){
				uni.showModal({
					title:'您真的要退出登录吗',
					success: (res) => {
						if(res.confirm){
							//退出登录接口
							uni.showToast({
								title:'退出成功'
							})
						}
					}
				})
			},
			gotoSet(url){ //跳转到相关设置页面
				uni.navigateTo({
					url
				})
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index === 0){
				uni.navigateBack({
					delta:1
				})
			}
		},
		components:{
			bottomButtonBar,
			homeSetItem
		}
	}
</script>

<style lang="less" scoped>

		.list-item{
			margin: 0 40upx;
			padding: 20upx 0;
			border-bottom: 1px solid #EEEEEE;
			.icon-liulan{
				color: #54B9FE;
			}
			.icon-jinru{
				color: #BEBEBE;
			}
			.icon-huiyuanvip{
				color: #FE7333;
			}
			.iconfont>text{
				margin-left: 20upx;
				color: #000000 !important;
			}
		}
		
</style>
