import Vue from "vue"
import {
  RECEIVE_DETAILINFO,	
  RECEIVE_VIDEOURL,
  RECEIVE_ALLDETAILINFO,
  RECEIVE_DanMu,
  RECEIVE_RECOMMEND
} from './storeTypes.js'

export default {

	[RECEIVE_RECOMMEND] (state, {recommend}) {
	  state.recommend.push(...recommend)

	},
	[RECEIVE_DETAILINFO] (state, {detailInfo,day}) {
	  
	  state.detailInfo[day] = detailInfo
	},
	[ RECEIVE_VIDEOURL] (state, {videoUrl,vID}) {
	  // state.videoUrl[vID] = videoUrl
	  Vue.set(state.videoUrl,vID,videoUrl)   
	},
	[ RECEIVE_ALLDETAILINFO] (state, {allDetailInfo}) {
	  console.log(allDetailInfo);
		allDetailInfo.map((item => {
			let {updateDay} = item
			state.detailInfo[updateDay].push(item)
		}))
	},
	[ RECEIVE_DanMu] (state, {danmuList,vID}) {
	  state.danmuList = danmuList
	 console.log(state.danmuList);
	},
}
