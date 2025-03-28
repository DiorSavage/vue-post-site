<script>
	import { RouterLink } from 'vue-router'
import MiniPost from './MiniPost.vue'

	export default {
		name: 'Posts',
		data() {
			return {
				posts: [],
				loading: true,
				openCat: ""
			}
		},
		methods: {
			openCategory(type) {
				let category_list = document.getElementById(type)
				if (this.openCat !== "" && this.openCat !== type) {
					document.getElementById(this.openCat).style.display = 'none'
					category_list.style.display = 'flex'
				} else {
					category_list.style.display === 'none' || category_list.style.display == false ? category_list.style.display = 'flex' : category_list.style.display = 'none'
				}
				this.openCat = type
			}
		},
		async mounted() {
			await this.$store.dispatch('getPosts')
			let int = null
			this.posts = this.$store.getters.getPosts
			this.loading = false && this.posts.length !== 0
			// var flag = 10
			// if (this.posts.length !== 0) {
			// 	int = setInterval(() => {
			// 		let ghost = document.getElementById('ghost')
			// 		ghost.style.transform = `rotate(${flag}deg)`
			// 		flag += 5
			// 	}, 10)
			// } else {
			// 	clearInterval(int)
			// }
		},
		components: {
			MiniPost
		}
	}
</script>


<template>
	<section v-if='posts.length !== 0  && !loading' class='posts_page'>
		<div class='posts_list'>
			<div class='createPost_block'>
				<h1>Create new post</h1>
				<RouterLink :to='this.$store.state.userData.username !== "" ? "/createpost" : "/authorization"' class='createpost_btn'>Create</RouterLink>
			</div>
			<MiniPost v-for='post in posts' :postData='post' />
		</div>
		<div class='posts_categories'>
			<h1>Categories</h1>
			<div class='category_list'>
				<h2 @click='openCategory("users")' class='title'>Most active users<img src="/public/arrow_open.png" ref='user_arrow'></h2>
				<div class='items_list' id='users'>
					<div class='item'>archlover</div>
					<div class='item'>kalilover</div>
					<div class='item'>mintlover</div>
					<div class='item'>debianlover</div>
					<div class='item'>ubuntulover</div>
				</div>
				<h2 @click='openCategory("popularposts")' class='title'>Most popular posts<img src="/public/arrow_open.png" ref='post_arrow'></h2>
				<div class='items_list' id='popularposts'>
					<div class='item'>archlover</div>
					<div class='item'>kalilover</div>
					<div class='item'>mintlover</div>
					<div class='item'>debianlover</div>
					<div class='item'>ubuntulover</div>
				</div>
			</div>
		</div>
	</section>
	<section v-else-if='loading' class='loading'>Loading...</section>
	<section class='w-full h-[60vh] text-7xl font-bold text-gray-500 flex justify-center items-center flex-col gap-y-6' v-else>
		<img id='ghost' src="/public/noposts.png">
		No posts
	</section>
</template>


<style>
	
</style>