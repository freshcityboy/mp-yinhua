<template>
	<view class="list-item u-f"  @tap="gotoDetail(item)">
		<image :src="item.imgUrl" lazy-load="" mode="aspectFill"></image>
		<view class="info">
			<view class="name">{{item.name}}</view>
			<view class="nation">{{item.language}}</view>
			<view class="style">
				<block v-for="(item,index1) in item.style" :key="index1">
					<text space="nbsp"></text>
				</block></view>
			<view class="recent-updates" v-if="item.updateDay >= 0">已更{{item.recentUpdate}}集</view>
			<view class="recent-updates" v-else>{{item.recentUpdate}}集全</view>
		</view>
		<view class="like">
			<view  :class="{active:isLike}" @tap.stop="like(item.vID)">{{isLike?'已追番':'追番'}}</view>
		</view>
	</view>
</template>

<script>
	import api from "../../api/index.js"
	export default {
		props:{
			item:Object		
		},
		data() {
			return {
				isLike:false,
	
			}
		},
		methods: {
			gotoDetail(item){
				uni.navigateTo({ 
					 url:  '../everyday-list-detail/everyday-list-detail?item='+JSON.stringify(item)
				})
				console.log(item);
				this.$store.dispatch('getVideoUrl',item.vID)
			},
			like(vID){ // 追番
				this.isLike = !this.isLike
				let like = getApp().globalData.userInfo.like
				
				let idx = like.findIndex(item => { // 寻找是否有vID，返回下标
					return item.vID === vID
				})
				if(idx === -1){ // 如果数组中没有就添加，反之则删除
					let playIndex = this.playIndex || null
					let obj = Object.assign(this.item,{playIndex})
					like.push(obj)
				}else{
					like.splice(idx,1)
				}
			
			},
		},
		onReady() {
			let like = getApp().globalData.userInfo.like
			if(like.find(res => res.vID == this.item.vID)){
				this.isLike =  true
			}else{
				this.isLike = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	
		
		.list-item{
			border-bottom: 1px solid $self-color-gray;
			padding-bottom: 20upx;
			margin-bottom: 20upx;
			image{
				width: 300upx;
				height: 200upx;
				border: 1px solid $self-color-gray;
				border-radius: 16upx;
				box-shadow: 1px 1px 1px $self-color-gray;
				flex-shrink: 1;
			}
			.info{
				flex: 1;
				margin-left: 20upx;
				font-size: 25upx;
				color: $self-color-word;
				.name{
					font-size: 30upx;
					text-shadow: 0px 0px 1px $self-color-word;
					color: #000000;
				}
			}
			.like{
				>view{
					text-align: center;
					width: 80upx;
					background: #e42b77;
					color: #FFFFFF;
					padding: 0 10upx;
					border-radius: 10upx;
					margin-right: 10upx;
					margin-top: 10upx;
					&.active{
						background: $self-color-gray;
						color: #e42b77;
						padding: 0 10upx;
						white-space: nowrap;
						
					}
				}
			}	
		}
	

</style>
