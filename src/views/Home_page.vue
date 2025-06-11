<template>
  <div class="home">
    <div class="hero-section">
      <h1>Welcome, {{ userName }}!</h1>
      <p>This is the home page of WreckHavoc</p>
      
     <!-- <div class="user-info">
        <img 
          v-if="user.photoURL" 
          :src="user.photoURL" 
          :alt="user.displayName"
          class="user-avatar"
        >
        <div class="user-details">
          <h3>{{ user.displayName }}</h3>
          <p>{{ user.email }}</p>
        </div>
      </div>
      
      <button @click="signOut" class="sign-out-btn">
        Sign Out
      </button>
    -->
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
//import { signOut } from 'firebase/auth'
import { auth } from '../firebase.js'
import { useRouter } from 'vue-router'

export default {
  name: 'Home_Page',
  setup() {
    const user = ref({})
    const userName = ref('')
    const router = useRouter()

    onMounted(() => {
      if (auth.currentUser) {
        user.value = auth.currentUser
        userName.value = auth.currentUser.displayName || 'User'
      }
    })

    const signOut = async () => {
      try {
        await signOut(auth)
        router.push('/login')
      } catch (error) {
        console.error('Error signing out:', error)
      }
    }

    return {
      user,
      userName,
      signOut
    }
  }
}
</script>

<style scoped>
.home {
  padding: 2rem;
  background: black;
}

.hero-section {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 3rem 0;
}

.hero-section h1 {
  color: yellow;
  margin-bottom: 1rem;
  font-family :Verdana, Geneva, Tahoma, sans-serif;
  font-size: 2.5rem;
}

.hero-section p {
  color: yellow;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 10px;
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.user-details h3 {
  margin: 0;
  color: #333;
}

.user-details p {
  margin: 0.5rem 0 0 0;
  color: #666;
}

.sign-out-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.2s ease;
}

.sign-out-btn:hover {
  background: #c82333;
}
</style>
