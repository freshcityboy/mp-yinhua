<template>
	<view class="body">
		<view class="list u-f-jsb">
			<view class="left">头像</view>
			<view class="right u-f-ac">
				<image :src="userpic" mode="aspectFill"></image>
				<text ></text>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>	
		<view class="list u-f-jsb">	
			<view class="left">昵称</view>
			<view class="right u-f-ac">
				<input  type="text" v-model="username" />
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>	
		<view class="list u-f-jsb" >
			<view class="left">性别</view>
			<view class="right u-f-ac" @tap="showPicker('sex')">
				
				<text >{{sex}}</text>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="list u-f-jsb">
			<view class="left">生日</view>
			<view class="right u-f-ac" @tap="showPicker(true)">
				<!-- 日期选择器 -->
				<picker mode="date" :value="birthday" :start="startDate" :end="endDate" @change="bindDateChange">
							 <view class="uni-input">{{birthday}}</view>
				</picker>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="list u-f-jsb" >
			<view class="left">情感</view>
			<view class="right u-f-ac" @tap="showPicker('emotion')">
				
				<text >{{emotion}}</text>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="list u-f-jsb">	
			<view class="left">职业</view>
			<view class="right u-f-ac"  @tap="showPicker('job')">
				
				<text>{{job}}</text>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="list u-f-jsb">	
			<view class="left">家乡</view>
			<view class="right u-f-ac" @tap="showMulLinkageThreePicker">
				<text>{{home}}</text>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>	
		<!-- 多列选择器 -->
		<view class="mpvue-picker">
			<!-- 单列选择器 -->
			<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
			 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
			 <!-- 三列城市选择器 -->
			 <mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
			  @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
		</view>
		
		 
		
		<bottom-button-bar :text="'完成'" @tapEvent="submit" :isDisabled="false"></bottom-button-bar>
	</view>
</template>

<script>
	import bottomButtonBar from "../../components/common/bottom-button-bar.vue"
	// https://github.com/zhetengbiji/mpvue-picker
	import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
	// https://github.com/zhetengbiji/mpvue-citypicker
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '../../common/city.data.js';
	
	let sexarr=[{label: '保密',value: 1},{label: '男',value: 2},{label: '女',value: 3}]
	let emotionarr=[{label: '保密',value: 1},{label: '未婚',value: 2},{label: '已婚',value: 3}]
	let jobarr=[{label: '老师',value: 1},{label: '公务员',value: 2},{label: '职业经理',value: 3},{label: 'IT',value: 3},{label: '厨师',value: 3}]
	export default {
		data() {
			return {
				username:'似乎岁',
				userpic:'../../static/demo/userpic/14.jpg',
				sex:'男',
				birthday:'2000-10-10',
				emotion:'未婚',
				home:'浙江杭州',
				job:"IT",
				email:'',
				password:'',
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[]
			}
		},
		computed:{
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
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
			submit(){ //提交信息
				uni.showLoading({
					title:''
				})
				//模拟
				setTimeout( () => {
				    uni.hideLoading();
					this.showModal('修改成功',()=>{
						uni.navigateBack({
							delta:1
						})
					});
				}, 2000);
			},
			onCancel(e) {
				console.log(e)
			},
			showPicker(type){
				let arr=[];
				switch (type){
					case 'sex':
					arr = sexarr
						break;
					case 'job':
					arr = jobarr
						break;
					case 'emotion':
					arr = emotionarr
						break;	
					default:
						break;
				}
				console.log(arr);
				this.showSinglePicker(arr)
			},
			// 单列
			showSinglePicker(arr) {
				this.pickerValueArray = arr
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},

			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.home = e.label
			},
			//日期选择结果
			bindDateChange(e) {
				console.log(e);
			    this.birthday = e.target.value
			 },
			 getDate(type) {
				 const date = new Date();
				 let year = date.getFullYear();
				 let month = date.getMonth() + 1;
				 let day = date.getDate();
	 
				 if (type === 'start') {
					 year = year - 60;
				 } else if (type === 'end') {
					 year = year + 2;
				 }
				 month = month > 9 ? month : '0' + month;;
				 day = day > 9 ? day : '0' + day;
				 return `${year}-${month}-${day}`;
			}
			
		},
		onUnload() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel()
			}
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
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
			bottomButtonBar,
			mpvuePicker,
			mpvueCityPicker
		}
	}
</script>

<style lang="less" scoped>
	.body{
		margin: 0 40upx;
		.list{
			height: 120upx;
			border-bottom: 1px solid #EEEEEE;
			input{
				text-align: right;
			}
		
			.right{
				image{
					width: 80upx;
					height: 80upx;
					border-radius: 100%;
					flex-shrink: 0;
				}
				.iconfont{
					margin-left: 20upx;
					color: #A2A2A2;
				}
			}
			.left{
				color: #9A9A9A;
			}
		}
	}

</style>
