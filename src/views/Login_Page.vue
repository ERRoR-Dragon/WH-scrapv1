<template>
  <div class="login-container">
    <div class="login-card">
      <h1>WreckHavoc</h1>
      <p>Sign in to your account</p>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <button 
        @click="signInWithGoogle" 
        :disabled="loading" 
        class="google-login-btn"
      >
        <span v-if="loading">Signing in...</span>
        <span v-else>
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" class="google-icon">
          Sign in with Google
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../firebase.js'
import { useRouter } from 'vue-router'

export default {
  name: 'Login_Page',
  setup() {
    const loading = ref(false)
    const error = ref('')
    const router = useRouter()

    const signInWithGoogle = async () => {
      loading.value = true
      error.value = ''
      
      try {
        const provider = new GoogleAuthProvider()
        
        // Optional: Add additional scopes
        provider.addScope('email')
        provider.addScope('profile')
        
        const result = await signInWithPopup(auth, provider)
        
        // User signed in successfully
        console.log('User signed in:', result.user)
        
        // Redirect to home page
        router.push('/')
        
      } catch (err) {
        console.error('Error signing in:', err)
        error.value = 'Failed to sign in. Please try again.'
      } finally {
        loading.value = false
      }
    }

    return {
      loading,
      error,
      signInWithGoogle
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: bisque ;
  padding: 20px;
}

.login-card {
  background: tan;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.login-card h1 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

.login-card p {
  color: #666;
  margin-bottom: 2rem;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 4px solid #c33;
}

.google-login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 1rem;
  background: saddlebrown;
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  transition: all 0.2s ease;
}

.google-login-btn:hover:not(:disabled) {
  border-color: #4285f4;
  box-shadow: 0 4px 8px rgba(66, 133, 244, 0.2);
}

.google-login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.google-icon {
  width: 20px;
  height: 20px;
}
</style>
