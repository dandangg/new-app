'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		user_id,
		avatar = ''
	} = event
	await db.collection('user').doc(user_id).update({
		user_id:user_id,
		avatar: avatar
	})
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '图像修改成功'
	}
};
