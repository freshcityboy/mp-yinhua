<template>
	<view>
		<getUserInfo></getUserInfo>
		<view class="head-bar">
			<view class="search u-f-ajc"  @tap="gotoSearch">
				<view class="icon iconfont icon-sousuo"></view>
				<view>来搜索看看有没有你想要的番剧吧</view>
			</view>
		</view>
		<view class="index-list">
			<block v-for="(item,index) in recommend" :key="index" >
				<index-list-item :item="item"></index-list-item>
			</block>
		</view>
		
		<uni-load-more :status="status" :content-text="contentText" color="#007aff" />
	</view>
</template>

<script>
	import getUserInfo from "../../components/common/getUserInfo.vue"
	import indexListItem from "../../components/index/index-list-item.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				isLike:false,
				count:0,  // 用来记录无限列表的分页加载
				total:0, // 总记录数
				status: 'loading', // loading noMore
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				}
			}
		},
		computed:{
			...mapState(['recommend'])
		},
		methods: {
			gotoSearch(){
				uni.navigateTo({
					url:'../search/search'
				})
			}
		},
		onReady() {
			wx.cloud.callFunction({ 
			  // 要调用的云函数名称
			  name: 'getAllCount',
			  success: res => { 
				this.total = res.result.total
				console.log(this.total);
			  },
			  fail: err => {
				  console.log(err);
				
			  }
			})	
		},
		onReachBottom(){
			this.count++
			console.log(this.count);
			this.status = 'loading'
			if(this.count >= this.total/10){
				setTimeout(()=>{
					this.status = 'noMore'
				},500)
				return
			}
			this.$store.dispatch('getRecommend',this.count)
		},
		components:{
			getUserInfo,
			indexListItem,
			uniLoadMore
		}
	}
</script>

<style lang="scss" scoped>
	.head-bar{
		position: fixed;
		background: #FFFFFF;
		width: 100%;
		top: 0;
		.search{
			margin: 20upx 40upx;
			height: 60upx;
			// background: #E5E5E5;
			border-radius: 16upx;
			color: $self-color-gray;
			border: 1px solid $self-color-gray;
			box-shadow: 1px 1px 1px $self-color-gray;
		}
	}
	
	.index-list{
		margin: 20upx;
		margin-top: 120upx;
	}
</style>
