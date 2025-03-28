<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'CommentBlock',
		data() {
			return {
				commentData: {
					author: '',
					text: '',
					date: '',
					id: '',
					replies: 0
				},
				replies: []
			}
		},
		methods: {
			...mapGetters({
				getComment: 'getComment'
			})
		},
		emits: [
			'opencomment'
		],
		props: {
			comment: String,
			index: Number,
			length: Number
		},
		async mounted() { // с точки зрения оптимизации, как мне кажется, лучше было в comments у postData прокидывать сразу данные коммента, а не просто айди, чтобы было меньше апи запросов, ведь так?
			await this.$store.dispatch('getComments', this.comment)
			this.commentData = this.getComment()
			this.replies = this.commentData.replies !== 0 ? await this.$store.dispatch('getReplies', {
				replies: this.commentData.replies
			}) : []
		}
	}
</script>


<template>
	<div class='comment_content'>
		<h1 class='author'>
			<span>{{ commentData.author }}</span>
		</h1>
		<p>{{ commentData.text }}</p>
		<span class='comment_date'>{{ new Date(commentData.date).getDate() + "-" + new Date(commentData.date).getMonth() + "-" + new Date(commentData.date).getFullYear() }}</span>
		<button @click='$emit("opencomment", { type: "Reply", commentId: commentData.id})' class='reply'>Reply</button>
		<div class='replies_block' v-if='this.replies.length !== 0'>
			<h2 class='text-lg font-semibold'>Replies</h2>
			<div class='reply_block' v-for='(reply) in replies' :key='reply.id'>
				<h1 class='author'>
					<span>{{ reply.author }} to {{ commentData.author }}</span>
				</h1>
				<p>{{ reply.text }}</p>
				<span class='comment_date'>{{ new Date(reply.date).getDate() + "-" + new Date(reply.date).getMonth() + "-" + new Date(reply.date).getFullYear() }}</span>
			</div>
		</div>
	</div>
	<!-- <div v-if='index !== length' class='w-[100%] opacity-70 mx-auto my-4 h-[1px] bg-gradient-to-r from-white via-blue-600 to-white'></div> -->
</template>


<style>
	
</style>