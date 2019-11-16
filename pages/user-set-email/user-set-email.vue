<template>
	<view>
		<view class="body">
			<input type="text" v-model="email" placeholder="请输入需要绑定的邮箱" />
			<input type="text" v-model="password" placeholder="请输入新密码" password/>
			<bottom-button-bar :text="'完成'" @tapEvent="submit" :isDisabled="isDisabled"></bottom-button-bar>
		</view>
	</view>
</template>

<script>
	import bottomButtonBar from "../../components/common/bottom-button-bar.vue"
	export default {
		data() {
			return {
				email:'',
				password:''
			}
		},
		computed:{
			isDisabled(){
				let {email,password} = this
				return !email.length || !password.length
				// return true
			}
		},
		methods: {
			showModal(title,callback){
				uni.showModal({
					title,
					showCancel:false,
					success:callback
				})
			},
			check(){
				var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				if(!ePattern.test(this.email)){
					this.showModal('请输入正确的邮箱')
				}
				return true
			},
			submit(){ //提交绑定邮箱
				if(this.check()){
					uni.showLoading({
						title:''
					})
					//模拟
					setTimeout( () => {
					    uni.hideLoading();
						this.showModal('绑定成功',()=>{
							uni.navigateBack({
								delta:1
							})
						});
					}, 2000);
				}
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index === 0) {
				uni.navigateBack({
					delta:1
				})
			}
		},
		components:{
			bottomButtonBar
		}
	}
</script>

<style lang="less" scoped>
	@import '../../common/user-input.less';
</style>
