const db = uniCloud.database()
const util = require('./util')
exports.getTask = async function(event, context) {
	// 获取任务原型
	let task = await util.getOneTask(event.taskId)
	return task
}
exports.addTask = async function(event, context) {
	// 添加任务
	let task = {
		type: event.type,
		link: event.link,
		img: event.img,
		score: Number(event.score),
		totalNum: Number(event.num),
		restNum: Number(event.num),
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
	await util.addUserScore(event.userInfo.openId, -discountScore)
	return res
}
// 擦亮任务
exports.refreshTask = async function(event, context) {
	// 获取任务原型
	let task = await util.getOneTask(event.taskId)
	let now = new Date().getTime()
	if (now - task.createTime < 60000) {
		return {
			err: '1分钟内只能刷新一次哦，休息一下再来吧'
		}
	} else {
		// 删除任务
		let res = await db.collection("task").where({
			_id: event.taskId,
		}).update({
			createTime: now
		})
		return res
	}
}
// 删除任务
exports.delTask = async function(event, context) {
	// 获取任务原型
	let task = await util.getOneTask(event.taskId)
	// 查看当前是否有被领取并且状态是DOING或者SUBMIT的任务条
	let has = task.receiveStatus.filter((item,index) => {
		return item.status == 'DOING' || item.status == 'SUBMIT'
	})
	if (has.length) {
		return {
			err: '当前有用户领取或提交了任务，请前往审批或等待任务过期后再删除'
		}
	} else {
		// 删除任务
		let res = await db.collection("task").where({
			_id: event.taskId,
		}).remove()
		// 删除任务的时候退回剩余次数的对应的分数
		let restScore = task.restNum * task.score
		await util.addUserScore(event.userInfo.openId, restScore)
		return res
	}
}
// 领取任务
exports.receiveTask = async function(event, context) {
	let now = new Date().getTime()
	// 判断用户是否有正在执行的任务
	let userReceive = await db.collection("taskReceive").where({
		receiveUserId: event.userInfo.openId,
	}).get();
	let hasTaskDoing = userReceive.data.filter(r => {
		// 如果任务的过期时间没到，并且任务是进行中的状态，那么这时候用户不能领取
		return r.pastTime > now && r.status == 'DOING'
	})
	if (hasTaskDoing.length) {
		return {
			err:'您有正在进行中的任务，先去完成吧'
		}
	}
	// 获取任务原型
	let task = await util.getOneTask(event.taskData._id)
	// 这个必须服务器来判断
	if (Number(task.restNum) < 1) {
		return {
			err:'该任务已被领完，快去找其他任务吧'
		}
	}
	delete task.receiveStatus
	let receive = {
		taskId: task._id,
		taskDetail: task,
		receiveUserId: event.userInfo.openId,
		receiveUserName: event.userInfo.nickName,
		receiveTime: now,
		limitTime: task.limitTime,
		pastTime: now + task.limitTime * 60 * 1000,
		status: 'DOING', // 1进行中
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
// 领取条 - 改变领取条状态 （手动，或者到时间自动执行）
exports.updateReceiveStatus = async function(event, context) {
	let res
	if (event.status == 'SUBMIT') {
		// 如果是提交任务，需要更新一下提交任务的图片
		res = await util.updateReceiveRecordStatus(event.receiveId, event.status, event.submitImg)
	} else if (event.status == 'FINISHED') {
		// 如果是完成通过任务需要给做任务者积分
		res = await util.updateReceiveRecordStatus(event.receiveId, event.status)
		await util.addUserScore(event.receiveUserId, event.score)
	} else if (event.status == 'ALLEGE') {
		// 如果是申述任务，那么记录一下是谁发起的申述，用于判定是发布者还是领取者
		res = await util.updateReceiveRecordStatus(event.receiveId, event.status, '', event.userInfo.openId)
	} else if (event.status == 'ALLEGE-SUCCESSED') {
		res = await util.updateReceiveRecordStatus(event.receiveId, event.status)
	} else {
		// 其他状态直接更新任务条状态
		res = await util.updateReceiveRecordStatus(event.receiveId, event.status)
	}
	return res
}
// 领取条 - 放弃任务
exports.giveupTask = async function(event, context) {
	let res = await util.updateReceiveRecordStatus(event.receiveId, event.status)
	return res
}
exports.getReceiveData = async function(event, context) {
	let receive = await db.collection("taskReceive").where({
		_id: event.receiveId,
	}).get({getOne:true});
	receive = receive.data[0]
	return receive || {}
}
exports.getReceiveData = async function(event, context) {
	let receive = await db.collection("taskReceive").where({
		_id: event.receiveId,
	}).get({getOne:true});
	receive = receive.data[0]
	return receive || {}
}
exports.testMsg = async function(event, context) {
	let pass = await util.testMsg(event.msg, event.userId)
	return pass
}
exports.getIndexNotices = async function(event, context) {
	let receiveNum = await db.collection("taskReceive").count()
	let userNum = await db.collection("user").count()
	return [`小程序已完成助力${receiveNum.total}次，参与人数${userNum.total}人`, '广场任务较少，发布任务会很快被完成，快去吧！', '分享小程序到微信是获取积分最快的方式']
}