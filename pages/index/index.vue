<template>
	<view class="container">
		<!-- <u-button type="primary" @click="testTimer">测试定时函数</u-button> -->
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
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options, hasMore}" collection="task" :where="typeSearch"
		 :orderby="sort" manual :page-size="5">
			<view>
				<task-item v-for="i in data" :type="'before-receive'" :data="i"></task-item>
			</view>
			<view style="margin: 30rpx 0;">
				<u-loadmore :status=" loading ? 'loading' : hasMore ? 'loadmore' : 'nomore'" />
			</view>
		</unicloud-db>
	</view>
</template>

<script>
	import taskItem from '../../components/task-item.vue'
	import {pullDownMixin} from '../../common/mixin.js'
	export default {
		mixins: [pullDownMixin],
		components: {
			taskItem
		},
		data() {
			return {
				order: 1,
				typeArr: [],
				orderOptions: [{
						label: '最新发布',
						value: 1,
					},
					{
						label: '积分排序',
						value: 2,
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
		onLoad(options) {
			if (options.recommend) {
				this.$util.store.recommendFrom = options.recommend
			}
			// 有id说明是
			if (options.taskId) {
				uni.navigateTo({
					url: `/pages/task-desc/task-desc?type=${'before-receive'}&taskId=${options.taskId}`
				});
			}
		},
		mounted() {
			uni.login({
				success: (res) => {
					this.$util.http('getOpenId', res).then(data => {
						this.$util.store.userInfo.openId = data.result.openid
					})
				}
			})
		},
		methods: {
			tagClick(index) {
				this.typeOptions[index].active = !this.typeOptions[index].active;
			},
			changeTypes() {
				this.typeArr = []
				this.typeOptions.forEach(item => {
					if (item.active) {
						this.typeArr.push(item.label)
					}
				})
				if (this.originalType) this.typeArr.push(this.originalType)
				this.$refs.uDropdown.close();
				this.$nextTick(() => {
					this.$refs.udb.loadData({
						clear: true
					})
				})
			},
			testTimer() {
				uniCloud.callFunction({
						name: 'timer',
						data: {}
				})
			}
		},
		computed: {
			typeSearch() {
				let ret = "restNum > 0 && "
				if (this.typeArr.indexOf('全部') !== -1 || this.typeArr.length === 0) {
					return ret + "type != ''"
				} else {
					let str = ''
					this.typeArr.forEach(type => {
						str += `type == '${type}'||`
					})
					str = str.slice(0, str.length - 2)
					return ret + str
				}
			},
			sort() {
				switch (this.order) {
					case 1:
						return 'createTime desc'
						break;
					case 2:
						return 'score desc'
						break;
					default:
						break;
				}
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
				margin-right: 28rpx;
			}

			.active {
				color: #FFFFFF;
				background-color: $u-type-primary;
			}
		}
	}
</style>
