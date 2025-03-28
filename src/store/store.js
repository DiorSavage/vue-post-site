import { createStore } from 'vuex';
import axios from 'axios'

export default createStore({
	state() {
		return {
			userData: {
				email: "",
				avatar: "",
				age: 0,
				username: "",
				fullname: "",
				comments: 0,
				uid: "",
				posts: [] // string[]
			},
			postData: { // по факту даже не нужен
				title: "",
				header: "",
				image: "",
				text: "",
				author: "",
				authoruid: "",
				date: "",
				likes: [],
				dislikes: [],
				comments: []
			},
			posts: [], // по факту даже не нужен
			commentData: { // по факту даже не нужен
				id: "",
				author: "",
				text: "",
				date: ""
			}
		}
	},
	mutations: {
		createPost(state, payload) {
			state.postData = payload
		},
		updatePosts(state, payload) {
			state.posts = payload
		},
		createComment(state, payload) {
			state.commentData = payload
		},
		updateUserData(state, payload) {
			state.userData = payload
		}
	},
	actions: {
		async getUser(context, payload) {
			const { data } = await axios.get(`https://vue-posts-f5dc1-default-rtdb.firebaseio.com/users.json`)
			const users = await Object.keys(data).map(key => {
				return {
					...data[key]
				}
			})
			const user = users.find(user => user.uid === payload.uid)
			if (payload.myAcc) {
				context.commit('updateUserData', user)
			}
			return user
		},
		async Register(context, payload) {
			const { data } = await axios.post("https://vue-posts-f5dc1-default-rtdb.firebaseio.com/users.json", {
				email: payload.email,
				avatar: "",
				age: "",
				username: payload.username,
				fullname: "",
				comments: 0,
				posts: [],
				uid: payload.uid
			})
			await context.dispatch("getUser", {
				uid: payload.uid,
				myAcc: true
			})
		},
		async getReplies(context, payload) {
			const { data } = await axios.get(`https://vue-posts-f5dc1-default-rtdb.firebaseio.com/comments.json`)
			let replies = Object.keys(data).filter(elem => payload.replies.includes(elem))
			let replies_data = replies.map(key => {
				return data[key]
			})
			return replies_data
		},
		async sendReply(context, payload) {
			const { data } = await axios.post(`https://vue-posts-f5dc1-default-rtdb.firebaseio.com/comments.json`, {
				author: payload.author,
				date: new Date().toISOString(),
				text: payload.comment,
				replyto: payload.id,
				replies: 0
			})
			let newReplies = context.state.commentData.replies === 0 ? [] : context.state.commentData.replies
			newReplies.push(data.name)
			await axios.put(`https://vue-posts-f5dc1-default-rtdb.firebaseio.com/comments/${payload.id}.json`, {
				...context.state.commentData,
				replies: newReplies
			})
		},
		async updateComments(context, { newComment, authoruid }) {
			const { data } = await axios.post(`https://vue-posts-f5dc1-default-rtdb.firebaseio.com/comments.json`, { 
				author: newComment.author,
				date: new Date().toISOString(),
				text: newComment.comment,
				replies: 0
			})
			let newComments = context.state.postData.comments === 0 ? [] : context.state.postData.comments
			newComments.push(data.name)
			await axios.put(`https://vue-posts-f5dc1-default-rtdb.firebaseio.com/posts/${newComment.id}.json`, {
				...context.state.postData,
				comments: newComments,
			})
			const { data: users } = await axios.get(`https://vue-posts-f5dc1-default-rtdb.firebaseio.com/users.json`)
			const userId = Object.keys(users).filter(key => users[key].uid === authoruid)[0]
			await axios.put(`https://vue-posts-f5dc1-default-rtdb.firebaseio.com/users/${userId}.json`, {
				...context.state.userData,
				comments: context.state.userData.comments + 1
			})
			context.commit('createPost', {
				...context.state.postData,
				comment: newComments
			})
		},
		async getComments(context, payload) {
			const { data } = await axios.get(`https://vue-posts-f5dc1-default-rtdb.firebaseio.com/comments/${payload}.json`)
			context.commit('createComment', {
				id: payload,
				...data
			})
			console.log(data)
		},
		async sendReaction(context, payload) {
			var newLikes = payload.likes === 0 ? [] : payload.likes
			var newDislikes = payload.dislikes === 0 ? [] : payload.dislikes

			if (payload.type === "likes") { //! КАКОЕ ГАВНО, ОПТИМИЗИРОВАТЬ ЭТОТ УЖАС
				newDislikes.length && newDislikes.includes(context.state.userData.uid) ? newDislikes.splice(newDislikes.indexOf(context.state.userData.uid), 1) : newDislikes

				newLikes.indexOf(context.state.userData.uid) === -1 ? newLikes.push(context.state.userData.uid) : newLikes.splice(newLikes.indexOf(context.state.userData.uid), 1)
			} else {
				newLikes.length && newLikes.includes(context.state.userData.uid) ? newLikes.splice(newLikes.indexOf(context.state.userData.uid), 1) : newLikes

				newDislikes.indexOf(context.state.userData.uid) === -1 ? newDislikes.push(context.state.userData.uid) : newDislikes.splice(newDislikes.indexOf(context.state.userData.uid), 1)
			}
			newLikes = newLikes.length === 0 ? 0 : newLikes
			newDislikes = newDislikes.length === 0 ? 0 : newDislikes
			const { data } = await axios.put(`https://vue-posts-f5dc1-default-rtdb.firebaseio.com/posts/${payload.id}.json`, {
				...context.state.postData,
				likes: newLikes,
				dislikes: newDislikes
			})
			await context.commit('createPost', data)
		},
		async createPost(context, payload) {
			const { data } = await axios.post('https://vue-posts-f5dc1-default-rtdb.firebaseio.com/posts.json', payload)
			const { data: users } = await axios.get(`https://vue-posts-f5dc1-default-rtdb.firebaseio.com/users.json`)
			const userId = Object.keys(users).filter(key => users[key].uid === payload.authoruid)[0] //! А МОЖНО БЫЛО КВЕРИ ПАРАМЕТРЫ, КАК Я ПОНИМАЮ
			let newPosts = context.state.userData.posts === 0 ? [] : context.state.userData.posts
			newPosts.push(data.name)
			await axios.put(`https://vue-posts-f5dc1-default-rtdb.firebaseio.com/users/${userId}.json`, {
				...context.state.userData,
				posts: newPosts
			})
			return data
		},
		async getPost(context, payload) {
			const { data } = await axios.get(`https://vue-posts-f5dc1-default-rtdb.firebaseio.com/posts/${payload}.json`)
			await context.commit('createPost', {
				id: payload,
				...data
			})
		},
		async getPosts(context) {
			const { data } = await axios.get('https://vue-posts-f5dc1-default-rtdb.firebaseio.com/posts.json')
			await context.commit('updatePosts', Object.keys(data).map(key => {
				return {
					id: key,
					...data[key]
				}
			}))
		},
		async updateUser(context, payload) {
			const { data: user } = await axios.get(`https://vue-posts-f5dc1-default-rtdb.firebaseio.com/users.json`)
			const userId = Object.keys(user).filter(key => user[key].uid === payload.uid)[0]
			const { data } = await axios.put(`https://vue-posts-f5dc1-default-rtdb.firebaseio.com/users/${userId}.json`, {
				...context.state.userData,
				username: payload.username,
				fullname: payload.fullname,
				age: String(payload.age),
			})
			await context.commit('updateUserData', data)
		},
		async changeAvatar(context, payload) {
			const { data: user } = await axios.get(`https://vue-posts-f5dc1-default-rtdb.firebaseio.com/users.json`)
			const userId = Object.keys(user).filter(key => user[key].uid === payload.uid)[0]
			const { data } = await axios.put(`https://vue-posts-f5dc1-default-rtdb.firebaseio.com/users/${userId}.json`, {
				...context.state.userData,
				avatar: payload.avatar
			})
			await context.commit('updateUserData', data)
		}
	},
	getters: {
		getPost(state) {
			return state.postData
		},
		getPosts(state) {
			return state.posts
		},
		getComment(state) {
			return state.commentData
		},
		getUserData(state) {
			return state.userData
		}
	}
})

// -OAxZyUdzbRag8QDmwFR

// {
// 	id: "1",
// 	title: "i use arch btw",
// 	header: "Arch the best OS",
// 	image: "/public/post1.png",
// 	text: "I'm a Linux lubbleb arch. It is literally the best operating system in the world, which is a good example of free software, ready to compete with any proprietary software",
// 	author: "archlover",
// 	date: "2024-11-05T17:19:22.324Z",
// 	likes: 6,
// 	dislikes: 1,
// 	comments: []
// }

// https://vue-posts-f5dc1-default-rtdb.firebaseio.com/
// new Date().toISOString()