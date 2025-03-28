<script>
	import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '../configuration/authFirebase.js'
	export default {
		name: 'Auth',
		data() {
			return {
				hasAccount: true,
				formData: {
					email: "",
					password: "",
					confpass: "",
					username: ""
				}
			}
		},
		methods: {
			auth() {
				console.log(this.hasAccount)
				if (this.hasAccount === false) {
					if (this.formData.password === this.formData.confpass) {
						createUserWithEmailAndPassword(auth, this.formData.email, this.formData.password).then(({ user }) => {
							user.email && this.$store.dispatch('Register', {
								email: user.email,
								username: this.formData.username,
								uid: user.uid
							})
							this.formData = {
								email: "",
								password: "",
								confpass: "",
								username: "",
							}
							this.$router.push('/')
						}).catch((err) => {
							console.log(err)
						})
					}
				} else {
					signInWithEmailAndPassword(auth, this.formData.email, this.formData.password).then(({ user }) => {
						console.log(user)
						this.formData = {
							email: "",
							password: "",
							confpass: "",
							username: "",
						}
						this.$router.push('/')
					}).catch((err) => {
						console.log("Wrong password or email")
					})
				}
			}
		}
	}
</script>


<template>
	<section class='auth'>
		<h1>{{ hasAccount ? "Login page" : "Registration page" }}</h1>
		<form autocomplete='off' v-on:submit.prevent='auth'>
			<label v-if='!hasAccount' for="username">Username</label>
			<input v-if='!hasAccount' type="text" name='username' v-model='formData.username'>
			<label for="email">Email</label>
			<input type="text" name='email' v-model='formData.email'>
			<label for="password">Password</label>
			<input type="password" autocomplete='off' name="password" v-model='formData.password'>
			<label v-if='!hasAccount' for="confpass">Confirm password</label>
			<input v-if='!hasAccount' type="password" name='confpass' v-model='formData.confpass'>
			<button type='submit' class='submit_btn'>{{ hasAccount ? "Login" : "Register" }}</button>
			<button type='button' class='switch' :class='{ have: !hasAccount, donthave: hasAccount }' @click='hasAccount = !hasAccount'>{{ hasAccount ? "I dont have an account" : "I already have an account" }}</button>
		</form>
	</section>
</template>


<style>
	
</style>