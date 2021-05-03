import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
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
