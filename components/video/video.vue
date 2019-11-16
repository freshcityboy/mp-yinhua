<template>
	<view>
		<!-- <page-head :title="title"></page-head> -->
		<view class="uni-common-mt" v-if="showVideo">
			<view>
				<video id="myVideo" page-gesture enable-danmu  danmu-btn controls autoplay
					:src="src" @fullscreenchange="fullscreenchange" @timeupdate="timeupdate"
				 @error="videoErrorCallback"  :danmu-list="danmuList"  poster="">
				</video>
			</view>
			<!-- #ifndef MP-ALIPAY || MP-TOUTIAO -->
			<view class="danmu-bar u-f-ac">
				<view class="uni-list-cell-db">
					<input v-model="danmuValue" class="uni-input" type="text" placeholder="输入弹幕内容" />
				</view>
				<button @click="sendDanmu" class="danmu-button" hover-class="active">发送弹幕</button>
			</view>
			<!-- #endif -->
			<view class="choose-video">
				<view class="u-f-jsb">
					<view class=" u-f">
						<view class="">选集</view>
						<view class="order u-f">
							<view :class="{'active animated pulse faster':order}" @tap="Order()">{{order?'正序':'逆序'}}</view>
													
						</view>
					</view>
					<view class="unfold" @tap="toggleShowList">
						展开列表
					</view>
				</view>
				<scroll-view class="u-f-ajc scroll-view animated " scroll-x="!showList" scroll-y="showList" :class="[showList?'video-list-y fadeInDown faster':'video-list-x fadeInUp  faster']">
					<block v-for="(item,index) in trimVideoUrl" :key="index">
						<view class="video-item " @tap="play(index)" :class="[index===playIndex?'active animated pulse faster':'']">第{{order?(index+1):(total-index)}}集</view>
					</block>
				</scroll-view>
			</view>
			<view class="video-info">
				<view class="bar-title">番剧信息</view>
				<view class="u-f">
					<image :src="item.imgUrl" lazy-load mode="widthFix"></image>
					<view class="right-area">
						<view class="name u-f-jsb">
							{{item.name}}
							
						</view>
						<view>地区: <text space="nbsp">{{item.nation}}</text></view>
						<view>类型:  
							<block v-for="(item,index) in item.style" :key="index">
								<text space="nbsp"> {{item}}</text>
							</block>
						</view>
						<view class="language">语言:<text space="nbsp">{{item.language}}</text></view>
						<view>年代:<text space="nbsp">{{item.year}}</text></view>
						<view>已更{{item.recentUpdate}}集</view>
						<view v-if="item.updateTime">每周{{week}} <text>{{item.updateTime}}</text>更新一集</view>
					</view>
					<view class="like">
						<view  :class="{active:isLike}" @tap="like(item.vID)">{{isLike?'已追番':'追番'}}</view>
					</view>
				</view>
				<view class="info"><text>{{item.info }}</text></view>
				
			</view>
		</view>
	</view>

