<template>
	<view class="my-info" v-if="userInfo.nickName">
		<view class="info">
			<u-avatar class="avatar" size="140" :src="userInfo.avatarUrl"></u-avatar>
			<view class="name-info">
				<view class="name">{{userInfo.nickName}}</view>
				<view class="score">积分：{{userInfo.score}}</view>
				<view class="score" style="margin-top:10rpx">信用分：{{userInfo.credit}}</view>
			</view>
		</view>
		<u-gap height="15" bg-color="#eee"></u-gap>
		<u-cell-group>
			<u-cell-item icon="email" title="发布任务" @click="goPublish()"></u-cell-item>
			<u-cell-item icon="coupon-fill" title="我发布的" @click="goList('publish')"></u-cell-item>
			<u-cell-item icon="coupon" title="我领取的" @click="goList('receive')"></u-cell-item>
			<u-cell-item icon="gift-fill" title="获取积分" @click="goShare"></u-cell-item>
			<u-cell-item icon="question-circle" title="使用帮助" @click="goHelp"></u-cell-item>
			<u-cell-item v-if="userInfo.nickName === '云之澜'" icon="server-man" title="申述处理" @click="goList('allege')"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			async getUserInfo() {
				let res = await this.$util.getUserInfo();
				console.log('用户信息：', res)
				if (res) {
					this.userInfo = res
				}
			},
			goPublish(type) {
				uni.navigateTo({
					url: `/pages/publish/publish`
				})
			},
			goList(type) {
				uni.navigateTo({
					url: `/pages/task-list/task-list?type=${type}`
				})
			},
			goShare() {
				uni.navigateTo({
					url: `/pages/get-score/get-score`
				})
			},
			goHelp() {
				uni.navigateTo({
					url: `/pages/help/help`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-info {
		.info {
			display: flex;
			padding: 100rpx;

			.avatar {
				margin-right: 50rpx;
				// border: 1px solid #bbb;
				padding: 10rpx;
				border-radius: 50%;
			}

			.name-info {
				.name {
					font-size: 40rpx;
					margin-bottom: 20rpx;
				}
			}
		}
	}
</style>
