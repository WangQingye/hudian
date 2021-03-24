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
		let info = this.store.userInfo
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
					if (!res.errMsg) {
						resolve(res)
					} else {
						uni.showToast({
							title: errMsg,
							duration: 1500,
							icon: 'none'
						});
					}
				});
		})
	}
	async getUserInfo() {
		let res = await this.http('getUserInfo',this.store.userInfo)
		console.log('userinfo:',res.result.data[0])
		this.store.userInfo = res.result.data[0]
		return res.result.data[0]
	}
	// store: {
	// 	userInfo: {},
	// 	nowTask: {}
	// }
}
