<script>
	export default {
  
		onLaunch: function() {
			
			this.$store.dispatch('getDetailInfo',0)
			this.$store.dispatch('getRecommend',0)
			uni.getStorage({ // 先从本地读取用户信息保存到全局
			    key: 'userInfo',
			    success(res) { 
			       getApp().globalData.userInfo = res.data
				   getApp().globalData.playInfo = [] 
				   console.log(res.data);
			    }
			});
			// uni.removeStorage({  // 开发阶段先不保存数据
			//     key: 'userInfo',
			//     success: function (res) {
			//         console.log('success');
			//     }
			// });	
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
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
