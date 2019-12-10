<template>
	<view class="animated fadeIn">
		<view class="mask" :class="{'light':light}" v-if="show" @tap="toggleShow"></view>
	</view>
</template>

<script>
	export default {
		props:{
			show:{
				type:Boolean,
				default:true
			},
			light:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			toggleShow(){
				this.$emit("toggleShow")
			}
		}
	}
</script>

<style lang="less" scoped>
	
	.mask{
		position: fixed;
		right: 0;
		left: 0;
		top: 0;
		bottom: 0;
		background: rgba(0,0,0,0.6);
		z-index: 1000;
		&.light{
			background: none;
		}
	}
</style>
