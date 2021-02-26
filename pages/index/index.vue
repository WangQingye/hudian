<template>
	<view class="container">
		<view style="border-bottom: 1px solid #eee; z-index: 999;">
			<u-dropdown ref="uDropdown">
				<u-dropdown-item v-model="order" title="排序" :options="orderOptions"></u-dropdown-item>
				<u-dropdown-item title="任务类型">
					<view class="slot-content">
						<view class="item-box">
							<view class="item" :class="[item.active ? 'active' : '']" @tap="tagClick(index)" v-for="(item, index) in typeOptions"
							 :key="index">
								{{item.label}}
							</view>
						</view>
						<view style="margin-bottom: 50rpx;">
							<u-field v-model="originalType" label="自定义:" placeholder="想要搜索的任务类型">
							</u-field>
						</view>
						<u-button type="primary" @click="changeTypes">确定</u-button>
					</view>
				</u-dropdown-item>
			</u-dropdown>
		</view>
		<task-item v-for="i in 7"></task-item>
	</view>
</template>

<script>
	import taskItem from '../../components/task-item.vue'
	export default {
		components: {
			taskItem
		},
		data() {
			return {
				order: 1,
				type: 1,
				orderOptions: [{
						label: '默认排序',
						value: 1,
					},
					{
						label: '积分排序',
						value: 2,
					},
					{
						label: '发布时间',
						value: 3,
					}
				],
				typeOptions: [{
						label: '全部',
						active: true,
					},
					{
						label: '拼多多',
						active: false,
					},
					{
						label: '京东',
						active: false,
					},
					{
						label: '淘宝',
						active: false,
					},
					{
						label: '抖音',
						active: false,
					},
					{
						label: '快手',
						active: false,
					}
				],
				originalType: ''
			};
		},
		methods: {
			tagClick(index) {
				this.typeOptions[index].active = !this.typeOptions[index].active;
			},
			changeTypes() {
				let typeArr = []
				this.typeOptions.forEach(item => {
					if (item.active) {
						typeArr.push(item.label)
					}
				})
				typeArr.push(this.originalType)
				console.log(typeArr)
				this.$refs.uDropdown.close();
			}
		}
	}
</script>

<style scoped lang="scss">
	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}

	.slot-content {
		background-color: #FFFFFF;
		padding: 24rpx;

		.item-box {
			margin-bottom: 50rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;

			.item {
				border: 1px solid $u-type-primary;
				color: $u-type-primary;
				padding: 8rpx 40rpx;
				border-radius: 100rpx;
				margin-top: 30rpx;
				margin-right: 26rpx;
			}

			.active {
				color: #FFFFFF;
				background-color: $u-type-primary;
			}
		}
	}
</style>
