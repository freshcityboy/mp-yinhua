<template>
	<view class="body">
		<bottom-input-bar @sentMsg="sentMsg"></bottom-input-bar>
		<scroll-view scroll-y="true" 
			:style="{height:viewHeight+'px'}" 
			:scroll-with-animation="true"
			:scroll-top="scrollTop"
			id="scrollview"
			>
			<block v-for="(msg,index) in msgs" :key="index">
				<chat-list :msg="msg" ref="msg"></chat-list>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	import chatList from "../../components/chat-list/chat-llist.vue"
	import bottomInputBar from "../../components/common/bottom-input-bar.vue"
	import time from "../../common/time.js"
	export default {
		data() {
			return {
				scrollTop:0,
				height:0,
				viewHeight:0,
				isMe:false,
				msgs:[]
				
			}
		},
		onNavigationBarButtonTap(e){
			if(e.index === 0){
				uni.navigateBack({
					delta:1
				})
			}
		},
		methods: {
			gateData(){
				let arr = [
					{
						userpic:'../../static/demo/userpic/14.jpg',
						text:"你好啊",
						isMe:false,
						time:1571753193000
					},
					{
						userpic:'../../static/demo/userpic/13.jpg',
						text:"你好，听说Rng又强了，真的是一年更比一年强啊",
						isMe:true,
						time:1571753473000
					},
					{
						userpic:'../../static/demo/userpic/14.jpg',
						text:"哈哈，一年下路强，战术强，技术强...，总结就是十六强",
						isMe:false,
						time:1571753485000
					},
					{
						userpic:'../../static/demo/userpic/13.jpg',
						text:"还是大校牛逼",
						isMe:true,
						time:1571753492
					},
					{
						userpic:'../../static/demo/userpic/14.jpg',
						text:"你好啊",
						isMe:false,
						time:1571753193000
					},
					{
						userpic:'../../static/demo/userpic/13.jpg',
						text:"你好，听说Rng又强了，真的是一年更比一年强啊",
						isMe:true,
						time:1571753473000
					},
					{
						userpic:'../../static/demo/userpic/14.jpg',
						text:"哈哈，一年下路强，战术强，技术强...，总结就是十六强",
						isMe:false,
						time:1571753485000
					},
					{
						userpic:'../../static/demo/userpic/13.jpg',
						text:"你好，听说Rng又强了，真的是一年更比一年强啊",
						isMe:true,
						time:1571753473000
					},
					{
						userpic:'../../static/demo/userpic/14.jpg',
						text:"哈哈，一年下路强，战术强，技术强...，总结就是十六强",
						isMe:false,
						time:1571753485000
					},
					
				]
				arr.forEach((item,index) => {
					item.gstime = time.getChatTime(item.time,index>0? arr[index-1].time:0)
				})
				this.msgs = arr
			},
			sentMsg(text){
				if(!text){ return}
				let now = Date.now()
				let gstime = time.getChatTime(now,this.msgs[this.msgs.length-1].time)
				let msg = {
					userpic:'../../static/demo/userpic/13.jpg',
					text,
					isMe:true,
					time:now,
					gstime
				}
				this.msgs.push(msg)
				//这里不用定时器就获取不到更新后的dom的高度
				setTimeout(()=>{
					this.pageToBottom()
				},1)
			},
			pageToBottom(isfirst = false) {
				//获取所有消息盒子的高度
				const query = uni.createSelectorQuery().in(this);
				let item = query.selectAll('.msg-box')
				this.$nextTick(()=>{
					item.fields({size:true},(data)=>{
						if(data){
							//第一次遍历所有节点的高度，非第一次只需遍历最后一次的高度
							if(isfirst){
								data.forEach((data)=>{
									this.height += data.height
								})		 
							}else{
								console.log(data);
								this.height += data[data.length-1].height
							}
							//单页面卷动值大于页面可视觉区域时，滚动页面
							this.scrollTop = this.height>this.viewHeight ? this.height:0
						}
						
					}).exec()
				})		
			},
			getViewH () {
				//得到页面可视化高度
				uni.getSystemInfo({
					success: (res) => {
						this.viewHeight = res.windowHeight - uni.upx2px(120)
					}
				})
			}
		},
		mounted() {
			this.gateData()
			this.getViewH()
			this.pageToBottom(true)
		},
		components:{
			chatList,
			bottomInputBar
		}
	}
</script>

<style lang="less" scoped>
	
	
</style>
