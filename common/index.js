export default class util {
	constructor() {
		this.store = {
			userInfo: {},
			nowTask: {},
			nowReceive: {},
			recommendFrom: '',
			showReal: false,
			accessToken: ''
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
				.catch(err => {
					uni.hideLoading()
					console.log('err', err)
					uni.showToast({
						title: '抱歉出了一点小错误，请稍后再试或重新打开小程序',
						duration: 2000,
						icon: 'none'
					});
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
			if (new Date().getTime() - ret.result.todayFirstLoginTime < 1000) {
				uni.showToast({
					title: '每日登录获得：积分+1，信用分+1',
					duration: 2000,
					icon: 'none'
				});
			}
			return ret.result
		} else {
			uni.redirectTo({
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
	getAccessToken() {
		let that = this
		return new Promise((resolve, reject) => {
			uni.request({
				url: 'https://api.weixin.qq.com/cgi-bin/token', //仅为示例，并非真实接口地址。
				// url: 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=ACCESS_TOKEN', //仅为示例，并非真实接口地址。
				data: {
					grant_type: 'client_credential',
					appid: 'wxa5c8a9951e47b6ba',
					secret: 'c333a5d1ff4efdc417dc3125b75c9f5d'
				},
				success: (res) => {
					this.store.accessToken = res.data.access_token
					resolve(res.data)
				}
			})
		})
	}
	testMsg(content) {
		let that = this
		return new Promise((resolve, reject) => {
			uni.request({
				method: 'POST',
				url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${that.store.accessToken}`,
				data: {
					"openid": that.store.userInfo.openId,
					"scene": 3,
					"version": 2,
					"content": content
				},
				success: (res) => {
					console.log(res)
					resolve(res.data)
				}
			})
		})
	}

	// wxa5c8a9951e47b6ba
}
