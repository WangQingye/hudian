'use strict';
// 每小时定时执行函数
const util = require('./util')
const db = uniCloud.database()
exports.main = async (event, context) => {
	await passSubmitReceive()
	await findPassedReceive()
	await refreshUserStatus()
};
// 自动通过提交过久的任务条
async function passSubmitReceive() {
	let nowTime = new Date().getTime()
	// 获取当前未提交状态的任务条
	let recevies = await db.collection("taskReceive").where({
		status: "SUBMIT"
	}).get()
	for (let i = 0; i < recevies.data.length; i++) {
		let r = recevies.data[i]
		// 一小时后自动通过
		if (nowTime - (60 * 60 * 1000) > r.submitTime) {
			await util.updateReceiveRecordStatus(r._id, 'FINISHED')
			await util.addUserScore(r.receiveUserId, r.taskDetail.score)
		}
	}
}
// 改变超过任务时间的任务条为过期状态
async function findPassedReceive() {
	let nowTime = new Date().getTime()
	// 获取当前未提交状态的任务条
	let recevies = await db.collection("taskReceive").where({
		status: "DOING"
	}).get()
	console.log(recevies.data)
	for (let i = 0; i < recevies.data.length; i++) {
		let r = recevies.data[i]
		// 时间超过过期时间后变为过期状态
		if (nowTime > r.pastTime) {
			await util.updateReceiveRecordStatus(r._id, 'PASSED')
		}
	}
}
// 初始化用户每日状态
async function refreshUserStatus() {
	let nowTime = new Date()
	// 每天0点刷新
	if (nowTime.getHours() == 0) {
		await db.collection("user").where({
			credit: db.command.gt(0)
		}).update({
			"todayRecommendUsers": [],
			"todayWatchAdTime": 0,
			"todayFirstLoginTime": 0
		})
	}
}
