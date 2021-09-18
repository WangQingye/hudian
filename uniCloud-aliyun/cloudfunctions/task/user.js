const uniID = require('uni-id')
const db = uniCloud.database()
exports.getOpenId = async function(event, context) {
	const res = await uniID.code2SessionWeixin({
		code: event.code
	})
	return res
}
exports.getUserInfo = async function(event, context) {
	let user = await db.collection("user").where({
			openId: event.openId
		})
		.get({
			getOne: true
		})
	let userData = user.data[0]
	let updateData = {}
	if (userData) {
		// 如果是0说明今天是第一次登录
		if (userData.todayFirstLoginTime == 0) {
			// 更新登录时间，发放每日登录积分，每日登录信用分
			updateData = {
				todayFirstLoginTime: new Date().getTime(),
				score: userData.score + 1,
				credit: userData.credit + 1
			}
		}
		// 如果是通过点击分享进入的，那么给推荐人加分，另外自己不能推荐自己
		if (event.recommendFrom && !userData.todayRecommendFrom && event.openId != event.recommendFrom) {
			let recommendUser = await db.collection("user").where({
					openId: event.recommendFrom
				})
				.get({
					getOne: true
				})
			let recommendUserData = recommendUser.data[0]
			// 还要确认今天这个人获得的推荐分没有超过阈值
			if (recommendUserData.todayRecommendScore < 5) {
				await db.collection("user").where({
						openId: event.recommendFrom
					})
					.update({
						score: db.command.inc(1),
						todayRecommendScore: db.command.inc(1),
					})
				// 如果加分成功了，那么需要被推荐人的今日推荐人也需要填上
				updateData.todayRecommendFrom = event.recommendFrom
			}
		}
		if (Object.keys(updateData).length > 0) {
			await db.collection("user").where({
					openId: event.openId
				})
				.update(updateData)
		}
		userData = Object.assign(userData, updateData)
		return userData
	} else {
		return {}
	}
}
exports.addNewUser = async function(event, context) {
	let newUser = {
		"openId": event.userInfo.openId,
		"score": 0,
		"credit": 100,
		"avatarUrl": event.avatarUrl,
		"nickName": event.nickName,
		"todayRecommendFrom": "",
		"todayRecommendScore": 0,
		"todayWatchAdTime": 0,
		"todayFirstLoginTime": 0
	}
	// 如果是通过点击分享进入的，那么给推荐人加分
	if (event.recommendFrom) {
		let recommendUser = await db.collection("user").where({
				openId: event.recommendFrom
			})
			.get({
				getOne: true
			})
		let recommendUserData = recommendUser.data[0]
		// 还要确认今天这个人获得的推荐分没有超过阈值
		if (recommendUserData.todayRecommendScore < 5) {
			// 如果正好等于4，只能加1分
			let addScore = recommendUserData.todayRecommendScore == 4 ? 1 : 2
			await db.collection("user").where({
					openId: event.recommendFrom
				})
				.update({
					score: db.command.inc(addScore),
					todayRecommendScore: db.command.inc(addScore),
				})
			// 如果加分成功了，那么需要被推荐人的今日推荐人也需要填上
			newUser.todayRecommendFrom = event.recommendFrom
		}
	}
	await db.collection("user").add(newUser)
	return {
		data: [newUser]
	}
}
// 提交建议
exports.addSuggestion = async function(event) {
	let suggestion = {
		"suggestion": event.suggestion
	}
	await db.collection("suggest").add(suggestion)
	return {
		data: [suggestion]
	}
}
// 提交建议
exports.testVersionAudit = async function(event) {
	let res = await db.collection("suggest").where({
		suggestion: event.version
	}).get({
		getOne: true
	});
	return res.data.length ? true : false
}
	
