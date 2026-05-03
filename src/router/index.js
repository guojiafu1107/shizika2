import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LearnView from '@/views/LearnView.vue'
import PracticeView from '@/views/PracticeView.vue'
import ProfileView from '@/views/ProfileView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/learn/:id?', name: 'learn', component: LearnView },
  { path: '/practice', name: 'practice', component: PracticeView },
  { path: '/profile', name: 'profile', component: ProfileView }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
