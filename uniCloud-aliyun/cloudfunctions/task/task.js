const db = uniCloud.database()
const util = require('./util.js')
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
	await util.updateUserScore(event.userInfo.openId, event.userInfo.score - discountScore)
	return res
}
// 领取任务
exports.receiveTask = async function(event, context) {
	// 获取任务原型
	let task = await util.getOneTask(event.taskData._id)
	// 这个必须服务器来判断
	if (Number(task.restNum) < 1) {
		return {
			err:'该任务已被领完，快去找其他任务吧'
		}
	}
	delete task.receiveStatus
	let now = new Date().getTime()
	let receive = {
		taskId: task._id,
		taskDetail: task,
		receiveUserId: event.userInfo.openId,
		receiveUserName: event.userInfo.nickName,
		receiveTime: now,
		limitTime: task.limitTime,
		pastTime: now + task.limitTime * 60 * 1000,
		status: 1,
		desc: '',
		submitImg: ''
	}
	let res = await db.collection("taskReceive").add(receive)
	// 为原任务添加一条领取记录
	await util.addTaskReceiveRecord(task._id, {...receive, receiveId: res.id})
	// 减去任务剩余次数，将领取单放入
	await util.updateTaskRestNum(task._id, Number(task.restNum) - 1)
	return res
}
// 领取条 - 提交任务
exports.submitTask = async function(event, context) {
	let res = await util.updateReceiveRecordStatus(event.receiveId, event.status, event.submitImg)
	// 提交后获得一下积分
	await util.updateUserScore(event.userInfo.openId, event.userInfo.score + Number(event.score))
	return res
}
// 领取条 - 放弃任务
exports.giveupTask = async function(event, context) {
	let res = await util.updateReceiveRecordStatus(event.receiveId, event.status)
	return res
}