<script>
import { mapGetters } from 'vuex'


	export default {
		name: 'MyProfile',
		data() {
			return {
				userData: {
					email: "",
					avatar: "",
					age: 0,
					username: "",
					fullname: "",
					comments: 0,
					posts: []
				},
				newUserData: {
					username: '',
					age: '',
					fullname: '',
					currentpass: "",
					newpass: "",
					confpass: ""
				}
			}
		},
		methods: {
			...mapGetters({
				getUserData: "getUserData"
			}),
			async changeInfo() {
				await this.$store.dispatch('updateUser', {
					uid: this.userData.uid,
					username: this.newUserData.username,
					age: this.newUserData.age,
					fullname: this.newUserData.fullname
				})
			},
			async changeAvatar() {
				let el = this.$refs.avatar
				let reader = new FileReader()
				reader.readAsDataURL(el.files[0])
				reader.onload = async () => {
					await this.$store.dispatch('changeAvatar', {
						uid: this.userData.uid,
						avatar: reader.result
					})
					this.userData = this.$store.state.userData
				}
			}
		},
		async mounted() {
			this.userData = this.$store.state.userData
			this.newUserData = {
				...this.newUserData,
				username: this.userData.username,
				age: this.userData.age,
				fullname: this.userData.fullname
			}
		},
		emits: [
			'logout'
		]
	}
</script>


<template>
	<section :is='id' v-if='userData.username' class='profile_page'>
		<h1>{{ userData.username.slice(0, 1).toUpperCase() + userData.username.slice(1) }}</h1>
		<div class='profile_settings'>
			<div class='avatar_settings'>
				<img :src="userData.avatar ? userData.avatar : '/public/avatar.png'" alt="" class='avatar'>
				<input @change='changeAvatar' type="file" ref='avatar' class='hidden'>
				<button @click='this.$refs.avatar.click()' class='change_avatar'>Change Avatar</button>
			</div>
			<form @submit.prevent='changeInfo' class='info_settings'>
				<div class='field'>
					<label for="username">Username</label>
					<input name='username' v-model='newUserData.username' type="text">
				</div>
				<div class='field'>
					<label for="fullname">Fullname</label>
					<input name='fullname' v-model='newUserData.fullname' type="text">
				</div>
				<div class='field'>
					<label for="age">Age</label>
					<input name='age' v-model.number='newUserData.age' type="number">
				</div>
				<button type='submit' class='change_info'>Change info</button>
			</form>
			<form class='user_settings'>
				<div class='field'>
					<label for="currentpass">Current password</label>
					<input name='currentpass' v-model='newUserData.currentpass' type="text">
				</div>
				<div class='field'>
					<label for="newpass">New password</label>
					<input name='newpass' v-model='newUserData.newpass' type="text">
				</div>
				<div class='field'>
					<label for="confpass">Confirm password</label>
					<input name='confpass' v-model.number='newUserData.confpass' type="text">
				</div>
				<button type='submit' class='change_password'>Change password</button>
			</form>
		</div>
		<button @click='$emit("logout")' class='logout'>Logout</button>
	</section>
	<section v-else>...Loading</section>
</template>


<style>
	
</style>