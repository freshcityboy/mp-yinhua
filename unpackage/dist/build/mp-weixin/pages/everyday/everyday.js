(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/everyday/everyday"],{2535:function(n,t,e){"use strict";(function(n){e("5993"),e("921b");r(e("66fd"));var t=r(e("ab0a"));function r(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},"725f":function(n,t,e){"use strict";var r=function(){var n=this,t=n.$createElement;n._self._c},o=[];e.d(t,"a",function(){return r}),e.d(t,"b",function(){return o})},"89a0":function(n,t,e){"use strict";e.r(t);var r=e("ff78"),o=e.n(r);for(var a in r)"default"!==a&&function(n){e.d(t,n,function(){return r[n]})}(a);t["default"]=o.a},ab0a:function(n,t,e){"use strict";e.r(t);var r=e("725f"),o=e("89a0");for(var a in o)"default"!==a&&function(n){e.d(t,n,function(){return o[n]})}(a);var i=e("2877"),u=Object(i["a"])(o["default"],r["a"],r["b"],!1,null,null,null);t["default"]=u.exports},ff78:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=e("2f62");function o(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{},r=Object.keys(e);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.forEach(function(t){a(n,t,e[t])})}return n}function a(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var i=function(){return e.e("components/everyday/everyday-list").then(e.bind(null,"b38a"))},u=function(){return e.e("components/everyday/head-tab").then(e.bind(null,"bc2a"))},c=function(){return e.e("components/common/loading").then(e.bind(null,"c31e"))},f={data:function(){return{loadingText:"上拉加载更多",currentIdx:0,tabBars:[{name:"一",id:"guanzhu"},{name:"二",id:"tuijian"},{name:"三",id:"tiyu"},{name:"四",id:"redian"},{name:"五",id:"caijing"},{name:"六",id:"yule"},{name:"日",id:"junshi"}]}},computed:o({},(0,r.mapState)(["detailInfo"]),{swiperHeight:function(){var t=0;return n.getSystemInfo({success:function(e){t=e.windowHeight-n.upx2px(100)}}),t}}),onLoad:function(){var n=this,t=this.detailInfo,e=this.currentIdx;if(t[0].forEach(function(t){n.$store.dispatch("getVideoUrl",t.vID)}),!t[e+1].length)for(var r=0;r<7;r++)this.$store.dispatch("getDetailInfo",r)},onPullDownRefresh:function(){console.log("refresh");for(var t=0;t<7;t++)this.$store.dispatch("getDetailInfo",t),console.log(t);n.stopPullDownRefresh()},methods:{ontabtap:function(n){this.currentIdx=n},handleSwiper:function(n){this.currentIdx=n.target.current},scrolltolower:function(){this.$refs.loadingTip[0].changeLoadingText()}},watch:{currentIdx:function(n){var t=this,e=this.detailInfo,r=this.currentIdx;e[r].forEach(function(n){t.$store.dispatch("getVideoUrl",n.vID)})}},components:{everydayList:i,headTab:u,loading:c}};t.default=f}).call(this,e("543d")["default"])}},[["2535","common/runtime","common/vendor"]]]);