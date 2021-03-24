<template>
	<view style="padding: 0 50rpx;">
		<image class="img" src="@/static/share.png" mode=""></image>
		<view class="title" @click="goMyInfo">和谐互助，共享生活</view>
		<view class="text">请登录后获得更好的使用体验</view>
		<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">微信登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			getUserInfo(res) {
				if (res.detail.errMsg === 'getUserInfo:ok') {
					this.goMyInfo()
				}
			},
			goMyInfo() {
				uni.switchTab({
					url: `/pages/my-info/my-info`
				})
			}
		}
	}
</script>

<style scoped>
.img {
	display: block;
	margin: 0 auto;
	margin-top: 200rpx;
	width: 200rpx;
	height: 200rpx;
	border-radius: 20rpx;
}
.title {
	text-align: center;
	font-size: 38rpx;
	font-weight: bold;
	margin: 30rpx 0;
}
.text {
	text-align: center;
	font-size: 30rpx;
	color: #aaa;
	margin: 30rpx 0;
}
</style>
