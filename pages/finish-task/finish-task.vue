<template>
	<view>
		<view class="task-desc">
			<u-cell-group>
				<u-cell-item icon="account-fill" title="领取用户" :arrow="false" :value="receiveData.receiveUserName"></u-cell-item>
				<u-cell-item icon="integral-fill" title="领取时间" :value="moment(receiveData.receiveTime).format('YYYY-MM-DD HH:mm:ss')" :arrow="false"></u-cell-item>
				<!-- <u-cell-item icon="integral-fill" title="完成详情" value="已经做完了啊啊啊啊啊啊啊啊" :arrow="false"></u-cell-item> -->
				<u-cell-item icon="photo-fill" title="任务完成截图" :arrow="false" v-if="receiveData.status !== 'DOING'">
					<view slot="right-icon">
						<u-image @click="$util.previewImg([receiveData.submitImg])" width="300rpx" height="300rpx" :src="receiveData.submitImg"></u-image>
					</view>
				</u-cell-item>
				<u-cell-item icon="clock-fill" title="任务状态" :value="getStatusText()" :arrow="false"></u-cell-item>
			</u-cell-group>
			<view style="display: flex;justify-content: space-around; margin-top: 60rpx; ">
				<view style="width: 300rpx;" v-if="receiveData.status === 'SUBMIT'">
					<u-button @click="updateReceiveStatus(0)">审核失败</u-button>
					<text style="font-size: 20rpx; color: #aaa; text-align: center;">请谨慎拒绝，无故拒绝将可能遭到用户申述</text>
				</view>
				<u-button type="primary" style="width: 300rpx;" @click="updateReceiveStatus(1)"  v-if="receiveData.status === 'SUBMIT'">审核通过</u-button>
				<view style="width: 300rpx;" v-if="receiveData.status === 'REJECTED'">
					<u-button @click="apply">提起申述</u-button>
					<text style="font-size: 20rpx; color: #aaa; text-align: center;">截图有问题时可以提起申述，申述成功后可返回积分</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		onLoad(option) {
			this.type = option.type
		},
		data() {
			return {
				moment,
				type: 'publish',
				fileList: [{
					url: 'https://cdn.uviewui.com/uview/example/fade.jpg'
				}],
				receiveData: {}
			};
		},
		mounted() {
			this.receiveData = this.$util.store.nowReceive
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},			
			getStatusText() {
				if (this.receiveData.status == 'DOING') {
					if (new Date().getTime() > this.receiveData.pastTime) {
						return '已超时'
					}
				}
				return this.$util.taskStatusType[this.receiveData.status]
			},
			apply() {
				uni.showModal({
					content: '是否确认发起申述？',
					success: (res) => {
						if (res.confirm) {
						uni.showToast({
						    title: '发起成功',
						    duration: 2000,
							icon: 'none'
						})}
					}
				})
			},
			async updateReceiveStatus(status) {
				// 审核通过
				let res
				if (status == '1') {
					res = await this.$util.http('updateReceiveStatus', {
						receiveId: this.receiveData.receiveId,
						status: 'FINISHED',
						receiveUserId: this.receiveData.receiveUserId,
						score: this.receiveData.taskDetail.score
					})
					this.$util.showToast('操作成功', '', () => {
						uni.redirectTo({
							url: `/pages/task-list/task-list?type=publish`
						})
					})
				} else {
					// 审核失败
					let that = this
					uni.showModal({
						title: '确认失败',
						content: '是否确认任务未被完成？',
						success: async (res) => {
							if (res.confirm) {
								// 审核失败
								res = await that.$util.http('updateReceiveStatus', {
									receiveId: that.receiveData.receiveId,
									status: 'REJECTED'
								})
								this.$util.showToast('操作成功', '', () => {
									uni.redirectTo({
										url: `/pages/task-list/task-list?type=publish`
									})
								})
							}
						}
					});
				}
				console.log(res)
			}
		}
	}
</script>
<style lang="scss">

</style>
