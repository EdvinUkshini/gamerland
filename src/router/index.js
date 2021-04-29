import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import AuthService from '@/services/AuthService.js';
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
  let role
  if(!(store.getters.getUser)){
  const response = AuthService.getUserInfo(store.state.user);
  response.then(function(result) {
    role = result[0].role;
  })
  }else{
    role = "None";
  } 

  if (RequireAdminRole && role != "Admin"){
    next('Login');
  }else{
    next();
  }

})


export default router
