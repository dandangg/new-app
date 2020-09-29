<template>
	<view>
		<view class="login-box">
			<view class="login__background" >
				<image src="../../static/logo.png" mode="aspectFill"></image>
			</view>
			<view class="login-avatar">
				<view class="login-avatar-box">
					<image src="../../static/logo.png" mode=""></image>
				</view>
			</view>
			<view class="login-content">
				<view class="login-content_list">
					<text>用户名:</text>
					<view class="login-content_list-input">
						<input v-model="username" class="login-content_list-input-content" type="text" value="" placeholder="请输入用户名" />
					</view>
				</view>
				<view class="login-content_list">
					<text>密码:</text>
					<view class="login-content_list-input">
						<input v-model="password" class="login-content_list-input-content" type="text" value="" placeholder="请输入密码" />
					</view>
				</view>
			</view>
			<button class="feedback-button" type="primary" @click="submit">登 录</button>
		</view>
		
	</view>
</template>

<script>
	import {mapActions} from 'vuex'
	export default {
		data() {
			return {
				username:'',
				password:''
			}
		},
		computed:{
			
		},
		methods: {
			...mapActions(['set_userinfo']),
			checkSub(){
				if(!this.username){
					uni.showToast({
						title:"用户名不能为空！",
						icon:'none'
					})
					return
				}
				if(!this.password){
					uni.showToast({
						title:"密码不能为空！",
						icon:'none'
					})
					return
				}
			},
			submit(){
				this.checkSub();
				const obj = {
					username:this.username,
					password:this.password
				}
				if(obj){
					this.$api.login_user(obj).then(res=>{
						console.log(res)
						const {data} = res
						this.set_userinfo(data)
						uni.showToast({
							title:"登录成功",
							icon:'none'
						})
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/tabbar/my/my'
							})
						},1000)
					}).catch(()=>{
						uni.showToast({
							title:'登录失败',
							icon:'none'
						})
					})
				}
				return
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
		height: 100%;
	}
	
.login-box{
	height: 100%;
	.login__background{
		position: absolute;
		top:0;
		right: 0;
		left: 0;
		bottom: 0;
		filter: blur(8px);
		opacity: 0.3;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.login-avatar{
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 50px;
		.login-avatar-box{
			width: 80px;
			height: 80px;
			border-radius: 50%;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.login-content{
		display: block;
		padding: 0 15px;
		margin-top: 80px;
		z-index: 10;
		.login-content_list{
			display: flex;
			justify-content: space-between;
			align-items: center;
			// background-color: #fff;
			border: 1px #f1f1f1 solid;
			border-radius: 25px;
			filter: blur(0);
			padding: 8px 15px;
			margin-bottom: 30px;
			width: 100%;
			box-sizing: border-box;
			text{
				flex: 1;
				align-items: center;
				font-size: 14px;
			}
			.login-content_list-input{
				display: flex;
				flex: 4;
				align-items: center;
				width: 100%;
				height: 30px;
				.login-content_list-input-content{
					width: 100%;
					font-size: 14px;
					color: #333;
				}
			}
		}
	}
}
.feedback-button{
	margin: 0 15px;
	margin-top: 50px;
	border-radius: 25px;
	background-color: $mk-base-color;
}
</style>
