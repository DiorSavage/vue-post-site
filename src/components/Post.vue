<script>
import { RouterLink } from 'vue-router'
import { mapGetters } from 'vuex'
import CommentBlock from './CommentBlock.vue'
import CommentWind from './CommentWind.vue'

	export default {
		name: 'Post',
		// props: {
		// 	postData: {
		// 		type: Object,
		// 		required: true
		// 	}
		// },
		data() {
			return {
				id: this.$route.params.id,
				header: "Comment",
				commentId: "",
				postData: {
					id: "",
					title: "",
					header: "",
					image: "",
					text: "",
					author: "",
					date: "",
					likes: 0,
					dislikes: 0,
					comments: []
				},
				textComment: "",
			}
		},
		components: {
			CommentBlock,
			CommentWind
		},
		methods: {
			...mapGetters({
				getPost: 'getPost',
				getUserData: 'getUserData'
			}),
			async sendComment(type) {
				this.leaveComment({ type: type, commentId: this.commentId })
				if (type === 'Comment') {
					await this.$store.dispatch("updateComments", {
						newComment: {
							id: this.postData.id,
							comment: this.textComment,
							author: this.getUserData().username
						},
						authoruid: this.getUserData().uid
					})
				} else {
					this.commentId !== "" && await this.$store.dispatch("sendReply", {
						id: this.commentId,
						comment: this.textComment,
						author: this.getUserData().username
					})
				}
				this.textComment = ""
				this.postData = this.getPost()
			},
			leaveComment({ type, commentId }) {
				if (this.$store.state.userData.username !== "") {
					this.header = type
					this.commentId = commentId
					let comment = document.getElementsByClassName('comment_window')[0]
					let bg = document.getElementById('black_bg')
					if (!this.openWindow) {
						comment.style.display = 'flex'
						bg.style.display = 'block'
					} else {
						comment.style.display = 'none'
						bg.style.display = 'none'
					}
					this.openWindow = !this.openWindow
				} else {
					this.$router.push('/authorization')
				}
			},
			async sendReaction(type) {
				if (this.$store.state.userData.username !== "") {
					await this.$store.dispatch("sendReaction", {
						id: this.postData.id,
						type,
						likes: this.postData.likes,
						dislikes: this.postData.dislikes
					})
					this.postData = this.getPost()
				} else {
					this.$router.push('/authorization')
				}
			}
		},
		async mounted() {
			await this.$store.dispatch('getPost', this.$route.params.id)
			this.postData = this.getPost()
		}
	}
</script>


<template>
	<section v-if="postData.id" class='post_page'>
		<CommentWind :header='header' :author='postData.author' @openwindow='leaveComment' v-model='textComment' @sendComment='sendComment' />
		<div class='post'>
			<h1><span>{{ postData.title }}</span> post</h1>
			<img v-if='postData.image' :src="postData.image">
			<h2>{{ postData.header }}</h2>
			<div class='post_content'>
				<p>{{ postData.text }}</p>
				<div class='post_author'>
					<span>Author: <RouterLink :to='"/profile/" + postData.authoruid' class='user_link'>{{ postData.author }}</RouterLink></span>
					<p>Date: {{ new Date(postData.date).getDate() + "-" + new Date(postData.date).getMonth() + "-" + new Date(postData.date).getFullYear() }}</p>
				</div>
				<div class='post_reactions'>
					<button @click='sendReaction("likes")'><img src="/public/like_icon.png"> {{ postData.likes === 0 ? postData.likes : postData.likes.length }}</button>	
					<button @click='sendReaction("dislikes")'><img src="/public/dislike_icon.png"> {{ postData.dislikes === 0 ? postData.dislikes : postData.dislikes.length }}</button>
				</div>
				<button class='comment' @click='() => leaveComment({ type: "Comment", commentId: "" })'>Comment</button>
			</div>
		</div>
		<div v-if='postData.comments !== 0' class='post_comments'>
			<h1>Comments</h1>
			<div class='w-full h-[1px] bg-gradient-to-r from-white via-blue-600 to-white'></div>
			<CommentBlock @opencomment='leaveComment' v-for='(comment, index) in postData.comments' :comment='comment' :index='index' :length='postData.comments.length - 1' />
		</div>
	</section>
	<section v-else class='loading'>Loading...</section>
</template>


<style>
	.loading {
		@apply text-2xl font-bold tracking-widest text-gray-500;
	}
</style>