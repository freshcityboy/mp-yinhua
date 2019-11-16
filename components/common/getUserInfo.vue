<template>
	<view>
		<mask-layer :show="showMask" @toggleShow="toggleShow"></mask-layer>
		<view class="getUserInfo" v-if="showTip">
			<view class="logn-tip u-f-ajc">小程序需要获取您的用户信息(包括头像、昵称等信息)</view>
			<view class="shouquan u-f-ajc">
				<button type="default" hover-class="active" @getuserinfo="getuserinfo" open-type="getUserInfo">确认授权</button>
			</view>
		</view>
	</view>
</template>

<script>
	import maskLayer from "../../components/common/mask-layer.vue"
	export default {
		data() {
			return {
				showTip:false,
				showMask:false
	
			}
		},
		
		methods: {
			
			getuserinfo(e){
				let {userInfo} = e.detail
				userInfo.like = []
				wx.cloud.callFunction({ // 调用云函数读取用户信息
				  // 要调用的云函数名称
				  name: 'login',
				  success: res => { //利用assign 将两个对象合并起来
					userInfo = Object.assign(userInfo,res.result.event.userInfo)	 
					getApp().globalData.userInfo  = userInfo
					getApp().globalData.playInfo = [] 
					uni.setStorage({
					    key: 'userInfo',
						data: userInfo ,
					    success: function (res) {		
					      // console.log(res);
					    }
					});
				  },
				  fail: err => {
					uni.showModal({
						title:'获取用户信息失败'
					})
				  }
				})	
				this.showTip = false
				this.showMask = !this.showMask
			},
		},
		onReady() {
			let userInfo = getApp().globalData.userInfo
			if(!userInfo) {
				this.$nextTick(()=>{
					this.showTip = true
					this.showMask = true				
				})
			}
		},
		components:{
			maskLayer,
		}
	}
</script>
	
<style lang="scss" scoped>
	

	
	.getUserInfo{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		width: 600upx;
		height: 400upx;
		background: $self-color-main;
		border-radius: 20upx;
		.logn-tip{
			position: absolute;
			width: 500upx;
			left: 50%;
			top: 15%;
			color: #FFFFFF;
			transform: translateX(-50%);
		}
		.shouquan{
			position: absolute;
			
			left: 50%;
			top: 50%;
			transform: translateX(-50%);
			z-index: 10000;
			button{
				background: #FFFFFF;
				border-radius: 20upx;
				color: $self-color-main;
				border: 2px solid $self-color-gray;
				&.active{
					background: #E5E5E5;
					border: 1px solid $self-color-gray;
				}
			}
		}
	}
</style>

