export default class util {
	constructor() {
		this.store = {
			userInfo: {},
			nowTask: {}
		}
		this.taskStatusType = [
			'已过期', '进行中', '已完成', '申述中', '申述通过', '申述失败'
		]
	}
	showToast(text, icon, cb) {
		uni.showToast({
			title: text,
			duration: 1000,
			icon: icon || 'none',
			complete() {
				setTimeout(() => {
					cb && cb()
				}, 1000)
			}
		});
	}
	http(funcName, data) {
		let info = this.store.userInfo
		return new Promise((resolve, reject) => {
			uni.showLoading({
				title: '加载中'
			});
			uniCloud.callFunction({
					name: 'task',
					data: {
						funcName,
						userInfo: info,
						...data
					}
				})
				.then(res => {
					uni.hideLoading()
					if (!res.result.err) {
						resolve(res)
					} else {
						uni.showToast({
							title: res.result.err,
							duration: 2000,
							icon: 'none'
						});
						reject()
					}
				})
		})
	}
	async getUserInfo() {
		return new Promise((resolve, reject) => {
			uni.getUserInfo({
				success: async (res) => {
					this.store.userInfo.nickName = res.userInfo.nickName
					this.store.userInfo.avatarUrl = res.userInfo.avatarUrl
					let ret = await this.http('getUserInfo', this.store.userInfo)
					this.store.userInfo = ret.result.data[0]
					resolve(this.store.userInfo)
				},
				fail: (res) => {
					uni.navigateTo({
						url: `/pages/login/login`
					});
					reject()
				}
			})
		})
	}
}