</template>
<script>
	import api from '../../api/index.js'
	import {mapState} from "vuex"
	export default {
		props:{
			item:Object,
			trimVideoUrl:Array
		},
		data() {
			return {
				isLike:false,
				playIndex:0,
				showList: false,
				order:true,
				timeNum: 0,
				danmuValue: '',
				showVideo: true,
				src:'',
				time:0
			}
		},
		computed:{	
			...mapState(['danmuList']),
			total(){
				return this.trimVideoUrl.length
			},
			week(){
				let arr = ['日','一','二','三','四','五','六']
				return arr[this.item.updateDay]
			}
		},
		onReady: function(res) {
			
			let like = getApp().globalData.userInfo.like
			if(like.find(res => res.vID == this.item.vID)){
				this.isLike =  true
			}else{
				this.isLike = false
			}
			// #ifndef MP-ALIPAY || MP-TOUTIAO
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
			setTimeout(()=>{
				this.showVideo = true
			},350)
		},
		methods: {
			
			like(vID){ // 追番
				this.isLike = !this.isLike
				let like = getApp().globalData.userInfo.like
				
				let idx = like.findIndex(item => {
					return item.vID === vID
				})
				if(idx === -1){ // 如果数组中没有就添加，反之则删除
					const {reqDetailInfo} = api 
					reqDetailInfo({vID}).then(res => {
						let obj = Object.assign(res[0],{playIndex:this.playIndex})
						like.push(obj)
					})
					
				}else{
					like.splice(idx,1)
				}

			},
			toggleShowList(){
				this.showList = !this.showList
			},
			Order(){		
				this.trimVideoUrl = this.trimVideoUrl.reverse() 		
				this.order = !this.order
			},
			play(index){
				this.src = this.trimVideoUrl[index]
				this.playIndex = index
				// 获取弹幕资源
				let obj = {vID:this.item.vID, playIndex:index}	
				this.$store.dispatch('getDanMu', obj)
			},
			sendDanmu: function() {
				
				let {danmuValue, playIndex, time} = this
				let { vID } = this.item
				console.log(vID,'vid');
				let { openId } = getApp().globalData.userInfo
				let data = {
					openId,
					vID,
					time,
					playIndex ,
					text : danmuValue
				}
				this.danmuList.push(data)
				if(danmuValue === ''){
					uni.showToast({
						title:'弹幕空空如也哦~~'
					})
					return
				}
				this.$store.dispatch('addDanMu', data)
				this.danmuValue = '';
			},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: '抱歉！视频资源地址失效',
					showCancel: false
				})
			},
			timeupdate(e){
				// console.log(this.danmuList);
				let {currentTime, duration}= e.detail
				this.time = parseInt(currentTime) + 1.5 // 这里延迟1.5秒，让所发弹幕加载
				let playInfo = getApp().globalData.playInfo
				let timeStamp = Date.now()
				let obj = Object.assign(this.item,e.detail,{'playIndex':this.playIndex},{timeStamp})
				if( currentTime*10 <= 2 || currentTime > this.timeNum ){
					this.timeNum = currentTime + 5
					if( playInfo.length !== 0 && (playInfo[0].vID === this.item.vID)){ // 第一项必须存在，再判断vID是否相等
						playInfo.shift()
					}
					playInfo.unshift(obj) 
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	video {
		width: 100%;
		position: relative;
	}
	.danmu-bar{
		margin: 0 20upx;
		border-radius: 20upx;
		border: 1px solid #CCCCCC;
		.uni-input{
			border-radius: 20upx;
		}
		.danmu-button{
			font-size: 25upx;
			margin-right: 10upx;
			&.active{
				background: $self-color-main;
				box-shadow: 0 0 40upx $self-color-main;			
			}
		}
		
	}
	.reverse{
		flex-direction: row-reverse;
	}
	.choose-video{
		margin: 20upx;
		overflow: hidden;
		.order{
			margin-left: 20upx;
			>view{
				border: 1px solid $self-color-gray;
				padding: 0 20upx;
				margin-right: 20upx;
				border-radius: 10upx;
				&.active{
					color: $self-color-main;
					border-color: $self-color-main;
				}
			}
		}
		.unfold{
			font-size: 25upx;
			color: $self-color-word;
		}
		.video-list-y{
			width: 750upx;
			margin: 20upx 0;
			// display: flex;
			height: 300upx;	
			overflow: hidden;
			z-index: -111;
			.video-item{
				overflow: hidden;
				width: 20%;
				border: 1px solid $self-color-gray;
				box-sizing: border-box;
				text-align: center;
				padding: 0 10upx;
				border-radius: 10upx;
				margin: 14upx;
				display: inline-block;
				&.active{
					color: $self-color-main;
					border-color: $self-color-main;
				}
			}
		}
		.video-list-x{
			width: 100%;
			margin: 20upx 0;
			padding-right: 20ipx;
			display: flex;
			white-space: nowrap;
			.video-item{
				width: 20%;
				border: 1px solid $self-color-gray;
				box-sizing: border-box;
				text-align: center;
				padding: 0 10upx;
				border-radius: 10upx;
				margin-right: 14upx;
				display: inline-block;
				&.active{
					color: $self-color-main;
					border-color: $self-color-main;
				}
			}
		}
	
	}

	.video-info{
		margin: 20upx;
		.bar-title{
			font-size: 40upx;
			margin-bottom: 20upx;
			color: $self-color-word;
		}
		image{
			width: 300upx;
			border-radius: 16upx;
			margin-right: 20upx;
			flex-shrink: 0;
		}
		.right-area{
			flex: 1;
			.name{
				font-size: 30upx;
				
			}
			text{
				margin: 0 10upx;
			}
		}
		.info{
			margin-top: 20upx;
			color: $self-color-word;
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
