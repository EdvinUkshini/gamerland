import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Contact from '../views/Contact.vue'
import Policies from '../views/Policies.vue'
import Shop from '../views/Shop.vue'
import Profile from '../components/UserProfile.vue'
import AddProduct from '../views/AddProduct.vue'
import Layout from '../components/Layout.vue'

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      component: Layout,
      children:[
          {
            path: '/',
            name: 'Home',
            component: Home
          },
          {
            path: '/about',
            name: 'About',
          },
          {
            path: '/contact',
            name: 'Contact',
            component: Contact
          },
          {
            path: '/policies',
            name: 'Policies',
            component: Policies
          },
          {
            path: '/shop/:category',
            name: 'Shop',
            component: Shop,
          },
          {
            path: '/profile',
            name: 'Profile',
            component: Profile,
          },
          {
            path: '/addproduct',
            name: 'AddProduct',
            component: AddProduct
          },
          {
            path: '/Admin',
            name: 'Admin',
            meta:{RequireAdminRole:true}
          }
        ]
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to,from,next) =>{
  
  const RequireAdminRole = to.matched.some(record => record.meta.RequireAdminRole);
  if (RequireAdminRole && store.state.user.role != "Admin"){
    next('Login');
  }else{
    next();
  }

})


export default router
