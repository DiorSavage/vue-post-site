<script>
	export default {
		name: '',
		data() {
			return {
				openWindow: false,
			}
		},
		props: {
			modelValue: String,
			author: String,
			header: String
		},
		emits: ['sendComment', "openwindow", "update:modelValue"],
	}
</script>


<template>
	<form @submit.prevent='$emit("sendComment", header)' class='comment_window'>
		<button type='button' @click='$emit("openwindow", { type: "Comment", commentId: "" })' class='transition-all duration-300 rounded-full px-4 py-2 hover:text-white hover:bg-blue-500 ml-auto mr-2'>X</button>
		<h1>{{ header }}</h1>
		<p>{{ header }} by: <span>{{ this.$store.userData && this.$store.userData.username }}</span></p>
		<div>
			<label for="author">
				{{ header }}
			</label>
			<textarea @input='$emit("update:modelValue", $event.target.value)' name="content" id="content"></textarea>
		</div>
		<button type='submit' class='comment_send'>Send {{ header }}</button>
	</form>
</template>


<style>
	
</style>