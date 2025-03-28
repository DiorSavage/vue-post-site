<script>
	export default {
		name: 'UserProfile',
		data() {
			return {
				userData: {}
			}
		},
		async mounted() {
			this.userData = await this.$store.dispatch("getUser", {
            uid: this.$route.params.id,
            myAcc: false
          })
			console.log(this.userData)
		}
	}
</script>


<template>
	<section :is='id' v-if='userData.username' class='profile_page'>
		<h1>{{ userData.username.slice(0, 1).toUpperCase() + userData.username.slice(1) }}</h1>
		<div class='profile_settings'>
			<div class='avatar_settings'>
				<img :src="userData.avatar" alt="" class='avatar'>
			</div>
			<div class='info_settings'>
				<div class='field'>
					<label for="username">Username</label>
					<input disabled name='username' :value='userData.username' type="text">
				</div>
				<div class='field'>
					<label for="fullname">Fullname</label>
					<input disabled name='fullname' :value='userData.fullname' type="text">
				</div>
				<div class='field'>
					<label for="age">Age</label>
					<input disabled name='age' :value='userData.age' type="text">
				</div>
			</div>
			<div class='user_settings'>
				<div class='field'>
					<label for="currentpass">Current password</label>
					<input disabled name='currentpass' type="text">
				</div>
				<div class='field'>
					<label for="newpass">New password</label>
					<input disabled name='newpass' type="text">
				</div>
				<div class='field'>
					<label for="confpass">Confirm password</label>
					<input disabled name='confpass' type="text">
				</div>
			</div>
		</div>
	</section>
	<section v-else>...Loading</section>
</template>


<style>
	
</style>