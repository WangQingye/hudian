<template>
	<view class="content">
		<u-card margin="10rpx" v-for="(card,index) in cards" :key="index" :title="card.title" :sub-title="`剩余次数：${card.times}`" :thumb="card.img">
			<view class="" slot="body">
				<view class="u-body-item u-flex u-col-between u-p-t-0">
					<view class="u-body-item-title">任务描述：暂无</view>
				</view>
			</view>
			<view class="" slot="foot">
				<u-icon name="gift" size="34" color="" :label="`奖励 ${card.score} 积分`"></u-icon>
			</view>
		</u-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cards: [{
					title: '拼多多任务',
					times: 5,
					text: '砍价任务',
					img: '../../../static/pdd.jpg',
					score: 1
				}, {
					title: '滴滴任务',
					times: 5,
					text: '任务',
					img: '../../../static/didi.jpg',
					score: 2
				}, {
					title: '淘宝任务',
					times: 5,
					text: '任务',
					img: '../../../static/tb.jpg',
					score: 1
				}, {
					title: '个性链接',
					times: 5,
					text: '任务',
					img: '../../../static/rw.jpg',
					score: 1
				}]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 10rpx 0rpx;

		.u-body-item-title {
			width: 100%;
		}
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
</style>
