<template>
	<button class="bottom-button-bar" :disabled="isDisabled" hover-class="active" @tap="tapEvent" type="default">{{text}}</button>
</template>
	
<script>
	export default {
		props:{
			text:{
				type:String,
				default:'请传入text'
			},
			isDisabled:{
				type:Boolean,
				default: false
			}	
		},
		methods:{
			tapEvent(){
				this.$emit('tapEvent')
			}
		}
	}
</script>

<style lang="less" scoped>
	.bottom-button-bar{
		margin: 20upx 40upx;
		background: #FEE832;
		color: #000000;
		&.active{
			border: 1px solid #FEE832;
			background: #F5EB9B;
		}
	}
</style>
