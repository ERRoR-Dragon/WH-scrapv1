import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

// Import views
import Home from '../views/Home_page.vue'
import Login from '../views/Login_Page.vue'

// Create a promise to resolve the current user
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

// Define routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for authentication
router.beforeEach(async (to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // If it does require auth, check if user is authenticated
    if (await getCurrentUser()) {
      // User is authenticated, proceed to route
      next()
    } else {
      // User is not authenticated, redirect to login
      next('/login')
    }
  } else {
    // If login page is accessed while already logged in, redirect to home
    if (to.path === '/login' && await getCurrentUser()) {
      next('/')
    } else {
      // Route doesn't require auth, proceed
      next()
    }
  }
})

export default router
