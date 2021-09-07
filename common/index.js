export default class util {
	constructor() {
		this.store = {
			userInfo: {},
			nowTask: {},
			nowReceive: {},
			recommendFrom: ''
		}
		// this.taskStatusType = [
		// 	'已过期', '进行中', '已完成', '申述中', '申述通过', '申述失败','已提交,等待审核'
		// ]
		this.taskStatusType = {
			'PASSED': '已过期',
			'DOING': '进行中',
			'FINISHED': '已完成',
			'ALLEGE': '申述中',
			'ALLEGE-SUCCESSED': '申述通过',
			'ALLEGE-FAILED': '申述失败',
			'SUBMIT': '已提交,等待审核',
			'REJECTED': '审核失败'
		}
		this.statusColor = {
			'已过期': 'red',
			'进行中': '',
			'已完成': '',
			'申述中': '',
			'申述通过': '',
			'申述失败': ''
		}
	}
	showToast(text, icon, cb) {
		uni.showToast({
			title: text,
			duration: 1500,
			icon: icon || 'none',
			complete() {
				setTimeout(() => {
					cb && cb()
				}, 1500)
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
		let ret = await this.http('getUserInfo', Object.assign(this.store.userInfo, {
			recommendFrom: this.store.recommendFrom
		}))
		if (ret.result.openId) {
			this.store.userInfo = ret.result
			// 说明是刚刚完成第一次登录，给个提示
			if (new Date().getTime() - ret.result.todayFirstLoginTime < 5000) {
				uni.showToast({
					title: '每日登录获得：积分+1，信用分+1',
					duration: 2000,
					icon: 'none'
				});
			}
			return ret.result
		} else {
			uni.navigateTo({
				url: `/pages/login/login`
			});
		}
		// return new Promise((resolve, reject) => {
		// 	uni.getUserInfo({
		// 		success: async (res) => {
		// 			console.log('uni-getuser', res)
		// 			this.store.userInfo.nickName = res.userInfo.nickName
		// 			this.store.userInfo.avatarUrl = res.userInfo.avatarUrl
		// 			let ret = await this.http('getUserInfo', this.store.userInfo)
		// 			this.store.userInfo = ret.result.data[0]
		// 			resolve(this.store.userInfo)
		// 		},
		// 		fail: (res) => {
		// 			uni.navigateTo({
		// 				url: `/pages/login/login`
		// 			});
		// 			reject()
		// 		}
		// 	})
		// })
	}
	previewImg(urls) {
		uni.previewImage({
			urls: urls
		})
	}
}
