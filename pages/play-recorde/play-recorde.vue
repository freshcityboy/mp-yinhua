<template>
	<view>
		<view class="title-bar u-f-drr u-f-jsb" @tap="isShowEdit">编辑</view>
		<block v-for="(item, index) in playInfo" :key="index">  
			<play-recorde-list-item 
				:showEdit="showEdit" 
				:index="index" 
				:imgUrl="item.imgUrl" 
				:name="item.name"
				:timeStamp="item.timeStamp"
				:playIndex="item.playIndex"
				:selectedAll="selectedAll"
				:currentTime="currentTimeList[index]"
				:duration="durationList[index]"
				@longpresHandler="isShowEdit" 
				@selsect="selsect" 
				@noSelect="noSelect">
			</play-recorde-list-item>
		</block>	
		<view class="bottom-bar u-f-jsb animated fadeInUp fast" v-show="showEdit">
			<view class="u-f-ac">
				<view class="radio u-f-ajc icon iconfont" :class="{'icon-zhengque':selectedAll}" @tap="selsect(-1)"></view>
				全选
			</view>
			<view class="u-f-ac right-btn">
				<view class="delete" :class="{active:deleteClass}" @tap="delRecorde">删除</view>
				<view @tap="isShowEdit">取消</view>	
			</view>
			
		</view>

	</view>
</template>

<script>
	import playRecordeListItem from "../../components/play-recorde/play-recorde-list-item.vue"

export default {
	data() {
		return {
			showEdit:false,
			selectedAll:false,
			selsetedArr:[],
			timePercent: {},
			currentTimeList:[],
			durationList:[],
			playInfo: [],
			
		};
	},
	computed:{
		deleteClass(){
			return this.selsetedArr.length !== 0 || this.selectedAll
		}
	},
	onLoad(data) {
		let {timePercent,currentTimeList,durationList} = JSON.parse(data.obj);
		console.log(data.obj);
		this.timePercent = timePercent
		this.currentTimeList = currentTimeList
		this.durationList = durationList	
		this.playInfo = getApp().globalData.playInfo;
	},
	onReady() {
		console.log(this.playInfo[0].timeStamp);
	},
	methods: {
		isShowEdit(){ // 是否显示编辑框
			this.showEdit = !this.showEdit
		},
		selsect(num){ // -1 表示全选 其余的和index一一对应
			if(num === -1){
				this.selectedAll = !this.selectedAll
			}else{
				
				this.selsetedArr.push(num)
				console.log(this.selsetedArr,111);
			}
		},
		noSelect(num){
			this.selsetedArr = this.selsetedArr.filter(item => {
				return item != num
			})
			console.log(this.selsetedArr,222);
		},
		delRecorde(){
			uni.showModal({
				title:'清除已选中的历史记录吗？',
				success: res => {
				        if (res.confirm) {
							let playInfo = getApp().globalData.playInfo 
				            this.selectedAll && (playInfo = []) && (this.playInfo = [])
							if(!this.selectedAll ) { // 当没有全选时，遍历已选数组，删除对应下标
								this.selsetedArr.forEach( num => {
									playInfo = playInfo.filter((item, index) => index !== num)
									this.playInfo.splice(num,1)
								})
							}
							this.selsetedArr = []
						}
				}
			})
		}
	},
	components:{
		playRecordeListItem
	}
};
</script>

<style lang="scss">
	
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
		width: 100%;
		position: fixed;
		bottom: 0;
		font-size: 35upx;
		line-height: 30upx;
		padding: 40upx 20upx;
		.right-btn{
			margin-right: 40upx;
			>view{
				padding: 0 10upx;	
			}
			.delete{
				color: $self-color-word;
				&.active{
					color: $self-color-main;
				}
			}
		}
	}
	
	
</style>
