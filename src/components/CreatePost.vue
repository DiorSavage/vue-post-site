<script>
	import axios from 'axios'
	
	export default {
		name: 'CreatePost',
		data() {
			return {
				newPostData: {
					title: "",
					header: "",
					image: "",
					text: "",
					author: "",
					authoruid: "",
					date: "",
					likes: 0,
					dislikes: 0,
					comments: 0
				}
			}
		},
		methods: {
			uploadPicture() {
				const el = this.$refs.image
				const reader = new FileReader()
				reader.readAsDataURL(el.files[0]) // в base64 картинку
				reader.onload = () => { 
					this.newPostData.image = reader.result // подход фу, но бека нет(((
					// const { data } = axios.post("https://api.imageban.ru/v1", {
					// 	headers: {
					// 		'Authorization': `Bearer ${""}`
					// 	},
					// 	body: {
					// 		image: el.files[0]
					// 	}
					// })
				}
			},
			async sendPost() {
				const post = await this.$store.dispatch('createPost', {
					...this.newPostData,
					author: this.$store.getters.getUserData.username,
					authoruid: this.$store.getters.getUserData.uid,
					date: new Date().toISOString()
				})
				await this.$router.push(`/posts/${post.name}`)
			}
		}
	}
</script>

<!-- Linux Mint is an operating system for desktop and laptop computers. It is designed to work 'out of the box' and comes fully equipped with the apps most people need.
With LibreOffice's complete office suite, use the word processor, make presentations, drawings, spreadsheets or even databases. Easily import from or export to PDF or Microsoft Office documents.
Access more than 7,800 games with Steam. Install the Heroic Games Launcher or Lutris to get even more.
what the fuck -->


<template>
	<section class='createPost_page'>
		<div class='image_post'>
			<h1>Upload a picture</h1>
			<img v-if='newPostData.image !== ""' :src="newPostData.image" alt="">
			<input @change='uploadPicture' ref='image' class='hidden' type="file">
			<button @click='this.$refs.image.click' class='upload_picture'>Upload</button>
		</div>
		<form @submit.prevent='sendPost' class='createPost_content'>
			<h1>Title<input v-model='newPostData.title' type="text"></h1>
			<h2>Header<input v-model='newPostData.header' type="text"></h2>
			<div>
				<h3>Enter text</h3>
				<textarea v-model='newPostData.text' rows="10"></textarea>
			</div>
			<button type='submit' class='createPost_btn'>Create post</button>
		</form>
	</section>
</template>


<style>
	
</style>