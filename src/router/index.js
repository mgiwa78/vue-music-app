import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Manage from '@/views/Manage.vue'
import About from '@/views/About.vue'
import Song from '@/views/Song.vue'
import useUserStore from '@/stores/user'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/song/:id', name: 'song', component: Song },
  {
    path: '/manage',
    name: 'Manage',
    component: Manage,
    meta: { requiresAuth: true }
  },
  { path: '/:catchAll(.*)*', redirect: { name: 'Home' } }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next()
    return
  }

  const store = useUserStore()
  if (store.userLoggedIn) {
    next()
  } else ({ name: 'Home' })
})

export default router
