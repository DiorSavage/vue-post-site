<script>
  import { RouterLink, RouterView } from 'vue-router'
  import Header from './components/Header.vue'
  import { onAuthStateChanged, signOut } from 'firebase/auth';
  import { auth } from './configuration/authFirebase.js'
  import { mapGetters } from 'vuex'
  export default {
    name: 'App',
    data() {
      return {
        isAuth: false,
        isLoading: true,
        userData: {},
        currentId: ""
      }
    },
    methods: {
      ...mapGetters({
        getUserData: 'getUserData'
      }),
      signOutacc() {
        signOut(auth).then(() => {
          this.isAuth = false
        }).then(() => {
          this.$router.push('/')
        })
      }
    },
    components: {
      Header
    },
    mounted() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.isAuth = true
          await this.$store.dispatch("getUser", {
            uid: user.uid,
            myAcc: true
          })
          this.userData = this.getUserData()
          this.isLoading = false
        } else {
          this.isLoading = false
        }
      })
    }
  }
</script>


<template>
  <Header>
    <template #links>
      <RouterLink class='transition-all duration-300 hover:scale-[1.1] select-none' to='/'>Home</RouterLink>
      <RouterLink class='transition-all duration-300 hover:scale-[1.1] select-none' to='/posts'>Posts</RouterLink>
      <RouterLink v-if='!isAuth' class='transition-all duration-300 hover:scale-[1.1] select-none' to='/authorization'>Auth</RouterLink>
      <RouterLink :key='currentId' @click='currentId = userData.uid' v-else class='transition-all duration-300 hover:scale-[1.1] select-none' to="/myprofile">
        <img class='size-7 rounded-full' :src="userData.avatar ? userData.avatar : '/public/avatar.png'">
      </RouterLink>
    </template>
  </Header>
  <div id='black_bg'></div>
  <main v-if='!isLoading' class='main'>
    <RouterView @logout='signOutacc' />
  </main>
</template>


<style>
  
</style>