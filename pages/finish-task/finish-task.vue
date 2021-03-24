<template>
	<view>
		<view class="task-desc">
			<u-cell-group>
				<u-cell-item icon="setting-fill" title="完成用户" :arrow="false" value="用户X"></u-cell-item>
				<u-cell-item icon="integral-fill" title="完成时间" value="2020-11-05 11:23" :arrow="false"></u-cell-item>
				<u-cell-item icon="integral-fill" title="完成详情" value="已经做完了啊啊啊啊啊啊啊啊" :arrow="false"></u-cell-item>
				<u-cell-item icon="integral-fill" title="上传截图" :arrow="false">
					<view slot="right-icon">
						<u-image width="300rpx" height="300rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
					</view>
				</u-cell-item>
			</u-cell-group>
			<view style="display: flex;justify-content: space-around; margin-top: 60rpx; ">
				<view style="width: 300rpx;">
					<u-button @click="apply">提起申述</u-button>
					<text style="font-size: 20rpx; color: #aaa; text-align: center;">截图有问题时可以提起申述，申述成功后可返回积分</text>
				</view>
				<u-button type="primary" style="width: 300rpx;"@click="goBack">审核通过</u-button>
			</view>
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
				fileList: [{
					url: 'https://cdn.uviewui.com/uview/example/fade.jpg'
				}]
			};
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
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
						});}
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
