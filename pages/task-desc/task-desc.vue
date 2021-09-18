<template>
	<view>
		<view class="task-desc">
			<u-cell-group v-if="taskData._id">
				<u-cell-item icon="clock" title="任务状态" v-if="type === 'receive'" :value="countTime" :arrow="false">
				</u-cell-item>
				<u-cell-item icon="order" title="任务平台" :arrow="false"
					:value="taskData.type || taskData.taskDetail.type"></u-cell-item>
				<u-cell-item v-if="type !== 'receive' && type !== 'allege'" icon="integral" title="剩余次数"
					:value="`${taskData.restNum}/${taskData.totalNum}`" :arrow="false"></u-cell-item>
				<u-cell-item v-if="type == 'allege'" icon="account" title="申述人" :value="getAllegeText()" :arrow="false">
				</u-cell-item>
				<u-cell-item icon="attach" title="任务链接" :value="taskData.link || taskData.taskDetail.link"
					:arrow="false">
					<u-button slot="right-icon" size="mini" style="margin-left: 20rpx;" type="primary" @click="copy">
						一键复制</u-button>
				</u-cell-item>
				<u-cell-item icon="photo" title="任务图片" :arrow="false" v-if="type !== 'receive'">
					<view slot="right-icon">
						<u-image @click="$util.previewImg([taskData.img || taskData.taskDetail.img])" width="300rpx"
							height="300rpx" :src="taskData.img || taskData.taskDetail.img"></u-image>
					</view>
				</u-cell-item>
				<u-cell-item icon="file-text" title="任务描述" :value="taskData.desc || taskData.taskDetail.desc"
					:arrow="false"></u-cell-item>
				<u-cell-item icon="clock" title="完成时限" v-if="type !== 'receive'" :value="`${taskData.limitTime / 60}小时`"
					:arrow="false"></u-cell-item>
				<u-cell-item icon="gift" title="积分奖励" :value="taskData.score || taskData.taskDetail.score"
					:arrow="false"></u-cell-item>
				<!-- <u-cell-item icon="photo" title="我的截图" :arrow="false" v-if="type === 'receive'">
					<view slot="right-icon" style="display: flex;align-items: center;">
						<u-upload :action="action" :file-list="fileList" :max-count="1"></u-upload>
					</view>
				</u-cell-item> -->

				<u-cell-item icon="photo" title="完成情况截图" :arrow="false" v-if="type !== 'before-receive' && type !== 'publish'">
					<view v-if="taskData.status == 'DOING'">
						<uni-file-picker v-model="imageValue" file-mediatype="image" mode="grid" :limit="1"
							@delete="deleteImg"></uni-file-picker>
					</view>
					<view slot="right-icon">
						<u-image @click="$util.previewImg([taskData.img || taskData.taskDetail.img])"
							v-if="taskData.status !== 'DOING' && taskData.submitImg" width="200rpx" height="200rpx"
							:src="taskData.submitImg"></u-image>
					</view>
				</u-cell-item>
			</u-cell-group>
			<view style="display: flex;justify-content: space-around;margin: 50rpx 0;">
				<!-- 我的领取点击进入 -->
				<u-button style="width: 300rpx;" type="warning" v-if="taskData.status == 'DOING' && type==='receive'"
					@click="clickGiveup">放弃任务</u-button>
				<u-button style="width: 300rpx;" type="primary" v-if="taskData.status == 'DOING' && type==='receive'"
					@click="showSubmitConfirm = true">提交任务</u-button>
				<!-- 主页点进进入领取 -->
				<u-button style="width: 300rpx;" v-if="type==='before-receive'" @click="goBack">返回</u-button>
				<u-button style="width: 300rpx;" type="primary" v-if="type==='before-receive'"
					@click="showReceiveConfirm = true">领取</u-button>
				<!-- 我的发布点进进入 -->
				<view style="width: 230rpx;" v-if="type==='publish'">
					<u-button type="primary" @click="refreshTask">擦亮
					</u-button>
					<text style="font-size: 20rpx; color: #aaa; text-align: center;">擦亮后可将任务推荐靠前</text>
				</view>
				<view style="width: 230rpx;" v-if="type==='publish'">
					<u-button type="success" v-if="type==='publish'" open-type="share">分享
					</u-button>
					<text style="font-size: 20rpx; color: #aaa; text-align: center;">将任务分享给好友，更快被完成</text>
				</view>
				<u-button style="width: 200rpx;" type="warning" v-if="type==='publish'" @click="clickDelete">删除
				</u-button>
				<u-button style="width: 200rpx;" type="warning" v-if="type==='allege'" @click="allegeConfirm(false)">申述失败
				</u-button>
				<u-button style="width: 200rpx;" type="success" v-if="type==='allege'" @click="allegeConfirm(true)">申述通过
				</u-button>
			</view>
			<view v-if="taskData.status === 'REJECTED'" style="width: 325rpx; margin: 0 25rpx;">
				<u-button type="warning" @click="applyAllege">提起申述</u-button>
				<text style="font-size: 20rpx; color: #aaa; text-align: center;">若您觉得任务审批有问题，可以发起申述，申述成功后可返回积分</text>
			</view>
		</view>
		<!-- 领取任务提示 -->
		<u-modal v-model="showReceiveConfirm" :show-cancel-button="true" @confirm="confirmReceive" :title="'领取须知'"
			:confirm-text="'确认领取'">
			<view style="padding: 30rpx; padding-bottom: 40rpx;">
				<p style="text-indent: 60rpx;">每个账号只能同时领取一个任务，请务必在<span
						style="color: red">规定时间</span>内完成并提交任务。另外，在任务途中一定记得在<span style="color: red">关键界面截图</span>哟！</p>
			</view>
		</u-modal>
		<!-- 提交任务提示 -->
		<u-modal v-model="showSubmitConfirm" :show-cancel-button="true" @confirm="confirmSubmit" :title="'提交确认'"
			:confirm-text="'确认提交'">
			<view style="padding: 30rpx; padding-bottom: 40rpx;">
				<p style="text-indent: 60rpx;">请确认您已经完成了任务并提交了能证明的<span
						style="color: red">相关截图信息</span>，若提交后被任务发布者投诉，将影响您的<span
						style="color: red">信用记录</span>，保持良好的信用记录才能让您自己发布的任务被推荐哟！</p>
			</view>
		</u-modal>
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
					data: this.taskData.link || this.taskData.taskDetail.link
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
				this.$util.showToast('提交成功，稍等片刻即可获得积分！', '', () => {
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
