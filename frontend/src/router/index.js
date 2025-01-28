import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },


    {
      path: '/addpet',
      name: 'addpet',
      component: () => import('../views/Pets.vue'),
    },

    {
      path: '/pets',
      name: 'pets',
      component: () => import('../views/PetsList.vue'),
    },



  ],
})

export default router
