export default class util {
	constructor() {
	    this.store = {
			userInfo: {},
			nowTask: {}
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
		console.log(this.store)
		let info = this.store.userInfo
		console.log(info)
		return new Promise((resolve, reject) => {
			uniCloud.callFunction({
					name: 'task',
					data: {
						funcName,
						userInfo: info,
						...data
					}
				})
				.then(res => {
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
				});
		})
	}
	async getUserInfo() {
		return new Promise((resolve, reject) => {	
			uni.getUserInfo({
				success: async (res) => {
					this.store.userInfo.nickName = res.userInfo.nickName
					this.store.userInfo.avatarUrl = res.userInfo.avatarUrl
					let ret = await this.http('getUserInfo',this.store.userInfo)
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
	// store: {
	// 	userInfo: {},
	// 	nowTask: {}
	// }
}
