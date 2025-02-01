import { createRouter, createWebHistory } from 'vue-router'
import store from "../store"; // Import Vuex Store
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
      component: () => import('../views/AddPet.vue'),
      meta: { requiresAuth: true } // RUTA PROTEJATA
    },

    {
      path: '/pets',
      name: 'pets',
      component: () => import('../views/PetsList.vue'),
      meta: { requiresAuth: true } 
    },

    {
      path: '/editpet/:id',
      name: 'editpet',
      component: () => import('../views/EditPet.vue'),
      props: true, 
      meta: { requiresAuth: true } 
    },

    {
      path: '/addfile/:id',
      name: 'addfile',
      component: () => import('../views/AddFile.vue'),
      props: true, 
      meta: { requiresAuth: true } 
    },


    {
      path: '/history/:id',
      name: 'history',
      component: () => import('../views/History.vue'),
      props: true, 
      meta: { requiresAuth: true } 
    },

    {
      path: '/editFile/:id',
      name: 'editFile',
      component: () => import('../views/EditFile.vue'),
      props: true, 
      meta: { requiresAuth: true } 
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      
    },


  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  


  if (to.meta.requiresAuth && !isAuthenticated) {
    console.warn(" Acces restrictionat! Redirectionare catre login...");
    next("/login"); 
  } else {
    next();
  }
});


export default router
