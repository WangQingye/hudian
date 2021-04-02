export const pullDownMixin = {
	onPullDownRefresh() {
		this.$refs.udb.loadData({
			clear: true
		}, () => {
			// 停止下拉刷新
			uni.stopPullDownRefresh()
		})
	},
	onReady() {
		this.$refs.udb.loadData()
	},
	onReachBottom() { //滚动到底翻页
		this.$refs.udb.loadMore()
	}
}
