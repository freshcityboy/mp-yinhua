import Vue from 'vue'
import App from './App'
import store from './store/'
import api from "./api/index.js"

Vue.config.productionTip = false

App.mpType = 'app'
// #ifdef MP-WEIXIN

// #endif
Vue.prototype.$api = api 
Vue.prototype.fomatTime = function (value) { // 00:00 格式化时间
	let m = parseInt(value / 60)
	let s = parseInt(value - m*60)
	if(m < 10){
		if(s < 10){
			return `0${m}:0${s}`
		}else{
			return `0${m}:${s}`
		}
	}else{
		if(s < 10){
			return `${m}:0${s}`
		}else{
			return `${m}:${s}`
		}
	}
}

const app = new Vue({
    ...App,
	store
})
app.$mount()


