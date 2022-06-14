import { createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    name: '/',
    component: () => import('@/layout/BaseLayout.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router