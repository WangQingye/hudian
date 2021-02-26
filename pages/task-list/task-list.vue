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
			uni.setNavigationBarTitle({
			    title: this.type === 'publish' ? '我的发布' : '我的领取'
			});
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
