<template>
	<view>
		<view class="my-header">
			<view class="my-header__background" >
				<image :src="userinfo.avatar" mode="aspectFill"></image>
			</view>
			<view class="my-header__logo">
				<view class="my-header__logo-box">
					<image :src="userinfo.avatar" mode="aspectFill" @click="editAvatar"></image>
				</view>
				<text class="my-header__name">{{userinfo.author_name}}</text>
			</view>
			<view class="my-header__info">
				<view class="my-header__info-box">
					<text>被关注</text>
					<text>{{userinfo.follow_count}}</text>
				</view>
				<view class="my-header__info-box">
					<text>粉丝</text>
					<text>{{userinfo.fans_count}}</text>
				</view>
				<view class="my-header__info-box">
					<text>积分</text>
					<text>{{userinfo.integral_count || 0}}</text>
				</view>
			</view>
		</view>
		<view class="my-content">
			<view class="my-content__list" @click="open">
				<view class="my-content__list-title">
					<uni-icons class="icons" type="contact" size="16" color="#666"></uni-icons>
					<text>我的文章</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
			<view class="my-content__list" @click="feedback">
				<view class="my-content__list-title">
					<uni-icons class="icons" type="help" size="16" color="#666"></uni-icons>
					<text>意见反馈</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
		</view>
		<button class="feedback-button" type="primary" @click="exit">登 出</button>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				tempfilepaths:''
			}
		},
		computed:{
			...mapState(['userinfo'])
		},
		onLoad(){
			// console.log(this.userinfo)
		},
		methods: {
			exit(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			open(){
				uni.navigateTo({
					url:'/pages/my-article/my-article'
				})
			},
			feedback(){
				uni.navigateTo({
					url:'/pages/feedback/feedback'
				})
			},
			 editAvatar(){
				uni.chooseImage({
					count:1,
					success: async (res)=> {
						uni.showLoading()
						this.tempfilepaths = res.tempFilePaths[0]
						var filePath = this.tempfilepaths
						filePath = await this.uploadFiles(filePath)
						
						this.updateUseravatar({
							avatar:filePath
						})
					}
				})
			},
			async uploadFiles(filePath){
				const result = await uniCloud.uploadFile({
					filePath:filePath,
					cloudPath:'123.jpg'  //凑数的，随便定义的
				})
				return result.fileID
			},
			updateUseravatar({avatar}){
				this.userinfo.avatar = avatar
				this.$api.update_user_avatar({avatar}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:"修改成功",
						icon:'none'
					})
				}).catch(()=>{
					uni.hideLoading()
					uni.showToast({
						title:"修改失败",
						icon:"none"
					})
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f5f5f5;
}
.my-header{
	position: relative;
	padding-bottom: 15px;
	.my-header__background{
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
	.my-header__logo{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 30px;
		.my-header__logo-box{
			width: 60px;
			height: 60px;
			border-radius: 50%;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.my-header__name{
			margin-top: 15px;
			font-size: 16px;
			font-weight: bold;
		}
	}
	.my-header__info{
		margin-top: 15px;
		display: flex;
		.my-header__info-box{
			display: flex;
			flex-direction: column;
			justify-content: ceter;
			align-items: center;
			width: 100%;
			font-size: 12px;
			color: #999;
		}
	}
}
.my-content{
	.my-content__list{
		display: flex;
		justify-content: space-between;
		padding: 15px;
		margin-bottom: 10px;
		background-color: #FFF;
		color: #333;
		font-size: 14px;
		.my-content__list-title{
			display: flex;
			align-items: center;
			.icons{
				margin-right: 5px;
			}
		}
	}
}
.feedback-button{
	margin: 0 15px;
	border-radius: 25px;
	background-color: $mk-base-color;
}
</style>
