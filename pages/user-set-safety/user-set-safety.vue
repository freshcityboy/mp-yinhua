<template>
	<view class="body">
		<input type="text" v-model="oldPassWord" placeholder="输入旧密码" password/>
		<input type="text" v-model="newPassWord" placeholder="输入新密码" password/>
		<input type="text" v-model="rePassWord" placeholder="输入确认密码" password/>
		<bottom-button-bar :text="'完成'" @tapEvent="submit" :isDisabled="isDisabled"></bottom-button-bar>
	</view>
</template>

<script>
	import bottomButtonBar from "../../components/common/bottom-button-bar.vue"
	export default {
		data() {
			return {
				oldPassWord:'',
				newPassWord:'',
				rePassWord:'',
			
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
				let {oldPassWord, newPassWord, rePassWord} = this
				console.log(oldPassWord.length , newPassWord.length,rePassWord.length );
				if(!oldPassWord.length || !newPassWord.length || !rePassWord.length){
					this.showModal('请填写完整')
				};
				if(newPassWord !== rePassWord){
					this.showModal('两次输入的新密码不一致');
				};				
				//密码强度检测
				// let pPattern = /^.*(?=.{6,}).*$/;
				// if(!pPattern.test(newPassWord)){
				// 	this.showModal('密码最少6位')
				// };
				return true
				
			},
			submit(){ //提交修改密码
				if(this.check()){
					uni.showLoading({
						title:''
					})
					//模拟
					setTimeout( () => {
					    uni.hideLoading();
						this.showModal('密码修改成功',()=>{
							uni.navigateBack({
								delta:1
							})
						});	
					}, 2000);
				}
			}
		},
		computed:{
			isDisabled(){
				let {oldPassWord, newPassWord, rePassWord} = this
				return !oldPassWord.length || !newPassWord.length || !rePassWord.length
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
