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
						<view v-for="i in 3" :key="i" style="margin-bottom: 25rpx; text-decoration: underline; color: #2979ff;">
							<text @click.stop="goFinish">2020-11-05 11:23 用户A完成</text>
						</view>
					</u-collapse-item>
				</u-collapse>
				<u-icon v-if="type !== 'publish'" name="gift" size="34" color="" :label="`${data.score || data.taskDetail.score}积分`"></u-icon>
				<text v-if="type !== 'publish' && type !== 'receive'" style="float: right;">{{`剩余${data.restNum}次`}}</text>
				<text v-if="type === 'receive'" style="float: right;"><text style="color:red">{{getStatusText()}}</text></text>
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
			goFinish(id) {
				uni.navigateTo({
					url: `/pages/finish-task/finish-task?id=${id}`
				});
			},
			getStatusText() {
				return this.$util.taskStatusType[this.data.status]
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
