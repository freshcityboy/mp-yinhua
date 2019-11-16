<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<view class="login-bg">
			<image src="../../static/demo/login.png" mode="widthFix"></image>
			<view class="icon iconfont icon-guanbi"></view>
		</view>
		<view class="login-input">
			<view class="u-f-ac">
				<view v-if="byPhone" class="num icon iconfont icon-zengjia">86</view>
				<input v-if="byPhone" type="text" v-model="phone" placeholder="输入手机号" />
				<input v-else type="text" v-model="account" placeholder="昵称/手机号/邮箱" />
			</view>

			<view class="u-f-ac">
				<template v-if="byPhone">
					<input type="text" v-model="code" placeholder="输入验证码" />
					<view class="code u-f-ajc" @tap="sentMsg" :class="{ active: checkCode }">{{ !timing ? '获取验证码' : '已发送' + timing + 's' }}</view>
				</template>
				<template v-else>
					<input type="text" v-model="password" placeholder="请输入密码" password />
					<view class="password u-f-ajc">忘记密码?</view>
				</template>
			</view>
		</view>
		<bottomButtonBar :text="'登录'" :isDisabled="isDisabled" @tapEvent="submit"></bottomButtonBar>
		<view class="login-ways">
			<view class="icon iconfont icon-jinru u-f-ajc" @tap="toggle">{{ byPhone ? '账号密码登录' : '验证码登录' }}</view>
			<view class="other-ways">
				<view class="u-f-ajc">第三方登录</view>
				<button type="primary" @getuserinfo="getuserinfo" open-type="getUserInfo" @tap="loginwx">微信登陆</button>
				<!-- <view class="u-f-jse">
					<block v-for="(item,index) in providerList" :key="index">
						<view class="u-f-ajc icon iconfont" :class="item.icon" @tap="tologin(item)">{{item.value}}</view>
					</block>
				</view> -->
			</view>
			<view class="protocol">
				注册即代表您同意
				<text>《仿糗事百科用户协议》</text>
			</view>
		</view>
	</view>
</template>

<script>
import uniStatusBar from '../../components/uni-status-bar/uni-status-bar.vue';
import bottomButtonBar from '../../components/common/bottom-button-bar.vue';
export default {
	data() {
		return {
			phone: '',
			code: '',
			account: '',
			password: '',
			byPhone: true,
			timing: 0,
			providerList: [],
			userinfo: {}
		};
	},
	methods: {
		getuserinfo(e){
			this.userinfo= e.detail.userInfo
		},
		loginwx() {
			
			// #ifdef MP-WEIXIN
			wx.cloud.callFunction({
				// 云函数名称
				name: 'login',
				// 传给云函数的参数
				success: (res) => {
					// 将用户信息和 微信id 对象合并成一个对象
					this.userinfo = Object.assign(this.userinfo, res.result.event.userInfo)
					uni.setStorage({
					    key: 'user-info',
					    data: this.userinfo,
					    success: function () {
							uni.switchTab({
								url:'../home/home'
							})
					    }
					});
					
					
				},
				fail: console.error
			});
			// #endif
		},
		sentMsg() {
			//发送短信
			if (this.timing !== 0 || !this.checkCode) {
				return;
			}
			this.timing = 5;
			let timer = setInterval(() => {
				this.timing--;
				if (this.timing === 0) {
					this.timing = 0;
					clearInterval(timer);
				}
			}, 1000);
		},
		toggle() {
			this.byPhone = !this.byPhone;
		},
		check() {
			//验证手机号是否合法
			var mPattern = /^1[34578]\d{9}$/;
			if (!mPattern.test(this.phone)) {
				uni.showToast({
					title: '请填写正确的手机号',
					icon: 'none'
				});
			}
			return true;
		},
		submit() {
			//提交修改密码
			if (this.check()) {
				uni.showLoading({
					title: '登录中...'
				});
				//模拟
				setTimeout(() => {
					uni.hideLoading();
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					});
				}, 2000);
			}
		},
		tologin(provider) {
			uni.login({
				provider: provider.id,
				// #ifdef MP-ALIPAY
				scopes: 'auth_user', //支付宝小程序需设置授权类型
				// #endif
				success: res => {
					console.log('login success:', res);
					// 更新保存在 store 中的登录状态
					// this.login(provider.id);
				},
				fail: err => {
					console.log('login fail:', err);
				}
			});
		}
	},
	computed: {
		isDisabled() {
			// 按钮是否disabled的判断
			let { byPhone, phone, password, code, account } = this;
			return (!byPhone || !phone.length || !code.length) && (byPhone || !account.length || !password.length);
		},
		checkCode() {
			// 检查验证码是否为6位
			let reg = /^\d{6}$/;
			return reg.test(this.code);
		}
	},
	mounted() {
		uni.getProvider({
			service: 'share',
			success: result => {
				console.log(result);
				this.providerList = result.provider.map(value => {
					console.log(value);
					let providerName = '';
					let icon;
					switch (value) {
						case 'weixin':
							providerName = '微信登录';
							icon = 'icon-weixin';
							break;
						case 'qq':
							providerName = 'QQ登录';
							icon = 'icon-QQ';
							break;
						case 'sinaweibo':
							providerName = '新浪微博登录';
							icon = 'icon-xinlangweibo';
							break;
					}

					return {
						name: providerName,
						id: value,
						icon
					};
				});
			},
			fail: error => {
				console.log('获取登录通道失败', error);
			}
		});
		// uni.getStorage({
		//     key: 'userinfo',
		//     success: function (res) {
		// 		console.log(this.userinfo);
		//     }
		// });
	},
	components: {
		uniStatusBar,
		bottomButtonBar
	}
};
</script>

<style lang="less" scoped>
.login-bg {
	position: relative;
	image {
		width: 100%;
	}
	.icon-guanbi {
		position: absolute;
		left: 20upx;
		top: 20upx;
	}
}
.login-input {
	margin: 40upx 40upx;
	> view {
		border-bottom: 1px solid #eeeeee;
		.num {
			font-weight: bold;
			font-size: 30upx;
			margin-right: 20upx;
		}
		input {
			width: 100%;
			height: 100upx;
		}
		.code {
			width: 180upx;
			background: #eeeeee;
			border-radius: 16upx;
			white-space: nowrap;
			padding: 10upx;
			color: #949494;
			&.active {
				background: #fee832;
				color: #000000;
			}
		}
		.password {
			white-space: nowrap;
			color: #949494;
		}
	}
}
.login-ways {
	.icon-jinru {
		text-align: center;
		flex-direction: row-reverse;
		color: #222222;
	}
	.other-ways {
		margin: 40upx;
		> view:nth-child(1) {
			position: relative;
			color: #bebebe;
			&::before {
				content: '';
				width: 20%;
				position: absolute;
				left: 15%;
				top: 50%;
				border-bottom: 1upx solid #bebebe;
			}
			&::after {
				content: '';
				width: 20%;
				position: absolute;
				right: 15%;
				top: 50%;
				border-bottom: 1upx solid #bebebe;
			}
		}
		> view:nth-child(2) > view {
			font-size: 60upx;
			color: #ffffff;
			width: 150upx;
			height: 150upx;
			border-radius: 100%;
		}
		.icon-weixin {
			background: #2ad09a;
		}
		.icon-QQ {
			background: #2badfb;
		}
		.icon-xinlangweibo {
			background: #fb7628;
		}
		> view:last-child {
			margin: 20upx 0;
			.icon-jinru {
				color: #bebebe;
			}
		}
	}
}

.protocol {
	text-align: center;
	color: #bebebe;
	text {
		color: #47b8fc;
	}
}
</style>
