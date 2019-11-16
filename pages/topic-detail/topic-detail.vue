<template>
	<view>
		<view class="head-bg">
			<image src="../../static/demo/topicpic/10.jpeg" mode=""></image>
		</view>
		<view class="head">
			<view class="list-one u-f-ac">
				<image src="../../static/demo/topicpic/10.jpeg" mode="widthFix"></image>
				<view>#忆往事，敬余生#</view>
			</view>
			<view class="list-two u-f-ac">
				<view>动态 793</view>
				<view>今日 641</view>
			</view>
			<view class="list-three">面试官: 在电梯里面巧遇马云您会做什么？90后女孩的回答当场被录用</view>
		</view>
		<view class="content">
			<view class="head-tab">
				<headTab :tabBars="tabBars" :currentIdx="currentIdx" @ontabtap="ontabtap"></headTab>
			</view>
			<view class="list">
				<block v-for="(list,index) in lists" :key="index">
					<view v-if="index===currentIdx">
						<block v-for="(item,index1) in list" :key="index1">
							<self-list :item="item"></self-list>	
						</block>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import headTab from "../../components/index/head-tab.vue"
	import selfList from "../../components/self-list/self-list.vue"
	export default {
		data() {
			return {
				currentIdx:0,
				tabBars:[
					{
						name: '默认',
						id: 'moren'
					},
					{
						name: '最新',
						id: 'zuiixn'
					}
				],
				lists:[ //lists为2维数组，lists[0] 是默认. lists[1] 是最新
					[
						{
							username:'三只鱼，我是默认',
							userpic:'../../static/demo/userpic/1.jpg',
							sex:'男',
							age:'28',
							title:'六道快手家常菜，好吃又下饭',
							imageurl:'../../static/demo/banner1.jpg',
							articalInfo:'从120斤到85斤我的反转人生,',
							vediourl:'',
							meadiaInfo:'',
							position:'深圳 龙岗',
							isshare: false,
							islike: false,
							isfocus: false,
							interaction:{
								share:10,
								comment:10,
								like:10,
							}	
						},
						{
							username:'三只鱼',
							userpic:'../../static/demo/userpic/1.jpg',
							sex:'女',
							age:'28',
							title:'六道快手家常菜，好吃又下饭',
							imageurl:'',
							vediourl:'../../static/demo/banner1.jpg',
							meadiaInfo:'',
							position:'深圳 龙岗',
							isshare: false,
							islike: false,
							isfocus: false,
							interaction:{
								share:10,
								comment:10,
								like:10,
							}	
						},
						{
							username:'三只鱼',
							userpic:'../../static/demo/userpic/1.jpg',
							sex:'男',
							age:'28',
							title:'六道快手家常菜，好吃又下饭',
							imageurl:'../../static/demo/banner3.jpg',
							vediourl:'../../static/demo/banner1.jpg',
							meadiaInfo:'',
							position:'深圳 龙岗',
							isshare: false,
							islike: false,
							isfocus: false,
							interaction:{
								share:10,
								comment:10,
								like:10,
							}	
						}
					],
					[
						{
							username:'三只鱼，我是最新',
							userpic:'../../static/demo/userpic/1.jpg',
							sex:'男',
							age:'28',
							title:'六道快手家常菜，好吃又下饭',
							imageurl:'../../static/demo/banner1.jpg',
							articalInfo:'从120斤到85斤我的反转人生,',
							vediourl:'',
							meadiaInfo:'',
							position:'深圳 龙岗',
							isshare: false,
							islike: false,
							isfocus: false,
							interaction:{
								share:10,
								comment:10,
								like:10,
							}	
						},
						{
							username:'三只鱼',
							userpic:'../../static/demo/userpic/1.jpg',
							sex:'男',
							age:'28',
							title:'六道快手家常菜，好吃又下饭',
							imageurl:'../../static/demo/banner2.jpg',
							vediourl:'../../static/demo/banner1.jpg',
							meadiaInfo:'',
							position:'深圳 龙岗',
							isshare: false,
							islike: false,
							isfocus: false,
							interaction:{
								share:10,
								comment:10,
								like:10,
							}	
						},
						{
							username:'三只鱼',
							userpic:'../../static/demo/userpic/1.jpg',
							sex:'男',
							age:'28',
							title:'六道快手家常菜，好吃又下饭',
							imageurl:'../../static/demo/banner3.jpg',
							vediourl:'../../static/demo/banner1.jpg',
							meadiaInfo:'',
							position:'深圳 龙岗',
							isshare: false,
							islike: false,
							isfocus: false,
							interaction:{
								share:10,
								comment:10,
								like:10,
							}	
						}
					]
				]
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index === 0) {
				uni.navigateBack({
					delta:1
				})
			}else if(e.index === 1){
				
			}
		},
		methods: {
			ontabtap(index){
				this.currentIdx = index
			}
		},
		components:{
			headTab,
			selfList
		}
	}
</script>

<style lang="less" scoped>
	.head-bg{
		height: 400upx;
		overflow: hidden;
		image{
			width: 100%;
			height: 400upx;
			filter: blur(10upx);
		}
	}
	.head{
		margin: -114upx 20upx 0 20upx;
		.list-one{
			image{
				width: 30%;
				border-radius: 16upx;
			}
			>view{
				margin-top: 50upx;
				font-size: 40upx;
			}
		}
		.list-two{
			margin: 20upx 0;
			color: #B1B1B1;
		}
		.list-three{
			font-size: 28upx;
			color: #AEAEAE;
		}
	}	
</style>
