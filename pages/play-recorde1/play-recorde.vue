<template>
	<view>
		<view class="title-bar u-f-drr u-f-jsb" @tap="isShowEdit">编辑</view>
		<!-- <block v-for="(item, index) in playInfo" :key="index"> -->
			<!-- <play-recorde-list-item :showEdit="showEdit" @longpresHandler="isShowEdit"></play-recorde-list-item> -->
		<view class="bottom-bar u-f-jsb" v-show="showEdit">
			<view class="u-f-ac">
				<view class="radio u-f-ajc icon iconfont" :class="{'icon-zhengque':selectedAll}" @tap="isSelect(-1)"></view>
				全选
			</view>
			<view class="u-f-ac right-btn">
				<view>删除</view>
				<view @tap="isShowEdit">取消</view>	
			</view>
			
		</view>
			
		<!-- </block> -->
	</view>
</template>

<script>
	import playRecordeListItem from "../../components/play-recorde/play-recorde-list-item.vue"
export default {
	data() {
		return {
			showEdit:true,
			selected:true,
			selectedAll:false,
			timePercent: {},
			currentTimeList:[],
			durationList:[],
			playInfo: [],
			
		};
	},
	// onLoad(data) {
	// 	let {timePercent,currentTimeList,durationList} = JSON.parse(data.obj);
	// 	this.timePercent = timePercent
	// 	this.currentTimeList = currentTimeList
	// 	this.durationList = durationList	
	// 	this.playInfo = getApp().globalData.playInfo;
	// },
	onReady() {
		console.log(this.playInfo);
		console.log(this.timePercent);
	},
	methods: {
		isShowEdit(){ // 是否显示编辑框
			this.showEdit = !this.showEdit
		},
		isSelect(num){ // -1 表示全选 其余的和index一一对应
			if(num === -1){
				this.selectedAll = !this.selectedAll
			}
		}
	},
	components:{
		playRecordeListItem
	}
};
</script>

<style lang="scss" scoped>
	
	.title-bar{
		width: 100%;
		padding: 10upx 20upx;
		box-sizing: border-box;
		height: 80upx;
		background: #EEEEEE;
	}
	.radio{
		width: 50upx;
		height: 50upx;
		border-radius: 100%;
		margin-right: 20upx;
		border: 1px solid $self-color-gray;
		&.icon-zhengque{
			background: $self-color-main;
			color: #FFFFFF;
		}
	}
	.bottom-bar{
		padding: 20upx 20upx;
		.right-btn{
			>view{
				padding: 0 10upx;
			}
		}
	}
	
.img-container {
	position: relative;
	margin-right: 20upx;

	image {
		width: 250upx;
		height: 150upx;
		border-radius: 16upx 16upx 0 0;
		flex-shrink: 0;
	}
	> view:nth-of-type(1) {
		width: 100%;
		position: absolute;
		bottom: 10upx;
		height: 8upx;
		background: rgba(0, 0, 0, 0.8);
		border-radius: 6upx;
	}
	> view:nth-of-type(2) {
		position: absolute;
		bottom: 10upx;
		height: 8upx;
		background: $self-color-main;
		border-radius: 6upx;
	}
	> view:nth-of-type(3) {
		color: #ffffff;
		font-size: 20uxp;
		position: absolute;
		right: 10upx;
		bottom: 20upx;
		padding: 0 10upx;
		background: rgba(0, 0, 0, 0.6);
		border-radius: 16upx 16upx 0 0;
	}
}
</style>
