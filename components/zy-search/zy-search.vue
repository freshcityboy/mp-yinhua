<template name="zy-search">
	<view>
		<view class="search">

			<template>
				<input maxlength="20" focus type="text" value="" confirm-type="search" @confirm="searchStart()" placeholder="请输入关键词搜索" v-model.trim="searchText"/>
			</template>
			<image src="../../static/zy-search/search.svg" mode="aspectFit" @tap="searchStart()" class="search-icon"></image>
		</view>
	
		<view class="index-llist" v-if="search.length">
			<block v-for="(item,index) in search" :key="index">
				<index-list-item :item="item"></index-list-item>
			</block>
		</view>

		<template v-if="(hList.length && !search.length)">
			<view class="s-block" >
				<view class="header">
					历史记录
					<image src="../../static/zy-search/delete.svg" mode="aspectFit" @tap="delhistory(-1)"></image>
				</view>
				<view class="list">
					<block v-for="(item,index) in hList" :key="index" >
						<view class="u-f-jsb" @tap="keywordsClick(item)">
							<view><image src="../../static/font/lishijilu.svg" mode=""></image> {{item}}</view>
							<view @tap.stop="delhistory(index)">×</view>
						</view>
					</block>
				</view>
			</view>
			<view class="wanted-block" v-if="showWant">
				<view class="header">猜你想搜的</view>
				<view class="list">
					<view class="u-f-jsb" v-for="(item,index) in wantList" :key="index" @tap="keywordsClick(item)">{{item}}</view>
				</view>
			</view>
		</template>
	
	</view>
</template>

<script>
	import indexListItem from "../index/index-list-item.vue"
	import {mapState} from "vuex"
	export default{
		name:"zy-search",
		props:{
			isFocus:{	//是否自动获取焦点
				type:Boolean,
				value:false
			},
			showWant:{	//是否展示推荐菜单
				type:Boolean,
				value:true
			}
		},
		data() {
			return {
				searchText:'',								//搜索关键词
				hList:uni.getStorageSync('search_cache')|| [],		//历史记录
				wantList:['栏目1','栏目2','栏目3','栏目4']	//初始化推荐列表
			};
		},
		computed:{
			...mapState(['search'])
		},
		methods: {
			searchStart: function() {	//触发搜索
				if (this.searchText == '') {
					uni.showToast({
						title: '请输入关键字',
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				this.saveRecord() // 保存搜索记录
				this.$store.dispatch('getSearch',this.searchText) // 调用搜索接口
				
			},
			saveRecord(){
				console.log('saveRecord');
				uni.getStorage({
					key:'search_cache',
					success:(res) => {
						console.log(res,123);
						let list = res.data;
						let count = 0
						for (let item of list) {
							if(item === this.searchText){
								list.splice(count,1)
							}
							count++
						}
						list.unshift(this.searchText)
						this.hList = list;
						console.log(this.hList );
						uni.setStorage({
							key: 'search_cache',
							data: this.hList
						});
					},
					fail:(err) => {
						this.hList.unshift(this.searchText)
						uni.setStorage({
							key: 'search_cache',
							data: this.hList
						});
					}
				})
			},
			keywordsClick (item) {	//推荐搜索
				this.searchText = item;
			},
			delhistory (index) {		//清空历史记录 -1 b表示清空全部
				if(index >= 0){
					this.hList.splice(index,1)
				}else{
					this.hList = []
				}
				uni.setStorage({
					key: 'search_cache',
					data: this.hList
				});
			}	
		},
		watch:{
			search(newVal){
				if(newVal === -1){
					uni.showToast({
						title:'没有搜索到任何内容',
						icon: 'none',
						duration: 1000
					})
				}
				
			}
		},
		onReady(){ //页面加载时清空上次搜索队列里面的内容
			this.$store.dispatch('claerSearch')
		},
		components:{
			indexListItem
		}
	}
</script>

<style lang="scss" scoped>
	.index-llist{
		margin: 20upx;
	}
	.search{
		width: 640upx;
		margin: 30upx auto 0;
		position: relative;
		input{
			background-color: #F7F7F7;
			padding: 10upx 74upx;
			font-size: 28upx;
			border-radius: 50upx;
			border: 1px solid $self-color-gray;
			box-shadow: 1px 1px 1px $self-color-gray;
		}
		
		.search-icon{
			width: 36upx;
			height: 36upx;
			padding: 16upx 20upx 16upx 0;
			position: absolute;
			right: 0;
			top: 4upx;
			z-index: 10;
		}
	}
	.s-block{
		margin-top: 30upx;
		.header{
			font-size: 32upx;
			padding: 15upx;
			position: relative;
			background:  #F7F7F7;
			image{
				width: 36upx;
				height: 36upx;
				padding: 10upx;
				position: absolute;
				right: 40upx;
				top: 24upx;
			}
		}
		.list{
			>view{
				color: #8A8A8A;
				font-size: 28upx;
				box-sizing: border-box;
				text-align: center;
				margin: 0 20upx;
				padding: 20upx 0;
				border-bottom: 1px solid $self-color-gray;
				image{
					width: 30upx;
					height: 30upx;
					padding-right: 20upx;
					padding-top: 10upx;
				}
			}
			
		}
	}

</style>
