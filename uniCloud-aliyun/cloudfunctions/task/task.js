const db = uniCloud.database()
exports.addTask = async function(event, context) {
	// 添加任务
	let task = {
		type: event.type,
		link: event.link,
		img: event.img,
		score: event.score,
		totalNum: event.num,
		restNum: event.num,
		desc: event.desc,
		limitTime: event.time,
		createTime: new Date().getTime(),
		creator: event.userInfo.openId,
		avatar: event.userInfo.avatarUrl,
		receiveStatus: []
	}
	let res = await db.collection("task").add(task)
	// 添加完成后做一下积分删减
	let discountScore = event.score * event.num
	await db.collection("user").where({
		openId: event.userInfo.openId,
	}).update({
		score: event.userInfo.score - discountScore
	});
	return res
}
exports.receiveTask = async function(event, context) {
	console.log(event)
	let task = await db.collection("task").where({
		_id: event._id,
	}).get({getOne:true});
	console.log(task.data)
	// 添加任务
	// let task = {
	// 	type: event.type,
	// 	link: event.link,
	// 	img: event.img,
	// 	score: event.score,
	// 	totalNum: event.num,
	// 	restNum: event.num,
	// 	desc: event.desc,
	// 	limitTime: event.time,
	// 	createTime: new Date().getTime(),
	// 	creator: event.userInfo.openId,
	// 	avatar: event.userInfo.avatarUrl,
	// 	receiveStatus: []
	// }
	// let res = await db.collection("task").add(task)
	// // 添加完成后做一下积分删减
	// let discountScore = event.score * event.num
	// await db.collection("user").where({
	// 	openId: event.userInfo.openId,
	// }).update({
	// 	score: event.userInfo.score - discountScore
	// });
	return task
}