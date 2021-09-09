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
			let title = {
				publish: '我发布的',
				receive: '我领取的',
				allege: '申述列表'
			}
			uni.setNavigationBarTitle({
				title: title[this.type]
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
				if (this.type === 'publish') {
					return `task`
				} else if (this.type === 'receive' || this.type === 'allege') {
					return `taskReceive`
				}
			},
			typeSearch() {
				// return `creator == ${this.$util.store.userInfo.openId}`
				if (this.type === 'publish') {
					return `creator == '${this.$util.store.userInfo.openId}'`
				} else if (this.type === 'receive') {
					return `receiveUserId == '${this.$util.store.userInfo.openId}'`
				} else if (this.type === 'allege') {
					return `status == 'ALLEGE'`
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
