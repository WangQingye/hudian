<template>
	<view class="main">
		<view class="single">
			<view class="title">1、分享得积分</view>
			<view class="text">分享小程序到微信，用户点击链接进入后，推荐新用户得2分，老用户得1分。每天能获得的推荐分上限为5分。</view>
			<u-button style="width: 230rpx;" type="success" open-type="share">去分享</u-button>
		</view>
		<view class="single">
			<view class="title">2、播放广告</view>
			<view class="text">可以通过播放广告获得积分（1次1分），每天最多3次。开发不易，感谢支持！</view>
			<u-button style="width: 230rpx;" type="primary" open-type="share">看广告</u-button>
		</view>
		<view class="single">
			<view class="title">3、每日登录</view>
			<view class="text">每天第一次登录可以获得积分+1，信用分+1，连续多天登录还有额外惊喜，所以，常回来看看噢。</view>
		</view>
		<u-divider>更多方式敬请期待</u-divider>
		<!-- <view class="single">
			<view class="title">2、更多方式敬请期待...</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		onShareAppMessage() {
			return {
				title: '和谐互点，方便你我他！',
				path: `/pages/index/index?recommend=${this.$util.store.userInfo.openId}`,
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
		padding: 20rpx 40rpx;
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
