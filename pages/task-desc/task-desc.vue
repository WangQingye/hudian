<template>
	<view>
		<view class="task-desc">
			<u-cell-group>
				<u-cell-item icon="order" title="任务平台" :arrow="false" :value="taskData.type"></u-cell-item>
				<u-cell-item v-if="type !== 'receive'" icon="integral" title="剩余次数" :value="`${taskData.restNum}/${taskData.totalNum}`" :arrow="false"></u-cell-item>
				<u-cell-item icon="attach" title="任务链接" :value="taskData.link" :arrow="false">
					<u-button slot="right-icon" size="mini" style="margin-left: 20rpx;" type="primary" @click="copy">一键复制</u-button>
				</u-cell-item>
				<u-cell-item icon="photo" title="任务图片" :arrow="false">
					<view slot="right-icon">
						<u-image width="300rpx" height="300rpx" :src="taskData.img"></u-image>
					</view>
				</u-cell-item>
				<u-cell-item icon="file-text" title="任务描述" :value="taskData.desc" :arrow="false"></u-cell-item>
				<u-cell-item icon="clock" title="完成时限" :value="taskData.limitTime" :arrow="false"></u-cell-item>
				<u-cell-item icon="clock" title="剩余时间" v-if="type === 'receive'" :value="countTime" :arrow="false"></u-cell-item>
				<u-cell-item icon="gift" title="积分奖励" :value="taskData.score" :arrow="false"></u-cell-item>
				<u-cell-item icon="photo" title="我的截图" :arrow="false" v-if="type === 'receive'">
					<view slot="right-icon" style="display: flex;align-items: center;">
						<!-- <u-button type="primary" size="mini" @click="receive">上传截图</u-button> -->
						<u-upload :action="action" :file-list="fileList" :max-count="1"></u-upload>
					</view>
				</u-cell-item>
			</u-cell-group>
			<view style="display: flex;justify-content: space-around;margin-top: 50rpx;">
				<!-- 我的领取点击进入 -->
				<u-button style="width: 300rpx;" type="warning" v-if="type==='receive'" @click="submit">放弃任务</u-button>
				<u-button style="width: 300rpx;" type="primary" v-if="type==='receive'" @click="showSubmitConfirm = true">提交任务</u-button>
				<!-- 主页点进进入领取 -->
				<u-button style="width: 300rpx;" v-if="type==='before-receive'" @click="goBack">返回</u-button>
				<u-button style="width: 300rpx;" type="primary" v-if="type==='before-receive'" @click="showReceiveConfirm = true">领取</u-button>
				<!-- 我的发布点进进入 -->
				<u-button style="width: 230rpx;" type="warning" v-if="type==='publish'" @click="clickDelete">删除任务</u-button>
				<u-button style="width: 230rpx;" type="primary" v-if="type==='publish'" @click="goEdit">修改任务</u-button>
				<u-button style="width: 230rpx;" type="success" v-if="type==='publish'" open-type="share">分享任务</u-button>
			</view>
		</view>
		<!-- 领取任务提示 -->
		<u-modal v-model="showReceiveConfirm" :show-cancel-button="true" @confirm="confirmReceive" :title="'领取须知'"
		 :confirm-text="'确认领取'">
			<view style="padding: 30rpx; padding-bottom: 40rpx;">
				<p style="text-indent: 60rpx;">每个账号只能同时领取不超过三个任务，请务必在<span style="color: red">规定时间</span>内完成并提交任务。另外，在任务途中一定记得在<span
					 style="color: red">关键界面截图</span>哟！</p>
			</view>
		</u-modal>
		<!-- 提交任务提示 -->
		<u-modal v-model="showSubmitConfirm" :show-cancel-button="true" @confirm="confirmSubmit" :title="'提交确认'"
		 :confirm-text="'确认提交'">
			<view style="padding: 30rpx; padding-bottom: 40rpx;">
				<p style="text-indent: 60rpx;">请确认您已经完成了任务并提交了能证明的<span style="color: red">相关截图或信息</span>，若提交后被任务发布者投诉（连续超过三次将被冻结账号）将影响您的<span
					 style="color: red">信用记录</span>，保持良好的信用记录才能让您自己发布的任务被推荐哟！</p>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '快来帮我完成任务！',
				path: '/pages/test/test?id=123',
				imageUrl: '../../static/share.png'
			}
		},
		onLoad(option) {
			this.type = option.type
			console.log(this.$util.store)
			this.taskData = this.$util.store.nowTask
			this.getTimeText()
		},
		onUnload() {
			clearInterval(this.countTimer)
		},
		data() {
			return {
				type: 'publish',
				action: 'aa',
				fileList: [{
					url: 'https://cdn.uviewui.com/uview/example/fade.jpg'
				}],
				showReceiveConfirm: false,
				showSubmitConfirm: false,
				countTime: '',
				countTimer: '',
				taskData: {}
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
			confirmReceive() {
				this.$util.http('receiveTask', this.taskData).then(data => {
					console.log(data)
					// this.$util.showToast('发布成功')
					// this.$util.getUserInfo()
					// this.$util.showToast('领取成功', '', () => {
					// 	uni.navigateTo({
					// 		url: `/pages/task-list/task-list?type=receive`
					// 	})
					// })
				})
			},
			confirmSubmit() {
				this.$util.showToast('提交成功', '', () => {
					uni.navigateTo({
						url: `/pages/task-list/task-list?type=receive`
					})
				})
			},
			clickDelete() {
				let that = this
				uni.showModal({
					title: '确认删除',
					content: '是否确认删除，删除后无法恢复',
					success: (res) => {
						if (res.confirm) {
							that.$util.showToast('当前有用户已经领取了任务，无法删除')
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			goEdit() {
				uni.showModal({
					title: '确认修改',
					content: '请先确认您的任务当前没有被人领取，否则无法修改',
					confirmText: '去修改',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: `/pages/publish/publish`
							})
						}
					}
				});

			},
			getTimeText() {
				this.countTimer = setInterval(() => {
					let start = moment(new Date()); //获取开始时间
					let end = moment(new Date("2021/03/19 15:58:00")); //结束时间
					let diff = end.diff(start); //时间差
					if (diff < 0) {
						this.countTime = '已超时'
						clearInterval(this.countTimer)
						return
					}
					this.countTime =
						`${moment.duration(diff).days() ? moment.duration(diff).days() + ' 天 ' : '' }${moment.duration(diff).hours() ? moment.duration(diff).hours() + ' 小时 ' : '' }${moment.duration(diff).minutes() ? moment.duration(diff).minutes() + ' 分 ' : '' }${moment.duration(diff).seconds() ? moment.duration(diff).seconds() + ' 秒' : '' }` //格式化为需要的格式 这里是时分秒
				}, 1000)
			}
		}
	}
</script>

<style lang="scss">

</style>
