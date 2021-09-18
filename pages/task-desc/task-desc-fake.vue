<template>
	<view>
		<view class="task-desc">
			<u-cell-group v-if="taskData._id">
				<u-cell-item icon="attach" title="生活标题" :value="taskData.link || taskData.taskDetail.link"
					:arrow="false">
				</u-cell-item>
				<u-cell-item icon="photo" title="生活图片" :arrow="false" v-if="type !== 'receive'">
					<view slot="right-icon">
						<u-image @click="$util.previewImg([taskData.img || taskData.taskDetail.img])" width="300rpx"
							height="300rpx" :src="taskData.img || taskData.taskDetail.img"></u-image>
					</view>
				</u-cell-item>
				<u-cell-item icon="file-text" title="生活描述" :value="taskData.desc || taskData.taskDetail.desc"
					:arrow="false"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		onShareAppMessage() {
			return {
				title: '快来帮我完成任务！',
				path: `/pages/index/index?taskId=${this.taskData._id}`,
				imageUrl: '../../static/share.png'
			}
		},
		async onLoad(options) {
			console.log(options)
			if (options.taskId) {
				let res = await this.$util.http('getTask', {
					taskId: options.taskId
				})
				this.taskData = res.result
			} else {
				this.taskData = this.$util.store.nowTask
			}
			this.type = options.type
			// 这里注意一下任务数据有可能是任务数据也有可能是领取条数据
			// 如果是提交任务界面，看一下有没有已经上传的图片
			if (this.taskData.submitImg) {
				this.imageValue.push({
					"name": "submitImg",
					"extname": this.taskData.submitImg.split('.').pop(),
					"url": this.taskData.submitImg
				})
			}
			this.getTimeText()
		},
		onUnload() {
			clearInterval(this.countTimer)
		},
		data() {
			return {
				type: '',
				action: 'aa',
				fileList: [{
					url: 'https://cdn.uviewui.com/uview/example/fade.jpg'
				}],
				showReceiveConfirm: false,
				showSubmitConfirm: false,
				countTime: '',
				countTimer: '',
				taskData: {},
				imageValue: [],
				submitImg: ''
			};
		},
		methods: {
			copy() {
				uni.setClipboardData({
					data: '任务链接'
				});
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 领取任务 -- 领取者
			async confirmReceive() {
				if (!this.$util.store.userInfo.nickName) {
					uni.switchTab({
						url: `/pages/my-info/my-info`
					})
				}
				if (this.$util.store.userInfo.openId == this.taskData.creator) {
					this.$util.showToast('不能领取自己发布的任务哦')
					return
				}
				if (this.$util.store.userInfo.credit < 60) {
					this.$util.showToast('您的信用分过低，不能领取任务哦，请先通过每日登录获取信用分吧')
					return
				}
				let res = await this.$util.http('receiveTask', {
					taskData: this.taskData
				})
				this.$util.showToast('领取成功', '', () => {
					uni.redirectTo({
						url: `/pages/task-list/task-list?type=receive`
					})
				})
			},
			// 提交任务 -- 领取者
			async confirmSubmit() {
				if (!this.imageValue[0]) {
					this.$util.showToast('请上传任务截图')
					return
				}
				await this.$util.http('updateReceiveStatus', {
					receiveId: this.taskData._id,
					status: 'SUBMIT',
					submitImg: this.imageValue[0].url,
					score: this.taskData.taskDetail.score
				})
				this.$util.showToast('提交成功', '', () => {
					uni.switchTab({
						url: `/pages/my-info/my-info`
					})
				})
			},
			// 放弃任务 -- 领取者
			clickGiveup() {
				let that = this
				uni.showModal({
					title: '确认放弃',
					content: '是否确认放弃，放弃后无法恢复',
					success: async (res) => {
						if (res.confirm) {
							await that.$util.http('giveupTask', {
								receiveId: that.taskData._id,
								status: 'del'
							})
							that.$util.showToast('操作成功', '', () => {
								uni.switchTab({
									url: `/pages/my-info/my-info`
								})
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 擦亮任务 -- 发布者
			async refreshTask() {
				let res = await this.$util.http('refreshTask', {
					taskId: this.taskData._id
				})
				this.$util.showToast('擦亮成功，任务排名靠前啦')
			},
			// 删除任务 -- 发布者
			clickDelete() {
				let that = this
				uni.showModal({
					title: '确认删除',
					content: '是否确认删除，删除后无法恢复',
					success: async (res) => {
						if (res.confirm) {
							let res = await that.$util.http('delTask', {
								taskId: that.taskData._id
							})
							that.$util.showToast('删除成功', '', () => {
								uni.switchTab({
									url: `/pages/my-info/my-info`
								})
							})
						}
					}
				});
			},
			getTimeText() {
				let textArr = this.$util.taskStatusType
				if (this.taskData.status == 'DOING') {
					this.countTimer = setInterval(() => {
						let start = moment(new Date()); //获取开始时间
						let end = moment(new Date(this.taskData.pastTime)); //结束时间
						let diff = end.diff(start); //时间差
						if (diff < 0) {
							this.countTime = '已超时'
							this.taskData.status = 0
							clearInterval(this.countTimer)
							return
						}
						this.countTime =
							`进行中，剩余时间：${moment.duration(diff).days() ? moment.duration(diff).days() + ' 天 ' : '' }${moment.duration(diff).hours() ? moment.duration(diff).hours() + ' 小时 ' : '' }${moment.duration(diff).minutes() ? moment.duration(diff).minutes() + ' 分 ' : '' }${moment.duration(diff).seconds() ? moment.duration(diff).seconds() + ' 秒' : '' }` //格式化为需要的格式 这里是时分秒
					}, 1000)
				} else {
					this.countTime = textArr[this.taskData.status]
				}
			},
			deleteImg(e) {
				this.imageValue = []
			},
			getAllegeText() {
				if (this.taskData.allegeFrom === this.taskData.receiveUserId) {
					return '领取人'
				}
				if (this.taskData.allegeFrom === this.taskData.taskDetail.creator) {
					return '发布人'
				}
			},
			async allegeConfirm(success) {
				await this.$util.http('updateReceiveStatus', {
					receiveId: this.taskData._id,
					status: success ? 'ALLEGE-SUCCESSED' : 'ALLEGE-FAILED'
				})
				this.$util.showToast('操作成功', '', () => {
					uni.redirectTo({
						url: `/pages/task-list/task-list?type=allege`
					})
				})
			},
			async applyAllege() {
				uni.showModal({
					content: '请谨慎发起申述，若申述失败您将扣除信用分，是否确认？',
					success: async (res) => {
						if (res.confirm) {
							let ret = await this.$util.http('updateReceiveStatus', {
								receiveId: this.taskData._id,
								status: 'ALLEGE'
							})
							this.$util.showToast('操作成功，请等待管理员审批', '', () => {
								uni.switchTab({
									url: `/pages/my-info/my-info`
								})
							})
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .file-picker__box {
		margin-left: 64% !important;
	}
</style>
