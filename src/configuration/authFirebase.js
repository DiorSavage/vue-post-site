import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCNQpWTJRXjWnZSAP1P05HiR08zjOGm60g",
  authDomain: "vue-posts-f5dc1.firebaseapp.com",
  databaseURL: "https://vue-posts-f5dc1-default-rtdb.firebaseio.com",
  projectId: "vue-posts-f5dc1",
  storageBucket: "vue-posts-f5dc1.firebasestorage.app",
  messagingSenderId: "80961623611",
  appId: "1:80961623611:web:898500ac18e10e4a30ee1e",
  measurementId: "G-06ZTXBXFNQ"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)