<template>
	<view class="list animated fadeIn fast">
		<view class="list-one u-f-jsb">
			<view class="list-left u-f-ac">
				<image :src="item.userpic" mode="widthFix"></image>
				<view class="username">{{item.username}}</view>
				<sex-bar :sex="item.sex" >{{item.age}}</sex-bar>
			</view>
			<view class="list-right  u-f-ac">
				<view class="icon iconfont icon-zengjia" v-if="!isFocus" @tap="focus">关注</view>
				<view class="icon iconfont icon-guanbi"></view>
			</view>
		</view>
		<view class="list-two">
			<view class="title">{{item.title}}</view>
		</view>
		<view class="list-three ">
			<view class="list-img u-f-ac" v-if="item.imageurl.length">
				<image :src="item.imageurl" mode="widthFix"></image>
				<view class="artical u-f-ac"><text>{{item.articalInfo}}</text></view>
			</view>
			
			<view class="list-vedio u-f-ajc" v-else>
				<image :src="item.vediourl" lazy-load mode="widthFix"></image>
				<view class="icon iconfont icon-bofang video-paly"></view>
				<view class="video-msg">20w次播放 2:47</view>
			</view>
		</view>
		<view class="list-four u-f-jsb">
			<view class="list-left">
				<view>{{item.position}}</view>
			</view>
			<view class="list-right u-f-ac">
				<view class="icon iconfont icon-zhuanfa" @tap="share">{{item.interaction.share}}</view>
				<view class="icon iconfont icon-xiaoxi" @tap="comment">{{item.interaction.comment}}</view>
				<view class="icon iconfont icon-dianzan" 
					  :class="{'active':isLike}" 
					  @tap="like"
					>{{dianzan}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import sexBar from "../common/sex-bar.vue"
	export default {
		props:{
			item: Object,
			curidx: Number
		},
		data(){
			return{
				dianzan: this.item.interaction.like,
				isshare: this.item.share,
				iscomment:  this.item.comment,
				isLike:  this.item.like,
				isFocus: this.item.focus
			}
		},
		methods:{
			focus() {
				this.isFocus = true
			},
			share() {
				console.log('转发')
			},
			comment() {
				console.log('评论')
			},
			like() { // 点赞
				console.log(this.isLike)
				if(!this.isLike){
					this.isLike = true
					this.dianzan++
					uni.showToast({
						title:'点赞成功'
					})
				}else{
					this.isLike = false
					this.dianzan--
					uni.showToast({
						title:'取消成功'
					})
				}
				
				
			}
		},
		components:{
			sexBar
		}
	}
</script>

<style lang="less" scoped>
	.list{
		padding: 20upx;
		.list-one{
			.list-left{
				image{
					width: 80upx;
					border-radius: 100%;
					margin-right: 16upx;
				}
				.username{
					font-size: 30upx;
					font-weight: bold;
					color: #BEBEBE;
				}
				
			}
			.list-right{
				.icon-zengjia{
					font-size: 26upx;
					background: #F3F3F3;
					padding: 0 10upx;
					border-radius: 8upx;
				}
				.icon-guanbi{
					margin-left: 10upx;
				}
			}
		}
		.list-two{
			margin-left: 40upx;
			margin-bottom: 10upx;
			.title{
				font-size: 36upx;
				
				
			}
		}
		.list-three{
			image{
				border-radius: 16upx;
			}
			.list-img{
				align-items: stretch;
				image{
					width: 40%;
					margin: 10upx 20upx 10upx 40upx;
					flex: 3;
				}
				.artical{
					background: #F7F7F7;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient:vertical;
					flex: 5;
					line-height: 2.2;
				}
			}
			
			.list-vedio{
				position: relative;
				>view{
					position: absolute;
				}
				.video-paly {
					position: absolute;
					font-size: 140upx;
					color: #ffffff;
				}
				.video-msg {
					position: absolute;
					bottom: 10upx;
					right: 50upx;
					padding: 0 20upx;
					background: rgba(0, 0, 0, 0.6);
					border-radius: 20upx;
				}
			}
		}
		.list-four{
			color: #BEBEBE;
			margin: 0 40upx;
			.list-right{
				>view{
					margin-left: 20upx;
				}
				.icon-dianzan.active{
					color: #FDDD32;
				}
			}
		}
	}
</style>
