(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/video/video"],{"084f":function(t,e,i){"use strict";var n=i("d901"),s=i.n(n);s.a},"38f0":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;o(i("a7d0"));var n,s=i("2f62");function o(t){return t&&t.__esModule?t:{default:t}}function a(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{},n=Object.keys(i);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(i).filter(function(t){return Object.getOwnPropertyDescriptor(i,t).enumerable}))),n.forEach(function(e){r(t,e,i[e])})}return t}function r(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var u={props:{item:Object,trimVideoUrl:Array},data:function(){return{isLike:!1,playIndex:null,showList:!1,order:!0,timeNum:0,danmuValue:"",showVideo:!0,src:"",danmuTime:0,isCharging:wx.getBatteryInfoSync().isCharging,showView:!1,isFullscreenchange:!1,isInputing:!1,time:0,isPlaying:!0,timer:""}},computed:a({},(0,s.mapState)(["danmuList"]),{initTime:function(){return this.item.currentTime},total:function(){return this.trimVideoUrl.length?this.trimVideoUrl.length:Number(this.item.recentUpdate)},week:function(){var t=["日","一","二","三","四","五","六"];return t[this.item.updateDay]},battery:function(){return"".concat(wx.getBatteryInfoSync().level,"%")},localTime:function(){var t=new Date(this.time),e=t.getHours(),i=t.getMinutes();return i<10&&(i="0".concat(i)),"".concat(e,":").concat(i)}}),onReady:function(e){var i=this;console.log(this.item),this.time=Date.now(),n=setInterval(function(){i.time=Date.now()},6e4);var s=getApp().globalData.userInfo.like;s.find(function(t){return t.vID==i.item.vID})?this.isLike=!0:this.isLike=!1,this.videoContext=t.createVideoContext("myVideo",this),setTimeout(function(){i.showVideo=!0},500),this.item.currentTime&&this.seek(),console.log(this.item.currentTime)},onHide:function(){clearInterval(n)},methods:{seek:function(){this.playIndex=this.item.playIndex,this.src=this.trimVideoUrl[this.playIndex]},inputTap:function(){this.isInputing=!this.isInputing,this.isPlaying=!1,this.videoContext.pause()},onclick:function(){console.log(123)},back:function(){this.videoContext.exitFullScreen()},isValidTap:function(e){var i,n=e.detail.y;if(t.getSystemInfo({success:function(t){i=t.screenHeight}}),this.isFullscreenchange){var s=n>.1*i&&n<.9*i;if(!s)return!1}},toggleShowView:function(e){var i,n=this,s=e.detail.y;if(t.getSystemInfo({success:function(t){i=t.screenHeight}}),this.isFullscreenchange){var o=s>.15*i&&s<.9*i;if(!o)return!1}this.showView=!this.showView;var a=Date.now();a-this.time<300&&(console.log(123),this.isPlaying=!this.isPlaying,this.isPlaying&&this.videoContext.pause(),!this.isPlaying&&this.videoContext.play()),this.time=a,console.log(this.isPlaying),this.showView&&!this.isInputing&&(clearTimeout(this.timer),this.timer=setTimeout(function(){n.showView=!1},3e3))},like:function(t){this.isLike=!this.isLike;var e=getApp().globalData.userInfo.like,i=e.findIndex(function(e){return e.vID===t});if(-1===i){var n=Object.assign(this.item,{playIndex:this.playIndex});console.log(n),e.push(n)}else e.splice(i,1)},toggleShowList:function(){this.showList=!this.showList},Order:function(){this.trimVideoUrl=this.trimVideoUrl.reverse(),this.order=!this.order},play:function(t){this.src=this.trimVideoUrl[t],console.log(t,this.trimVideoUrl),this.playIndex=t;var e={vID:this.item.vID,playIndex:t};this.$store.dispatch("getDanMu",e)},sendDanmu:function(){this.isPlaying=!0,this.videoContext.play(),this.isInputing=!this.isInputing;var e=this.danmuValue,i=this.playIndex,n=this.danmuTime;if(""!==e){var s=this.item.vID,o=getApp().globalData.userInfo.openId,a={openId:o,vID:s,time:n,playIndex:i,text:e,color:"#FFFFFF"};console.log(n),this.videoContext.sendDanmu({text:e,color:"#4d9df5"}),this.danmuValue="",this.$store.dispatch("addDanMu",a)}else t.showToast({title:"弹幕空空如也哦~~"})},videoErrorCallback:function(e){t.showModal({content:"抱歉！视频资源地址失效",showCancel:!1})},timeupdate:function(t){var e=t.detail,i=e.currentTime;e.duration;this.danmuTime=parseInt(i);var n=getApp().globalData.playInfo,s=Date.now(),o=Object.assign(this.item,t.detail,{playIndex:this.playIndex},{timeStamp:s});(10*i<=2||i>this.timeNum)&&(!this.isPlaying&&(this.isPlaying=!0),this.timeNum=i+5,0!==n.length&&n[0].vID===this.item.vID&&n.shift(),n.unshift(o))}}};e.default=u}).call(this,i("543d")["default"])},8594:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.isFullscreenchange=!t.isFullscreenchange})},s=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return s})},"8c63":function(t,e,i){"use strict";i.r(e);var n=i("8594"),s=i("ce14");for(var o in s)"default"!==o&&function(t){i.d(e,t,function(){return s[t]})}(o);i("084f");var a=i("2877"),r=Object(a["a"])(s["default"],n["a"],n["b"],!1,null,"55f9a6ba",null);e["default"]=r.exports},ce14:function(t,e,i){"use strict";i.r(e);var n=i("38f0"),s=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=s.a},d901:function(t,e,i){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/video/video-create-component',
    {
        'components/video/video-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("8c63"))
        })
    },
    [['components/video/video-create-component']]
]);                
