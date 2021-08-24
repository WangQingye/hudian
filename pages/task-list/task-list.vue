<template>
	<view>
		<taskItem v-for="task in list" :key="task._id" :data="task" :type="type"></taskItem>
		<unicloud-db v-if="collection" v-slot:default="{data, loading, error, options}" :options="options" :collection="collection" :where="typeSearch" :orderby="sort">
			<view>
				<task-item v-for="i in data" :type="options.type" :data="i"></task-item>
			</view>
			<view style="color: #aaa; text-align: center; margin: 50rpx;" v-if="!data.length && !loading">暂无数据</view>
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
				title: this.type === 'publish' ? '我发布的' : '我领取的'
			});
		},
		data() { 
			return {
				type: '',
				list: [],
				options: {
					type: ''
				}
			};
		},
		computed: {
			collection() {
				console.log(222)
				if (this.type === 'publish') {
					return `task`
				} else if (this.type === 'receive') {
					return `taskReceive`
				}
			},
			typeSearch() {
				// return `creator == ${this.$util.store.userInfo.openId}`
				if (this.type === 'publish') {
					return `creator == '${this.$util.store.userInfo.openId}'`
				} else if (this.type === 'receive') {
					return `receiveUserId == '${this.$util.store.userInfo.openId}'`
				}
			},
			sort() {
				return 'receiveTime desc'
			}
		}

	}
</script>

<style lang="scss">

</style>
