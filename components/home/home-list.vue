<template>
	<view class="more-list">
		<view class="list-item ">
			<view class="title-bar icon iconfont icon-liulan u-f"><view class="u-f-jsb u-f-drr icon iconfont icon-jinru">观看历史</view></view>
			<scroll-view scroll-x>
				<block v-for="(item,index) in playInfo" :key="index">
					<view class="u-f">
						<view class="img-container">
							<image :src="item.src" mode="aspectFill"></image>
							<view></view>
							<!-- <view :style="{width:timePercent[index]}"></view> -->
							<!-- <view >{{playInfo[index].currentTime | ms}}/{{playInfo[index].duration | ms}}</view> -->
							<!-- <view >{{playInfo | ms}}/{{playInfo | ms}}</view> -->
						</view>
					</view>
				</block>
			</scroll-view>
			
			
		</view>
		<view class="list-item " @tap="gotoLike">
			<view class="title-bar "><view class="u-f-jsb u-f-drr icon iconfont icon-jinru">已追番剧({{likeLength}})</view></view>	
		</view>
		
	</view>
</template>

<script>
	export default {
		props:{
			likeLength: Number,
			userInfo:Object,
			playInfo:Array
		},
		data(){
			return{
				
			}
		},
		computed:{
			timePercent(){
				let arr = []
				this.playInfo.forEach(item => {
					let {currentTime, duration}= item
					let per = currentTime/duration*100 + '%'				
					arr.push(per)
				})
				return arr
			}
		},
		methods:{
			gotoLike(){
				uni.navigateTo({
					url:'../../pages/profile-like/profile-like'
				})
			}
		},
		onReady() {
			console.log(123132132);
			this.playInfo.forEach(item => {
				let {currentTime, duration}= item
				let per = currentTime/duration*100 + '%'				
				arr.push(per)
				console.log(currentTime, duration);
			})
		}
	}
</script>

<style lang="scss" scoped>
	.more-list{
			
		.list-item{
			padding-bottom: 20upx;
			.title-bar{
				background: #a1b4bd24;
				padding: 10upx 20upx;
				border-radius: 10upx;
				background-image: linear-gradient(180deg, #dfd8d8, #d9d1d1, #f5eef5);
				>view{
					flex: 1;
				}
			}
			.img-container{
				margin: 0 20upx;
				position: relative;
				margin-right: 20upx;
				
				image{
					width: 250upx;
					height: 150upx;
					border-radius: 16upx 16upx 0 0;	
					flex-shrink: 0;
				}
				>view:nth-of-type(1){
					width: 100%;
					position: absolute;
					bottom: 10upx;		
					height: 8upx;
					background: rgba(0,0,0,0.8);	
					border-radius: 6upx;
				}
				>view:nth-of-type(2){
					position: absolute;
					bottom: 10upx;		
					height: 8upx;
					background: $self-color-main;	
					border-radius: 6upx;
				}
				>view:nth-of-type(3){
					color: #FFFFFF;
					font-size: 20uxp;
					position: absolute;
					right: 10upx;
					bottom: 20upx;
					padding: 0 10upx;
					background: rgba(0,0,0,0.6);
					border-radius: 16upx 16upx 0 0;	
				}
			}
			
		}
	}
</style>
