import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Internal from '../views/Internal.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/internal',
    name: 'Internal',
    component: Internal
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
