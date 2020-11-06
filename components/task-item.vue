<template>
	<view>
		<u-card :title="type === 'publish' ? `${title}(1积分)` : title" :sub-title="subTitle" :thumb="thumb" @head-click="goDesc"
		 border-radius="0" :body-style="{display:'none'}">
			<view style="display: flex;justify-content: space-between;" slot="foot">
				<u-icon v-if="type !== 'publish'" name="gift" size="34" color="" label="1积分"></u-icon>
				<u-cell-item v-if="type === 'publish'" icon="setting-fill" title="剩余3次-发布5次" :arrow="false">
					<u-collapse slot="right-icon">
						<u-collapse-item title="完成情况">
							<view style="margin-bottom: 25rpx; text-decoration: underline; color: #2979ff;">
								<text @click="goFinish">2020-11-05 11:23 用户A完成</text>
							</view>
							<view style="margin-bottom: 25rpx; text-decoration: underline; color: #2979ff;">
								<text @click="goFinish">2020-11-05 11:23 用户B完成</text>
							</view>
						</u-collapse-item>
					</u-collapse>
				</u-cell-item>
				<text v-else-if="type === 'receive'"><text style="color:red">未完成</text></text>
				<text v-else>剩余3次</text>
			</view>
		</u-card>
	</view>
</template>

<script>
	export default {
		props: ['type'],
		data() {
			return {
				title: '拼多多任务',
				subTitle: '2020-05-15',
				thumb: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
			};
		},
		methods: {
			goDesc() {
				uni.navigateTo({
					url: `/pages/task-desc/task-desc?type=${this.type}`
				});
			},
			goFinish(id) {
				uni.navigateTo({
					url: `/pages/finish-task/finish-task?id=${id}`
				});
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
</style>
