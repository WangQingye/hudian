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
	if (user.data.length) {
		// 已存在此老用户
		// 更新一下头像和昵称
		db.collection("user").where({
				openId: event.openId
			})
			.update({
				nickName: event.nickName,
				avatarUrl: event.avatarUrl
			});
		let res = await db.collection("user").where({
				openId: event.openId
			})
			.get().then(r => r);
		return res
	} else {
		// 新用户
		let newUser = {
			"openId": event.openId,
			"score": 0,
			"credit": 100,
			"status": 1,
			"finishTaskNum": 0,
			"avatarUrl": event.avatarUrl,
			"nickName": event.nickName
		}
		await db.collection("user").add(newUser)
		return {data:[newUser]}
	}
}
