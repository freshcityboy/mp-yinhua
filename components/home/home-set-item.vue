<template>
	<view class="list-item u-f-jsb" @tap="gotoSet(item.url)">
		<view class=""><text>{{item.text}}</text></view>
		<view class="icon iconfont icon-jinru"></view>
	</view>
</template>

<script>
	export default {
		props:{
			item:Object
		},
		methods:{
			gotoSet(url){
				switch (this.item.type){
					case 'navigateTo':
						this.$emit('tapEvent',url)
						break;
					case 'clear':
						uni.showModal({
							title:'提示',
							content:'是否要清除缓存',
							confirmText:'确认清除',
							success: (res) => {
								if(res.confirm){
									try {
									    uni.clearStorageSync();  
									} catch (e) {
									    console.log(e);
									}
									uni.showToast({
										title:'清除成功'
									})
								}
							}
						})
						
						break;	
					default:
						break;
				}
				
			}
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
