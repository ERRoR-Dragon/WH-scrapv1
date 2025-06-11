<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="nav-brand">
        WreckHavoc
      </router-link>
      
      <div class="nav-menu">
        <router-link 
          v-if="user" 
          to="/" 
          class="nav-link"
          active-class="active"
        >
          Home
        </router-link>
        
        <div v-if="user" class="user-menu">
          <img 
            v-if="user.photoURL" 
            :src="user.photoURL" 
            :alt="user.displayName"
            class="nav-avatar"
          >
          <span class="nav-username">{{ user.displayName }}</span>
          <button @click="handleSignOut" class="nav-signout">
            Sign Out
          </button>
        </div>
        
        <router-link 
          v-else 
          to="/login" 
          class="nav-link"
          active-class="active"
        >
          Login
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase.js'
import { useRouter } from 'vue-router'

export default {
  name: 'NavBar',
  setup() {
    const user = ref(null)
    const router = useRouter()

    onMounted(() => {
      onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser
      })
    })

    const handleSignOut = async () => {
      try {
        await signOut(auth)
        router.push('/login')
      } catch (error) {
        console.error('Error signing out:', error)
      }
    }

    return {
      user,
      handleSignOut
    }
  }
}
</script>

<style scoped>
.navbar {
  background: black;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: lightcoral;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  color: lightcoral;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #333;
  background: lightcoral;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.nav-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-username {
  color: lightcoral;
  font-weight: 500;
}

.nav-signout {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s ease;
}

.nav-signout:hover {
  background: #c82333;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 0.5rem;
  }
  
  .nav-username {
    display: none;
  }
}
</style>
