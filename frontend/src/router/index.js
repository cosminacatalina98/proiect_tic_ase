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
      path: '/products',
      name: 'products',
      component: () => import('../views/Products.vue'),
    },
    {
      path: '/products/:id',
      name: 'productDetails',
      component: () => import('../views/ProductDetail.vue'),
      props: true,
    },


    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/Cart.vue'),
    },

    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/Orders.vue'),
    },

    {
      path: '/orders/:id',
      name: 'orderDetail',
      component: () => import('../views/OrderDetail.vue'),
      props: true,
    },

    {
      path: '/profile/:id',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
      props: true,
    },

    {
      path: '/admin',
      children: [
        { path: '', name:'admin',  component: () => import('../views/Admin.vue'), },
        { path: 'products', name:'adminProducts',  component: () => import('../views/AdminProducts.vue'), },
        { path: 'products/add', name:'adminProductAdd',  component: () => import('../views/AdminProductAdd.vue'), },
        { path: 'products/edit/:id', name:'adminProductEdit',  component: () => import('../views/AdminProductEdit.vue'),props: true, },
        { path: 'products/details/:id', name:'adminProductDetails',  component: () => import('../views/AdminProductDetail.vue'),props: true, },
        { path: 'orders', name:'adminOrders',  component: () => import('../views/AdminOrders.vue'), },
        { path: 'oders/:id', name:'adminOrderDetails',  component: () => import('../views/AdminOrderDetails.vue'), props: true, },
        { path: 'profile/:id', name:'adminProfile',  component: () => import('../views/AdminProfile.vue'),  props: true, },






      ], 
    },




  ],
})

export default router
