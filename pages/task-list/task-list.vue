<template>
	<view>
		<taskItem v-for="task in list" :key="task._id" :data="task" :type="type"></taskItem>
		<unicloud-db v-slot:default="{data, loading, error, options}" :options="options" :collection="'task'" :where="typeSearch" :orderby="sort">
			<view>
				<task-item v-for="i in data" :type="options.type" :data="i"></task-item>
			</view>
		</unicloud-db>
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
			this.options.type = option.type
			console.log(this.type)
			uni.setNavigationBarTitle({
				title: this.type === 'publish' ? '我的发布' : '我的领取'
			});
		},
		data() { 
			return {
				type: 'publish',
				list: [],
				options: {
					type: 'publish'
				}
			};
		},
		computed: {
			typeSearch() {
				// return `creator == ${this.$util.store.userInfo.openId}`
				return `creator == '${this.$util.store.userInfo.openId}'`
			},
			sort() {
				return 'createTime desc'
			}
		}

	}
</script>

<style lang="scss">

</style>
