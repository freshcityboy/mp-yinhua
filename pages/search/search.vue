<template>
	<view>
		<zy-search :is-focus="true" :is-block="true" :show-want="false"></zy-search>
	</view>
</template>

<script>
	import zySearch from '../../components/zy-search/zy-search.vue'
	export default {
		components: {
			zySearch
		}
	}
</script>

<style>
</style>
