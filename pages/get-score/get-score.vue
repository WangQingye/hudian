<template>
	<view class="main">
		<view class="single">
			<view class="title">1、分享得积分</view>
			<view class="text">分享小程序到微信，用户点击链接进入后，推荐新用户得3分，老用户得1分。</view>
			<u-button style="width: 230rpx;" type="success" open-type="share">去分享</u-button>
		</view>
		<u-divider>更多方式敬请期待</u-divider>
		<!-- <view class="single">
			<view class="title">2、更多方式敬请期待...</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '和谐互点，方便你我他！',
				path: '/pages/index/index',
				imageUrl: '../../static/share.png'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.main {
	.single {
		padding: 40rpx;
		margin: 20rpx 0;
	}
	.title {
		font-size: 36rpx;
		font-weight: bold;
	}
	.text {
		margin: 20rpx 0;
		line-height: 48rpx;
	}
}
</style>
