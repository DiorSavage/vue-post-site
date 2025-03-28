<script>
	import { RouterLink } from 'vue-router'
	export default {
		name: 'Header',
		data() {
			return {
				
			}
		}
	}
</script>


<template>
	<header class='header'>
		<RouterLink to='/' class='header__logo'>
			<div class='bg-[url("/public/logo.png")] bg-cover bg-center size-12'></div>
		</RouterLink>
		<div class='header__links'>
			<slot name='links' />
		</div>
	</header>
</template>


<style>
	
</style>