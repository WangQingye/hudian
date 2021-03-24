const uniID = require('uni-id')
const db = uniCloud.database()
exports.getOpenId = async function(event,context) {
    const res = await uniID.code2SessionWeixin({
    code: event.code
  })
    return res
}
exports.getUserInfo = async function(event,context) {
	// 更新一下头像和昵称
	db.collection("user").where({openId: event.openId})
	  .update({
		nickName: event.nickName,
		avatarUrl: event.avatarUrl
	});
	let res = await db.collection("user").where({openId: event.openId})
	  .get().then(r => r);
	return res
}