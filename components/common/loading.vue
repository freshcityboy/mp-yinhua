<template>
	<view class="loading">
		<text>L</text>
		<text>o</text>
		<text>a</text>
		<text>d</text>
		<text>i</text>
		<text>n</text>
		<text>g</text>
		<text>...</text>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.loading{
		position: absolute;
		left: 50%;
		top: 30%;
		transform: translateX(-50%);
		font-size: 50upx;
		z-index: -1;
		>text{
			margin: 5upx;
			animation: loading 1s infinite alternate;
			color: #037692;
		}
		>text:nth-of-type(2) {
			color: #008FB2;
			animation-delay: 0.2s;
		}
		 >text:nth-of-type(3) {
			color: #009B9E;
			animation-delay: 0.4s;
		}
		 >text:nth-of-type(4) {
			color: #00A77D;
			animation-delay: 0.6s;
		}
		 >text:nth-of-type(5) {
			color: #00B247;
			animation-delay: 0.8s;
		}
		 >text:nth-of-type(6) {
		  color: #5AB027;
		  animation-delay: 1.0s;
		}
		>text:nth-of-type(7) {
			color: #A0B61E;
			animation-delay: 1.2s;
		}
		>text:nth-of-type(8) {
			color: #6cbd30;
			animation-delay: 1.4s;
		}
		@keyframes loading {
		  0% {
		    opacity: 0;
			// font-size: 50upx;
		  }
		  100% {
		    opacity: 1;
			font-size: 60upx;
		  }
		}
		
	}
</style>
