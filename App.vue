<script>
	export default {
		onLaunch: function() {
			this.$store.dispatch('getDetailInfo',0)
			this.$store.dispatch('getRecommend',0)
			uni.getStorage({ // 先从本地读取用户信息保存到全局
			    key: 'user',
			    success(res) { 
			       getApp().globalData.userInfo = res.data.userInfo
				   getApp().globalData.playInfo =  res.data.playInfo	   
			    }
			});
			Promise.all([this.$api.callFunction('doWeekUpdate'),this.$api.callFunction('updateInfo')]).then(res=>{
				console.log(res);
			}).catch(err=>{
				Promise.all([this.$api.callFunction('doWeekUpdate'),this.$api.callFunction('updateInfo')])
				console.log(err);
			})
		},
		onHide: function() { 
			let playInfo = getApp().globalData.playInfo
			let userInfo = getApp().globalData.userInfo	
			uni.setStorage({
			    key: 'user',
				data:{
					 userInfo ,
					 playInfo
				},
			    success: (res)=> {		
					console.log(res);
					this.$api.updateDoc('users', {playInfo,userInfo})
			    }
			});
			
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url("/common/uni.css");
	/* 引入字体图标 */
	@import url("/common/iconfont.css");
	@import url("/common/iconfont1.css");
	@import url("/common/icon.css");

	/* 引入动画css */
	@import url("/common/animate.css");
	/* flex布局居中*/
	@import url("/common/flex.css");  

	
</style>
