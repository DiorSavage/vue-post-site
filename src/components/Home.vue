<script>
import { mapGetters } from 'vuex'
import MiniPost from './MiniPost.vue'

	export default {
		name: 'Home',
		data() {
			return {
				lastPost: {}
			}
		},
		components: {
			MiniPost
		},
		methods: {
			...mapGetters({
				getPosts: 'getPosts'
			})
		},
		async mounted() {
			await this.$store.dispatch('getPosts')
			let posts = this.getPosts()
			this.lastPost = posts[posts.length - 1]
		},
	}
</script>


<template>
	<section class='home_page' v-if='lastPost.id'>
		<h1><img src="/public/home.webp">ARPost<img src="/public/home.webp"></h1>
		<p>Welcome to the site to create interesting posts, here you can discuss a topic with other users</p>
		<div class='last_post'>
			<h2>Last Post</h2>
			<MiniPost :postData='lastPost' />
		</div>
	</section>
	<section v-else>...Loading</section>
</template>


<style>
	
</style>