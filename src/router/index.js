import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {getAuth} from 'firebase/auth'
import {app} from '@/main.js'

Vue.use(VueRouter)

function requireAuth(to, from, next) {
  const auth = getAuth(app);
  if (!auth.currentUser) {
    console.log("User is not logged in");
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    console.log("User is logged in:", auth.currentUser.uid);
    next()
  }
}
function requireNoAuth(to, from, next) {
  const auth = getAuth(app);
  if (auth.currentUser) {
    console.log("User is logged in:", auth.currentUser.uid);
    next({
      path: '/home'
    })
  } else {
    console.log("User is not logged in");
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: requireNoAuth,
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    beforeEnter: requireNoAuth,
    component: () => import('@/views/auth/Register.vue')
  },
  {
    path: '/about',
    name: 'About',
    beforeEnter: requireAuth,
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
