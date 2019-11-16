<template>
	<view>
		<uni-popup :show="show" ref="popup" :type="type" @change="change">
			<view class="bulletin">
				<view class="u-f-ajc">
					<image src="../../static/demo/页面%201.png" mode="widthFix"></image>
				</view>
				<view class="bulletin-text">
					<view>1、涉及黄色，政治，广告及骚扰信息</view>
					<view>2、涉及人身攻击	</view>
					<view>3、留联系方式，透露他人隐私</view>
					<view>一经核实将被封禁，情节严重者永久封禁</view>
				</view>
				<button type="default"  @tap="closeBulletin">朕知道了</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				show: true, 
				type: 'center',
			};
		},
		methods:{
			closeBulletin () { // 调用子组件的close方法关闭公告
				console.log(this.$refs.popup)
				this.$refs.popup.close(true)
			},
			// change (val) {
			// 	this.show = val
			// }
		},
		components:{
			uniPopup
		}
	}
</script>

<style lang="less">
.u-f-ajc{
		width: 100%;
		heigh: 100%;
		image{
			width:50%;	
		}
	}
	.bulletin{
		.bulletin-text{
			text-align: left;
		}
		button{
			margin-top: 10upx;
			background: #FEE934 !important;
		}
	}
</style>
