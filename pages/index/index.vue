<template>
	<view>
		<getUserInfo></getUserInfo>
		<view class="index-list">
			<block v-for="(item,index) in recommend" :key="index" >
				<index-list-item :item="item"></index-list-item>
			</block>
		</view>
		
	</view>
</template>

<script>
	import getUserInfo from "../../components/common/getUserInfo.vue"
	import indexListItem from "../../components/index/index-list-item.vue"
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				isLike:false,

			}
		},
		computed:{
			...mapState(['recommend'])
		},
		
		methods: {
			
		},
		components:{
			getUserInfo,
			indexListItem
		}
	}
</script>

<style lang="scss" scoped>
	.index-list{
		margin: 20upx;
	}
</style>
