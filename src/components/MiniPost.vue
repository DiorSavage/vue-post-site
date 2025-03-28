<script>
import { RouterLink } from 'vue-router'

	export default {
		name: 'MiniPost',
		data() {
			return {
				
			}
		},
		props: {
			postData: {
				id: "",
				title: "",
				header: "",
				image: "",
				text: "",
				author: "",
				date: "",
				likes: [],
				dislikes: [],
				comments: []
			}
		},
		methods: {
			GoToPost(path) {
				this.$router.push(`/posts/${path}`)
			}
		}
	}
</script>


<template>
	<div class='mini_post' v-if='postData.id'>
		<h1>Name of the post: <span>{{ postData.title }}</span></h1>
		<img v-if='postData.image' :src="postData.image">
		<h2>{{ postData.header }}</h2>
		<div class='post_content'>
			<p>{{ postData.text }}</p>
			<div class='post_reactions'>
				<button><img src="/public/like_icon.png"> {{ postData.likes === 0 ? 0 : postData.likes.length }}</button>	
				<button><img src="/public/dislike_icon.png"> {{ postData.dislikes === 0 ? 0 : postData.dislikes.length }}</button>
				<button><img src="/public/comment_icon.png"> {{ postData.comments && postData.comments.length }}</button>
			</div>
			<span>{{ new Date(postData.date).getDate() + "-" + new Date(postData.date).getMonth() + "-" + new Date(postData.date).getFullYear() }}</span>
			<RouterLink :to='postData.author === this.$store.state.userData.username ? "/myprofile" : "/profile/" + postData.authoruid' class='author'>{{ postData.author }}</RouterLink>
		</div>
		<button @click='GoToPost(postData.id)' class='topost'>Read more</button>
	</div>
</template>


<style>
	
</style>