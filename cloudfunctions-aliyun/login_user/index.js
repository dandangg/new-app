'use strict';
// 获取数据库的引用
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		username,
		password
	} = event
	console.log(username,password)
	//模拟登录，随机返回一位用户信息；
	let userinfo = await db.collection('user').get()
	const {
		 data
	} = userinfo
	const result = data[Math.floor(Math.random()*data.length)];
	//返回数据给客户端
	return {
		code: 200,
		msg: '获取数据成功',
		data: result
	}
};