// #ifdef MP-WEIXIN
	wx.cloud.init()
	const db = wx.cloud.database()
// #endif

export default {
	reqDetailInfo(condition) {
		return new Promise((resolve,reject) => {
			db.collection('detailInfo')
				  .where({
					...condition 
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
	reqSearch(text) {
		return new Promise((resolve,reject) => {
			db.collection('allDetailInfo')
				  .where({
					name: db.RegExp({
					regexp: text,
					options: 'i',
					})
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
	reqUser(openId){
		return new Promise((resolve,reject) => {
			db.collection('users')
				  .where({
					_openid :openId
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
			uni.setStorage({
				key: '_id',
				data: res._id,
				success: (result)=> {
					console.log(result);	
				}
			})
		    console.log(res)
		  },
		  fail: console.error
		})
	},
	updateDoc(collection,data){	
			uni.getStorage({
				key: '_id',
				success(res) { 
					console.log(45678789);
					console.log(res);
					let _id = res.data; 
					if(!_id){throw new Error(_id)}
					db.collection(collection).doc(_id)
					.update({
					  data: {
					    ...data
					  },
					})
					console.log(data);	
				},
				fail:(err)=> {
					console.log(err);
					this.addNewDoc(collection,data)
				}
				
			})	
	},
	callFunction(name){
		return new Promise((resolve,reject)=>{
			wx.cloud.callFunction({ //
			    // 要调用的云函数名称
			    name,
			    success:(res)=>{
					resolve(res)
				},
				fail:(err)=>{
					reject(err)
				}
			})	
		})
	}
}