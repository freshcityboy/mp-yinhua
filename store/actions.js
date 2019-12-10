import api from '../api/index.js'
import {
	RECEIVE_DETAILINFO,
	RECEIVE_VIDEOURL,
	RECEIVE_ALLDETAILINFO,
	RECEIVE_DanMu,
	RECEIVE_RECOMMEND,
	RECEIVE_SEARCH,
	DELETE_SEARCH
} from './storeTypes.js'

const {reqDetailInfo, reqRecommend, reqVideoUrl, reqSearch, reqAllDetailInfo, reqDanMu, addNewDoc} = api  // 这里要注意，用export default 暴露出的对象，不能在import时直接解构

export default { 
  async getRecommend ({ commit },num) {
    const result = await reqRecommend(num)
    commit(RECEIVE_RECOMMEND, {recommend: result})
  },
  async getDetailInfo ({ commit }, day) {
	const condition = {'updateDay':day} //按天查询
    const result = await reqDetailInfo(condition)
    commit(RECEIVE_DETAILINFO, {detailInfo: result, day})
  },
  async getSearch ({ commit }, text) {
    const result = await reqSearch(text)
    commit(RECEIVE_SEARCH, {search: result})
  },
  
  async getVideoUrl ({ commit }, vID) {
    const result = await reqVideoUrl(vID)
    commit(RECEIVE_VIDEOURL, {videoUrl: result[0].URL[0], vID})
  },
  async getAllDetailInfo ({ commit }) { // 获得所有每日更新的视频信息
    const result = await reqAllDetailInfo()
    commit(RECEIVE_ALLDETAILINFO, {allDetailInfo: result})
  },
  async getDanMu ({ commit }, {vID, playIndex}) { // 获得对应视频的弹幕内
    const result = await reqDanMu(vID, playIndex)
    commit(RECEIVE_DanMu, {danmuList: result})
	
  },
  async addDanMu ({ commit }, data) { // 添加对应视频的弹幕内
    const result = await addNewDoc('danMu',data)
  },
  claerSearch({commit}){
	  commit(DELETE_SEARCH)
  }
}
