// #ifdef MP-WEIXIN
	wx.cloud.init()
	const db = wx.cloud.database()
// #endif

   


export default {
	reqDetailInfo(condition) {
		return new Promise((resolve,reject) => {
			db.collection('detailInfo')
				  .where({
					...condition // 填入当前用户 openid
				  })
				  .get()
				  .then(res => {
					resolve(res.data)
				  })
				  .catch(err => {
					reject(err)
				  })		
		})
	},
	reqRecommend(num) {
		return new Promise((resolve,reject) => {
			db.collection('recommend')
				
				  .skip(10*num) // 跳过结果集中的前 10 条，从第 11 条开始返回
				  .limit(10) // 限制返回数量为 10 条
				  .get()
				  .then(res => {
					resolve(res.data)
				  })
				  .catch(err => {
					reject(err)
				  })		
		})
	},
	reqVideoUrl(vID) {
		return new Promise((resolve,reject) => {
			db.collection('videoUrl')
				  .where({
					vID // 填入当前用户 openid
				  })
				  .get()
				  .then(res => {
					resolve(res.data)
				  })
				  .catch(err => {
					reject(err)
				  })		
		})
	},
	reqDanMu(vID, playIndex) {
		return new Promise((resolve,reject) => {
			db.collection('danMu')
				  .where({
					vID ,
					playIndex
				  })
				  .get()
				  .then(res => {
					resolve(res.data)
				  })
				  .catch(err => {
					reject(err)
				  })		
		})
	},
	addNewDoc(collection, data) {
		db.collection(collection).add({
		  data,
		  createTime: db.serverDate(),
		  success: function(res) {
		    // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
		    console.log(res)
		  },
		  fail: console.error
		})
	},
	updateDoc(_id, newObj){
		db.collection('user').doc('todo-identifiant-aleatoire').update({
		  // data 传入需要局部更新的数据
		  data: {
		    newObj
		  },
		  success: console.log,
		  fail: console.error
		})
	}
}