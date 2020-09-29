<script>
	import store from '@/store/index.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//登录获取用户id
			if(!store.state.userinfo._id){
				uni.redirectTo({
					url:'/pages/login/login'
				})
				return
			}
			this.$api.get_user({
				user_id:store.state.userinfo._id
			}).then((res)=>{
				const{
					data
				} = res
				this.$store.dispatch('set_userinfo',data)
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import 'components/gaoyia-parse/parse.css';
</style>
