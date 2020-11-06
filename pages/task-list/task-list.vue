<template>
	<view>
		<taskItem :type="type"></taskItem>
	</view>
</template>

<script>
	import taskItem from '../../components/task-item.vue'
	export default {
		components: {
			taskItem
		},
		onLoad(option) {
			this.type = option.type
		},
		data() {
			return {
				type: 'publish'
			};
		}
	}
</script>

<style lang="scss">

</style>
