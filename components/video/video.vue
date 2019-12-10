<template>
	<view >
		<view >
			<view  class="animated fadeIn fast videoContainer" v-if="showVideo">
				<video @tap.capture="toggleShowView" id="myVideo" page-gesture enable-danmu :controls="showView" danmu-btn autoplay
					:src="src" @timeupdate="timeupdate" @error="videoErrorCallback"  :danmu-list="danmuList"  poster="" 
					 @fullscreenchange="isFullscreenchange = !isFullscreenchange" :initial-time="initTime"
				  >
					<!-- <view class="mask" @tap="toggleShowView"></view> -->
					<view class="back icon iconfont icon-fanhui" @tap="back" v-if="showView && isFullscreenchange"></view>					
					<view class="head-danmu" v-show="showView && isFullscreenchange && !isInputing" @tap="inputTap">
						<input type="text" v-model="danmuValue" placeholder="我馋你弹幕">	
					</view>
					<view class="input-bar active" v-show="showView && isFullscreenchange && isInputing">
						<input type="text" v-model="danmuValue" placeholder="请文明发炎">{{danmuValue}}
						<button type="primary" @tap="sendDanmu">发送</button>
					</view>
					<view class="head-info" v-if="showView">
						<view class="time">{{localTime}}</view>
						<view class="battery">
							<view></view>
							<view class="battery-info" :style="{width:battery}" :class="{'active':isCharging}"></view>
						</view>
					</view>

				</video>
			</view>
			<!-- #ifndef MP-ALIPAY || MP-TOUTIAO -->
			
			<!-- #endif -->
			<view class="animated fadeInUp faster" v-show="!isFullscreenchange">
				<view class="danmu-bar u-f-ac">
					<view class="uni-list-cell-db">
						<input v-model="danmuValue" class="uni-input" type="text" placeholder="输入弹幕内容" />
					</view>
					<button @click="sendDanmu" class="danmu-button" hover-class="active">发送弹幕</button>
				</view>
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

						<block v-for="num in total" :key="num">
							<view class="video-item " @tap="play(num)" :class="[num===playIndex?'active animated pulse faster':'']">第{{order?(num+1):(total - num)}}集</view>
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
	</view>

