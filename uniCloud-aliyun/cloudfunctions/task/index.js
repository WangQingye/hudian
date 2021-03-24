'use strict';
const taskController = require('./task.js')
const userController = require('./user.js')
const funcs = {
	...taskController,
	...userController
}
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const res = await funcs[event.funcName](event, context)
	//返回数据给客户端
	return res
};
