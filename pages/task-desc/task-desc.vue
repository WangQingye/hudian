<template>
	<view>
		<view class="task-desc">
			<u-cell-group>
				<u-cell-item icon="setting-fill" title="任务平台" :arrow="false" value="拼多多"></u-cell-item>
				<u-cell-item v-if="type !== 'receive'" icon="integral-fill" title="剩余次数" value="3" :arrow="false"></u-cell-item>
				<u-cell-item icon="integral-fill" title="任务链接" value="http://adsadsa.com" :arrow="false">
					<u-button slot="right-icon" size="mini" style="margin-left: 20rpx;" type="primary" @click="copy">一键复制</u-button>
				</u-cell-item>
				<u-cell-item icon="integral-fill" title="任务图片" :arrow="false">
					<view slot="right-icon">
						<u-image width="300rpx" height="300rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
					</view>
				</u-cell-item>
				<u-cell-item icon="integral-fill" title="任务描述" value="去XX平台,投票22号,需要截图" :arrow="false"></u-cell-item>
				<u-cell-item icon="integral-fill" title="积分奖励" value="1 分" :arrow="false"></u-cell-item>
				<u-cell-item icon="integral-fill" title="我的截图" :arrow="false" v-if="type === 'receive'">
					<view slot="right-icon" style="display: flex;align-items: center;">
						<!-- <u-button type="primary" size="mini" @click="receive">上传截图</u-button> -->
						<u-upload :action="action" :file-list="fileList" :max-count="1"></u-upload>
					</view>
				</u-cell-item>
			</u-cell-group>
			<view style="display: flex;justify-content: space-around;margin-top: 50rpx;">
				<u-button style="width: 300rpx;" @click="goBack">返回</u-button>
				<u-button style="width: 300rpx;" type="primary" v-if="type==='receive'" @click="submit">提交任务</u-button>
				<u-button style="width: 300rpx;" type="primary" v-else @click="showReceive = true">领取</u-button>
			</view>
		</view>
		<u-modal v-model="showReceive" :show-cancel-button="true" @confirm="confirmReceive" :title="'领取须知'" :confirm-text="'确认领取'">
			<view style="padding: 30rpx; padding-bottom: 40rpx;">
				<p style="text-indent: 60rpx;">任务领取后将冻结该任务的可领取次数，请您务必在<span style="color: red">规定时间</span>内完成并提交任务。另外，在任务途中一定记得在<span
					 style="color: red">关键界面截图</span>哟！</p>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.type = option.type
		},
		data() {
			return {
				type: 'publish',
				action: 'aa',
				fileList: [{
					url: 'https://cdn.uviewui.com/uview/example/fade.jpg'
				}],
				showReceive: false
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
				this.$util.showToast('领取成功', '', () => {
					uni.navigateTo({
						url: `/pages/task-list/task-list?type=receive`
					})
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
