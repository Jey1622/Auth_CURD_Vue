import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import NotFounnd from '@/views/NotFounnd.vue'
import TaskPage from '@/components/TaskPage.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/tasks',
    component: TaskPage,
    children: [
      {
        path: '',
        component: () => import('../views/TodoView.vue'),
      },
    ]
    },
  {
    path:'/:catchAll(.*)',
    name:"NotFound",
    component:NotFounnd
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
