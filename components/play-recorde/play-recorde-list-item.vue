<template>
	<view>
		<view class="u-f list-item animated" :class="{'slideInLeft faster':showEdit}" @longpress="longpresHandler"  @tap="tapHandler">
			<view class="u-f-ajc animated fadeInRight fast"><view class="radio u-f-ajc icon iconfont" :class="[(selected || selectedAll)?'icon-zhengque':'']" v-if="showEdit"></view></view>
			<view class="img-container">
				<image :src="imgUrl" lazy-load mode="aspectFill"></image>
				<view></view>
				<view :style="{ width: timePercent[index] }"></view>
				<view>{{currentTime}} / {{duration}}</view>
			</view>
			<view class="right-area">
				<view class="name">{{name}}</view>
				<view>上次看到第<text space="nbsp">{{playIndex+1}}</text>集</view>
				{{formatTime}}
				
			</view>
		</view>
	</view>
</template>

<script>
	import time from "../../common/time.js"
	export default {
		props:{
			imgUrl:String,
			name:String,
			timeStamp:String,
			playIndex:Number,
			showEdit: Boolean,
			index:Number,
			currentTime:String,
			duration:String,
			selectedAll:Boolean
		},
		data(){
			return{
				selected:false
			}
		},
		computed:{
			formatTime(){ //

			return 	time.gettime(Number(this.timeStamp))
			}
		},
		methods:{
			longpresHandler(){
				this.$emit('longpresHandler')
			},
			tapHandler(){
				if(this.showEdit){
					this.selected = !this.selected 
					this.selected && this.$emit('selsect',this.index)
					!this.selected && this.$emit('noSelect',this.index)
				}
			}
		},
	}

</script>

<style lang="scss" scoped>
	
	.list-item{
		border-bottom: 1px solid $self-color-gray;
		padding: 20upx 20upx;
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
		.img-container {
			position: relative;
			margin-right: 20upx;
		
			image {
				width: 250upx;
				height: 170upx;
				
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
		.right-area{
			margin-left: 20upx;
			height: 150upx;
			font-size: 25upx;
			color: $self-color-word;
			.name{
				font-size: 30upx;
				color: #000000;
			}
		}
	}
</style>
