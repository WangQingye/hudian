<template>
	<view>
		<view class="task-desc">
			<u-cell-group>
				<u-cell-item icon="setting-fill" title="任务平台" :arrow="false" value="拼多多"></u-cell-item>
				<u-cell-item v-if="type !== 'receive'" icon="integral-fill" title="剩余次数" value="3" :arrow="false"></u-cell-item>
				<u-cell-item icon="integral-fill" title="任务链接" value="http://adsadsa.com" :arrow="false">
					<u-button slot="right-icon" size="mini" style="margin-left: 20rpx;" type="primary">一键复制</u-button>
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
						<u-upload :action="action" :file-list="fileList" :max-count="1" ></u-upload>
					</view>
				</u-cell-item>
			</u-cell-group>
			<u-row justify="around" style="margin-top: 120rpx;">
				<u-col span="5">
					<u-button @click="goBack">返回</u-button>
				</u-col>
				<u-col span="5">
					<u-button type="primary" v-if="type==='receive'" @click="receive">提交任务</u-button>
					<u-button type="primary" v-else @click="receive">领取</u-button>
				</u-col>
			</u-row>
		</view>

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
					url:'https://cdn.uviewui.com/uview/example/fade.jpg'
				}]
			};
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			receive() {
				
			}
		}
	}
</script>

<style lang="scss">

</style>
