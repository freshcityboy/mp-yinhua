<template>
	<view>
		<view class="index-list u-f">
			<block v-for="(item,index) in items" :key="index">
				<view class="list-item" @tap="gotoDetail(item)">
					<image :src="item.imgUrl" mode="top"></image>
					<view class="name">{{item.name}}</view>
					<view class="jishu">第{{item.recentUpdate}}集</view>
				</view>
			</block>
		</view>
	</view>
</template>
<script>
	
export default {
	props:{
		items:Array
	},
	data(){
		return {
			Items:this.items
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
	}
};
</script>

<style lang="scss" scoped>
	.index-list{
		flex-wrap: wrap;
		padding: 20upx;
		background: #FFFFFF;
		.list-item{
			box-sizing: border-box;
			height: 380upx;
			width: 50%;
			padding: 10upx;
			text-align: center;
			image{
				width: 300upx;
				height: 200upx;
				border-radius: 16upx;
				box-shadow: 5px 5px 5px $self-color-gray;
			}	
			.name{
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp:2;
				-webkit-box-orient:vertical;
				overflow: hidden;
				font-size: 32upx;	
			}
			.jishu{
				color: $self-color-gray;
			}
		}
	}
	
</style>