</template>
<script>
	import api from '../../api/index.js'
	import {mapState} from "vuex"
	
	var timer;
	export default {
		props:{
			item:Object,
			trimVideoUrl:Array
		},
		data() {
			return {
				isLike:false,
				playIndex:null,
				showList: false,
				order:true,
				timeNum: 0,
				danmuValue: '',
				showVideo: true,
				src:'',
				danmuTime:0, // 发送弹幕的时间
				isCharging: wx.getBatteryInfoSync().isCharging,
				showView:false,
				isFullscreenchange:false,
				isInputing:false,
				time: 0  ,// 本地时间戳，用来模拟双击暂停播放
				isPlaying:true ,//是否在播放
				timer:'', // 定时器
			}
		},
		computed:{	
			...mapState(['danmuList']),
			initTime(){
				return this.item.currentTime
			},
			total(){
				if(!this.trimVideoUrl.length){
					return Number(this.item.recentUpdate)
				}else{
					return this.trimVideoUrl.length
				}
			},
			week(){
				let arr = ['日','一','二','三','四','五','六']
				return arr[this.item.updateDay]
			},
			battery(){
				return  `${wx.getBatteryInfoSync().level}%`
			},
			localTime(){
				let now = new Date(this.time)
				let hour = now.getHours()
				let minu = now.getMinutes()
				if(minu < 10){ minu = `0${minu}` }
				return `${hour}:${minu}`
				
			}	
		},
		onReady: function(res) {
			console.log(this.item);
			this.time = Date.now()
			timer = setInterval(()=>{ // 每分钟获取一次时间戳，用来同步显示时间
				this.time = Date.now()
			},60000)
			
			let like = getApp().globalData.userInfo.like
			if(like.find(res => res.vID == this.item.vID)){
				this.isLike =  true
			}else{
				this.isLike = false
			}
			// #ifndef MP-ALIPAY || MP-TOUTIAO
			this.videoContext = uni.createVideoContext('myVideo',this)
			// #endif
			setTimeout(()=>{
				this.showVideo = true
			},500)
			
			//根据记录跳转跳转播放
			this.item.currentTime && this.seek()
			console.log(this.item.currentTime );
		},
		onHide() {
			clearInterval(timer)
		},
		methods: {
			seek(){ //用来跳转到上次播放的时间
				this.playIndex = this.item.playIndex
				this.src = this.trimVideoUrl[this.playIndex]
			},
			inputTap(){ //点击发送弹幕输入框是暂停播放
					this.isInputing=!this.isInputing
					this.isPlaying = false
					this.videoContext.pause()	
			},
			onclick(){
				console.log(123);
			},
			back(){ // 退出全屏
				this.videoContext.exitFullScreen()
			},
			isValidTap(e){// 验证在video上的点击结果是否有效
				let {y} = e.detail ;//点击的y 坐标
				let screenHeight;
				uni.getSystemInfo({
				    success: function (res) {
				      screenHeight =  res.screenHeight
				    }
				});
				if(this.isFullscreenchange){//如果是全屏下
					let result = y> screenHeight*0.1 && y < screenHeight*0.9
					if(!result){
						return false
					}
				}
			},
			toggleShowView(e){
				// if(!this.isValidTap(e)){ return } //若点击不在范围内则不进行下一步
				let {y} = e.detail ;//点击的y 坐标
				let screenHeight;
				uni.getSystemInfo({
				    success: function (res) {
				      screenHeight =  res.screenHeight
				    }
				});
				if(this.isFullscreenchange){//如果是全屏下
					let result = y> screenHeight*0.15 && y < screenHeight*0.9
					if(!result){
						return false
					}
				}
				
				this.showView = !this.showView
				//如果连续两次的间隔时间过短，就认为是双击暂停播放
				let time = Date.now() 
				if(time-this.time < 300){
					console.log(123);
					this.isPlaying = !this.isPlaying
					this.isPlaying && this.videoContext.pause()
					!this.isPlaying && this.videoContext.play()
				}
				this.time = time
				console.log(this.isPlaying);
				if(this.showView && !this.isInputing){ //如果view图层显示，则在延迟3秒钟后自动关闭
					clearTimeout(this.timer)
					this.timer = setTimeout(()=>{
						this.showView = false
					},3000)
				}
		
			},
			
			like(vID){ // 追番
				this.isLike = !this.isLike
				let like = getApp().globalData.userInfo.like
				
				let idx = like.findIndex(item => {
					return item.vID === vID
				})
				if(idx === -1){ // 如果数组中没有就添加，反之则删除
					let obj = Object.assign(this.item,{playIndex:this.playIndex})
					console.log(obj);
					like.push(obj)
					
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
				console.log(index,this.trimVideoUrl);
				this.playIndex = index
				// 获取弹幕资源
				let obj = {vID:this.item.vID, playIndex:index}	
				this.$store.dispatch('getDanMu', obj)
			},
			sendDanmu: function() {
				this.isPlaying = true
				this.videoContext.play()
				this.isInputing = !this.isInputing
				let {danmuValue, playIndex, danmuTime} = this
				if(danmuValue === ''){
					uni.showToast({
						title:'弹幕空空如也哦~~'
					})
					return
				}
				
				let { vID } = this.item
				let { openId } = getApp().globalData.userInfo
				let data = {
					openId,
					vID,
					time:danmuTime,
					playIndex ,
					text : danmuValue,
					color : '#FFFFFF'
				}
				console.log(danmuTime);
				this.videoContext.sendDanmu({
				                text: danmuValue,
				                color: '#4d9df5'
				            })
				
				this.danmuValue = '';
				this.$store.dispatch('addDanMu', data)
			},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: '抱歉！视频资源地址失效',
					showCancel: false
				})
			},
			timeupdate(e){ // 在播放时记录当前已经播放的时间
				
				let {currentTime, duration}= e.detail
				this.danmuTime = parseInt(currentTime) 
				let playInfo = getApp().globalData.playInfo
				let timeStamp = Date.now()
				let obj = Object.assign(this.item,e.detail,{'playIndex':this.playIndex},{timeStamp})
				if( currentTime*10 <= 2 || currentTime > this.timeNum ){
					!this.isPlaying && (this.isPlaying = true) //播放时自动将isPlaying设为true
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
	
	.videoContainer{
		width: 100%;
		z-index: 99999;
	}
	video {
		width: 100%;
		position: relative;
		.input-bar{
			position: absolute;
			left: 50%;
			top: 14upx;
			transform: translateX(-50%);
			width: 50%;
			height: 60upx;
			color: #FFFFFF;
			margin: 10upx 0;
			margin-right: 50upx;
			padding-left: 10upx;
			border-radius: 10upx;
			border: 1px solid $self-color-gray;
			white-space: nowrap;
			text-overflow: ellipsis;
			// overflow: hidden;
			>input{
				position: absolute;
				width: 70%;
				height: 100%;
				color: rgba(255,255,255,0)
			}
			>button{
				position: absolute;
				right: -80upx;
				top: 0;
				width: 80upx;
				height: 60upx;
				font-size: 30upx;
				line-height: 60upx;
				padding: 0;
				background: $self-color-gray;
				text-align: center;
				
			}
			
		}
		.mask{
			position: absolute;
			width: 70%;
			height: 50%;
			left: 50%;
			transform: translateX(-50%);
			top: 20%;
		}
		.back{
			position: absolute;
			left: 3%;
			top: 18upx;
			width: 50upx;
			font-size: 50upx;
			font-weight: bold;
			color: #FFFFFF;
		}
		.head-danmu{
			position: absolute;
			top: 14upx;
			left: 50%;
			transform: translateX(-50%);
			border-radius: 10upx;
			box-sizing: border-box;
			padding: 5upx;
			width: 25%;
			height: 60upx;
			text-align: center;
			line-height: 40upx;
			color: #FFFFFF;
			background: rgba(255,255,255,0.2);
			input{
				border: 1px solid #FFFFFF;
				border-radius: 10upx;
				padding: 0 20upx;
				&:active{
					color: rgba($color: #000000, $alpha: 0);
				}
			}
			
		}
		.head-info{
			position: absolute;
			left: 85%;
			top: 14upx;
			display: flex;
			.time{
				color: #FFFFFF;
				// height: 25upx;
				margin-right: 12upx;
			}
			.battery{
				position: relative;
				color: #FFFFFF;
				border: 1px solid #FFFFFF;
				width: 40upx;
				height: 25upx;
				box-sizing: border-box;
				padding: 4upx;
				margin-top: 12upx;
				border-radius: 6upx;
				
				>view:first-child{
					position: absolute;
					right: -4upx;
					top: 50%;
					transform: translateY(-50%);
					height: 10upx;
					width:4upx;
					background: #FFFFFF;
				}
				>view:nth-child(2){
					width: 100%;
					height: 100%;
					background: #FFFFFF;
					&.active{
						background: #09BB07;
					}
				}
			}
		}
		
		
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
