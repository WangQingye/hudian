<template>
	<view class="card" @click="goDesc">
		<view class="top">
			<view class="top-left">
				<u-image width="60rpx" height="60rpx" style="border-radius: 10rpx !important; margin-right: 20rpx;"
					:src="data.avatar || data.taskDetail.avatar"></u-image>
				<text>{{data.type || data.taskDetail.type}}任务</text>
			</view>
			<view class="top-right">
				<u-icon v-if="type !== 'publish'" name="gift" size="34" color="red"
					:label="`${data.score || data.taskDetail.score}积分`"></u-icon>
				<view v-else>{{moment(data.createTime).format('YYYY-MM-DD')}}</view>
			</view>
		</view>
		<view class="middle" v-if="type !== 'publish'">
			{{data.desc || data.taskDetail.desc}}
		</view>
		<view class="floor" v-if="type !== 'before-receive'">
			<u-icon v-if="type === 'publish'" name="gift" size="34" color="" :label="`${data.score}积分`"></u-icon>
			<u-icon v-if="type === 'publish'" class="floor-right" name="setting-fill" size="34" color=""
				:label="`剩余次数${data.restNum}/${data.totalNum}`"></u-icon>
			<u-collapse slot="right-icon" v-if="type === 'publish'">
				<u-collapse-item title="完成情况">
					<view v-for="receive in data.receiveStatus" :key="receive.receiveId"
						style="margin-bottom: 25rpx; text-decoration: underline; color: #2979ff;">
						<text v-if="receive.status !== 'PASSED'"
							@click.stop="goFinish(receive)">{{`${getStatusText(receive)} ${moment(receive.receiveTime).format('YYYY-MM-DD hh:mm:ss')} 用户${receive.receiveUserName}`}}</text>
					</view>
				</u-collapse-item>
			</u-collapse>
			<!-- <u-icon v-if="type !== 'publish'" name="gift" size="34" color="red"
				:label="`${data.score || data.taskDetail.score}积分`"></u-icon> -->
			<text v-if="type === 'receive' || type === 'allege'"
				class="middle">{{moment(data.createTime).format('YYYY-MM-DD')}}</text>
			<text v-if="type === 'receive' || type === 'allege'" class="floor-right"><text
					:style="{color:$util.statusColors[getStatusText()]}">{{getStatusText()}}</text></text>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		props: ['type', 'data'],
		data() {
			return {
				moment,
				thumb: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
			};
		},
		mounted() {},
		methods: {
			goDesc() {
				this.$util.store.nowTask = this.data
				uni.navigateTo({
					url: `/pages/task-desc/task-desc?type=${this.type}`
				});
			},
			goFinish(receive) {
				if (this.getStatusText(receive) === '已超时') return
				uni.navigateTo({
					url: `/pages/finish-task/finish-task?receiveId=${receive.receiveId}`
				});
			},
			getStatusText(receive) {
				let data = receive || this.data
				if (data.status == 'DOING') {
					if (new Date().getTime() > data.pastTime) {
						return '已超时'
					}
				}
				return this.$util.taskStatusType[data.status]
			},
			getReceiveText(receive) {

			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .u-card__foot {
		padding: 20rpx !important;
	}

	/deep/ .u-cell {
		padding: 0 !important;
		border: none !important;
	}

	/deep/ .u-border-bottom:after {
		border-bottom-width: 0px;
	}

	/deep/ .u-collapse-title {
		text-align: right !important;
		font-size: 28rpx;
		color: #aaa;
	}

	/deep/ .u-collapse-item {
		margin-bottom: -25rpx !important;
	}

	.card {
		padding: 30rpx 20rpx;
		margin: 30rpx;
		box-shadow: 5rpx 5rpx 16rpx 7rpx #eee;
		border-radius: 10rpx;

		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			border-bottom: 2rpx solid #eee;
			padding-bottom: 20rpx;

			.top-left {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.top-right {
				font-size: 26rpx;
				color: #6f6f6f;
			}
		}

		.floor {
			margin-top: 20rpx;
		}

		.floor-right {
			font-size: 26rpx;
			color: #6f6f6f;
			float: right;
		}
	}

	.middle {
		font-size: 26rpx;
		color: #6f6f6f;
	}
</style>
