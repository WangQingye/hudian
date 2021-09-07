<template>
	<view>
		<u-card :title="`${data.type || data.taskDetail.type}任务`" :sub-title="moment(data.createTime).format('YYYY-MM-DD')" :thumb="data.avatar || data.taskDetail.avatar" @click="goDesc"
		 border-radius="0" :body-style="{display:'none'}">
			<view slot="foot"><!-- 
				<u-cell-item v-if="type === 'publish'" icon="setting-fill" title="剩余3次-发布5次" :arrow="false">
				</u-cell-item> -->
				<u-icon v-if="type === 'publish'" name="gift" size="34" color="" :label="`${data.score}积分`"></u-icon>
				<u-icon v-if="type === 'publish'"  style="float: right;" name="setting-fill" size="34" color="" :label="`剩余次数${data.restNum}/${data.totalNum}`"></u-icon>			
				<u-collapse slot="right-icon" v-if="type === 'publish'">
					<u-collapse-item title="完成情况">
						<view v-for="receive in data.receiveStatus" :key="receive.receiveId" style="margin-bottom: 25rpx; text-decoration: underline; color: #2979ff;">
							<text v-if="receive.status !== 'PASSED'" @click.stop="goFinish(receive)">{{`${getStatusText(receive)} ${moment(receive.receiveTime).format('YYYY-MM-DD hh:mm:ss')} 用户${receive.receiveUserName}`}}</text>
						</view>
					</u-collapse-item>
				</u-collapse>
				<u-icon v-if="type !== 'publish'" name="gift" size="34" color="" :label="`${data.score || data.taskDetail.score}积分`"></u-icon>
				<text v-if="type !== 'publish' && type !== 'receive'" style="float: right;">{{`剩余${data.restNum}次`}}</text>
				<text v-if="type === 'receive'" style="float: right;"><text :style="{color:$util.statusColors[getStatusText()]}">{{getStatusText()}}</text></text>
			</view>
		</u-card>
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
		mounted() {
		},
		methods: {
			goDesc() {
				this.$util.store.nowTask = this.data
				uni.navigateTo({
					url: `/pages/task-desc/task-desc?type=${this.type}`
				});
			},
			goFinish(receive) {
				if (this.getStatusText(receive) === '已超时') return
				this.$util.store.nowReceive = receive
				uni.navigateTo({
					url: `/pages/finish-task/finish-task`
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
</style>
