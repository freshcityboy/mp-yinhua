import Vue from "vue"
import {
  RECEIVE_DETAILINFO,	
  RECEIVE_VIDEOURL,
  RECEIVE_ALLDETAILINFO,
  RECEIVE_DanMu,
  RECEIVE_RECOMMEND,
  RECEIVE_SEARCH,
  DELETE_SEARCH
} from './storeTypes.js'

export default {

	[RECEIVE_RECOMMEND] (state, {recommend}) {
	  state.recommend.push(...recommend)

	},
	[RECEIVE_DETAILINFO] (state, {detailInfo,day}) {
	  
	  state.detailInfo[day] = detailInfo
	},
	[RECEIVE_SEARCH] (state, {search}) {  
	  if(!search.length) {
		   state.search = -1
	  }else{
		  state.search = search
	  }
	},
	
	[ RECEIVE_VIDEOURL] (state, {videoUrl,vID}) {
	  // state.videoUrl[vID] = videoUrl
	  Vue.set(state.videoUrl,vID,videoUrl)   
	},
	// [ RECEIVE_ALLDETAILINFO] (state, {allDetailInfo}) {
	//   console.log(allDetailInfo);
	// 	allDetailInfo.map((item => {
	// 		let {updateDay} = item
	// 		state.detailInfo[updateDay].push(item)
	// 	}))
	// },
	[ RECEIVE_DanMu] (state, {danmuList,vID}) {
	  state.danmuList = danmuList
	 console.log(state.danmuList);
	 
	},
	[ DELETE_SEARCH] (state) {
	  state.search = [] 
	}
	
}
