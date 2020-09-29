'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		user_id,
		avatar = '',
		// article_id
	} = event
	await db.collection('user').doc(user_id).update({
		user_id:user_id,
		avatar: avatar
	})
	// const article = await db.collection('article').doc(article_id).get()
	
	// // 获取文章下的所有评论
	// const comments = article.data[0].comments
	// let commentObj = {
	// 	author: {
	// 		avatar: avatar // 作者头像
	// 	},
	// }
	// await db.collection('article').doc(article_id).update({
	// 	comments: commentObj
	// })
	// .aggregate()
	//返回数据给客户端
	return {
		code: 200,
		msg: '图像修改成功'
	}
};
