const db = uniCloud.database()
// 获取一个任务
async function getOneTask(_id) {
	let task = await db.collection("task").where({
		_id: _id,
	}).get({getOne:true});
	task = task.data[0]
	return task
}
exports.getOneTask = getOneTask
// 更新任务的剩余数量
exports.updateTaskRestNum = async function(_id, restNum) {
	await db.collection("task").where({
		_id: _id,
	}).update({
		restNum: restNum
	});
}
// 添加一条任务领取条
exports.addTaskReceiveRecord = async function(_id, receive) {
	// 获取原来的领取情况，添加一条
	let task = await getOneTask(_id)
	task.receiveStatus.push(receive)
	await db.collection("task").where({
		_id: _id,
	}).update({
		receiveStatus: task.receiveStatus
	});
}
// 修改领取条状态
exports.updateReceiveRecordStatus = async function(receiveId, status, submitImg, allegeFrom) {
	// 获取原来的领取条
	let receive = await db.collection("taskReceive").where({
		_id: receiveId,
	}).get({getOne:true});
	receive = receive.data[0]
	// 更新领取条
	let data = { status: status }
	// 如果是提交任务，那么更新一下上传的图片
	if (status == 'SUBMIT') {
		data.submitImg = submitImg
		data.submitTime = new Date().getTime() // 上传时间
	}
	// 如果是申述任务，那么记录一下是谁发起的申述，用于判定是发布者还是领取者
	if (status == 'ALLEGE') {
		data.allegeFrom = allegeFrom
	}
	// 如果是任务审批失败，那么把分退给发布者，因为在发布任务的时候扣过分了
	if (status == 'REJECTED') {
		await addUserScore(receive.taskDetail.creator, receive.taskDetail.score, 0)
	}
	if (status == 'ALLEGE-SUCCESSED') {
		// 如果是申述成功，那么先看一下是谁申述的，
		// 同时，被申述的人还需要被扣掉信用分
		let applyer = receive.allegeFrom
		let receiver = receive.receiveUserId
		let creator = receive.taskDetail.creator
		let score = receive.taskDetail.score
		// 如果是领取人申述的，那么需要将发布人的分扣除给领取人加分
		if (applyer == receiver) {
			// 领取人的分在发布任务的时候已经扣过了，所以只需要扣除任务次数
			await addUserScore(creator, -score, -10)
			await addUserScore(receiver, score, 0)
		}
		// 如果是发布人申述，那么需要将任务分退回给发布人，将领取者的分扣除
		if (applyer == creator) {
			await addUserScore(receiver, -score, -10)
			await addUserScore(creator, score, 0)
		}
	}
	if (status == 'del') {
		await db.collection("taskReceive").doc(receiveId).remove()
	} else {
		await db.collection("taskReceive").where({
			_id: receiveId,
		}).update(data);
	}
	// 更新任务中的领取条
	let task = await getOneTask(receive.taskId)
	// 获取任务中原来的领取情况,并改变之
	task.receiveStatus.forEach((item,index) => {
		if (item.receiveId === receiveId) {
			// 如果是删除任务那直接删除
			if (status == 'del') {
				task.receiveStatus.splice(index, 1)
			} else {
				task.receiveStatus[index] = {...item, ...data}
			}
		}
	})
	let updateTaskData = {
		receiveStatus: task.receiveStatus,
		// 这里是申述后可能会改变剩余次数
		restNum: task.restNum
	}
	// 如果是废弃任务，比如任务过期或删除任务或者判定为任务失败，那么需要加回一下restNum
	if (status == 0 || status == 'del' || status == 'PASSED') updateTaskData.restNum++
	await db.collection("task").where({
		_id: receive.taskId,
	}).update(updateTaskData);
	return {msg: 'success'}
}
// 加减用户积分
async function addUserScore(userOpenId, score, credit) {
	await db.collection("user").where({
		openId: userOpenId,
	}).update({
		score: db.command.inc(score),
		credit: credit ? db.command.inc(credit) : db.command.inc(0)
	});
}
exports.addUserScore = addUserScore
