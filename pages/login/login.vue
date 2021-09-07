<template>
	<view style="padding: 0 50rpx;">
		<image class="img" src="@/static/share.png" mode=""></image>
		<view class="title" @click="goMyInfo">和谐互助，共享生活</view>
		<view class="text">请登录后获得更好的使用体验</view>
		<button type="primary" @click="getUserProfile">微信登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			getUserProfile(res) {
				console.log(this.$util.store)
				let recommendFrom = this.$util.store.recommendFrom
				uni.getUserProfile({
					desc: '优化用户体验',
					success: async res => {
						let ret = await this.$util.http('addNewUser', Object.assign(res.userInfo, {
							recommendFrom
						}))
						if (ret) {
							this.goMyInfo()
						}
					},
					fail: res => {
						console.log(res)
					}
				})
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
