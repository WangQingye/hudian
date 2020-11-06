<template>
	<view class="my-info">
		<view class="info">
			<u-avatar class="avatar" size="120" src="../../static/jiarufangjian-01.png"></u-avatar>
			<view class="name-info">
				<view class="name">云之澜</view>
				<view class="score">积分：11</view>
			</view>
		</view>
		<u-gap height="15" bg-color="#eee"></u-gap>
			<u-cell-group>
				<u-cell-item icon="order" title="我发布的" @click="goList('publish')"></u-cell-item>
				<u-cell-item icon="red-packet" title="我领取的" @click="goList('receive')"></u-cell-item>
			</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goList(type) {
				uni.navigateTo({
					url: `/pages/task-list/task-list?type=${type}`
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
			border: 1px solid #bbb;
			padding: 10rpx;
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
