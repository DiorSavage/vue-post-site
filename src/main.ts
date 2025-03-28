import './assets/_main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Auth from './components/Auth.vue'
import Posts from './components/Posts.vue'
import store from './store/store.js'
import Post from './components/Post.vue'
import dotenv from 'dotenv'
import cors from 'cors'

const app = createApp(App)
// dotenv.config()

const routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/authorization',
		component: Auth
	},
	{
		path: '/posts',
		component: Posts
	},
	{
		path: '/posts/:id',
		component: Post,
	},
	{
		path: "/myprofile",
		name: "MyProfile",
		component: () => import('./components/MyProfile.vue')
	},
	{
		path: "/createpost",
		component: () => import('./components/CreatePost.vue')
	},
	{
		path: '/profile/:id',
		component: () => import('./components/UserProfile.vue')
	}
]
const router = createRouter({
	history: createWebHistory(),
	linkActiveClass: 'active',
	routes
})

app.use(router)
app.use(store)
// app.use(cors())

app.mount('#app')
