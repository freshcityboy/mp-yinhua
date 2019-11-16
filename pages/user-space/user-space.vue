<template>
	<view>
		<view class="menu animated fadeIn fast" v-if="isShowMenu">
			<view class="defriend icon iconfont icon-sousuo">拉黑</view>
			<view class="remark icon iconfont icon-correct">备注</view>
		</view>
		<view class="space-head u-f-ajc">
			<image src="../../static/demo/datapic/32.jpg" mode="widthFix"></image>
			<view class="userinfo u-f-dc u-f-ajc">
				<image src="../../static/demo/userpic/6.jpg" mode="widthFix"></image>
				<view class="username u-f-ajc">红肥绿瘦<sex-bar :sex="sex">{{age}}</sex-bar></view>
				<view class="attention icon iconfont" :class="[isAttention?'active':'icon-zengjia']" @tap="toggleAttention">{{isAttention?'已关注':'关注'}}</view>
			</view>
			<view class="user-status">
				<home-state :list="list"></home-state>
			</view>
		</view>
		<view class="body ">
			<headTab :tabBars="tabBars" :currentIdx="currentIdx" @ontabtap="ontabtap"></headTab>
			<view>
				<view class="homepage animated fadeIn fast" v-if="currentIdx===0">
					<view class="accountinfo">
						<view>账号信息</view>
						<view>糗龄：1年8月6日</view>
						<view>糗百ID：1215</view>
					</view>
					<view class="personinfo">
						<view>个人信息</view>
						<view>星座：天蝎座</view>
						<view>职业：老师</view>
						<view>家乡：广东-广州</view>
					</view>
				</view>
				<view class="anecdote" v-if="currentIdx===1">
					<view class="list">
						<block v-for="(list,index) in lists" :key="index">
							<view v-if="index===currentIdx-1">
								<block v-for="(item,index1) in list" :key="index1">
									<self-list :item="item"></self-list>	
								</block>
							</view>
						</block>
					</view>
				</view>
				<view class="news" v-if="currentIdx===2">
					<view class="list">
						<block v-for="(list,index) in lists" :key="index">
							<view v-if="index===currentIdx-1">
								<block v-for="(item,index1) in list" :key="index1">
									<self-list :item="item"></self-list>	
								</block>
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>
		<!-- mask层 -->
		<mask-layer :show="isShowMenu" :light="true" @toggleShow="toggleShow"></mask-layer>
	</view>
</template>

<script>
	import sexBar  from "../../components/common/sex-bar.vue"
	import homeState from "../../components/home/home-state.vue"
	import headTab from "../../components/index/head-tab.vue"
	import selfList from "../../components/self-list/self-list.vue"
	import maskLayer from "../../components/common/mask-layer.vue"
	export default {
		data() {
			return {
				username:'',
				userpic:'',
				sex:'女',
				age:'21',
				isAttention:false,
				currentIdx:1,
				isShowMenu:false,
				list:[
					{
						name:'获赞',
						num: '12K'
					},
					{
						name:'关注',
						num:'123'
					},
					{
						name:'粉丝',
						num:'456'
					},
				
				],
				tabBars:[
					{
						name:'主页'
					},
					{
						name:'糗事'
					},
					{
						name:'动态'
					}
				],
				lists:[ //lists为2维数组，lists[0] 是默认. lists[1] 是最新
					[
						{
							username:'红肥绿瘦',
							userpic:'../../static/demo/userpic/6.jpg',
							sex:'女',
							age:'21',
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
		methods: {
			toggleAttention(){
				this.isAttention = !this.isAttention
				if(this.isAttention){
					uni.showToast({
						title:'关注成功',
						icon:'none'
					})
				}
			},
			ontabtap(idx){
				this.currentIdx = idx
			},
			toggleShow(){
				this.isShowMenu = !this.isShowMenu
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index === 0){
				uni.navigateBack({
					delta:1
				})
			}else if(e.index === 1){
				this.isShowMenu = !this.isShowMenu
			}
		},
		components:{
			sexBar,
			homeState,
			headTab,
			selfList,
			maskLayer
		}
	}
</script>

<style lang="less" scoped>
	.menu{
		position: fixed;
		width: 50%;
		
		top: 80upx;
		right: 0;
		z-index: 1000;
		background: #FFFFFF;
		padding: 0 20upx;
		.defriend{
			line-height: 100upx;
		}
	}
	.space-head{
		position: relative;
		image{
			width: 100%;
			height: 420upx;
		}
		.userinfo{
			position: absolute;
			top: 100upx;
			image{
				width: 150upx;
				border-radius: 100%;
			}
			.username{
				color: #FFFFFF;
				font-size: 35upx;
				padding: 10upx 0;
			}
			.attention{
				text-align: center;
				padding: 0 20upx;
				background: #FEE833;
				font-size: 26upx;
				border-radius: 16upx;
				&.active{
					background: #CCCCCC;
					
				}
			}
		}
		.user-status{
			position: absolute;
			height: 120upx;
			top: 400upx;
			width: 100%;
			background: #FFFFFF;
			border-top-left-radius: 20upx;
			border-top-right-radius: 20upx;
			border-bottom: 20upx solid #EEEEEE;
		}
	}
	.body{
		margin-top: 140upx;
	
		.homepage{
			margin: 0 40upx;
			.accountinfo,.personinfo{
				>view{
					color: #BEBEBE;
				}
				>view:first-child{
					font-size: 35upx;
					line-height: 80upx;
					color: #000000;
				}
			}
		}
	}
</style>
