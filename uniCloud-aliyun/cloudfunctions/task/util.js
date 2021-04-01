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
exports.updateReceiveRecordStatus = async function(receiveId, status, submitImg) {
	// 获取原来的领取条
	let receive = await db.collection("taskReceive").where({
		_id: receiveId,
	}).get({getOne:true});
	receive = receive.data[0]
	// 更新领取条
	let data = { status: status }
	// 如果是完成任务，那么更新一下上传的图片
	if (status == 2) {
		data.submitImg = submitImg
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
		receiveStatus: task.receiveStatus
	}
	// 如果是废弃任务，比如任务过期或删除任务，那么需要加回一下restNum
	if (status == 0 || status == 'del') updateTaskData.restNum = task.restNum + 1
	console.log('bbb',updateTaskData)
	await db.collection("task").where({
		_id: receive.taskId,
	}).update(updateTaskData);
	return {msg: 'success'}
}
// 更新用户积分
exports.updateUserScore = async function(userOpenId, score) {
	await db.collection("user").where({
		openId: userOpenId,
	}).update({
		score: score
	});
}
