import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import {getToken} from "@/utils/auth";


Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Home')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to ,from,next)=>{
  if (getToken() !== undefined){// 已登录
    if(to.name === 'Login') next('/dashboard')
    else next()
  }else if(to.name !== 'Login')
    // 没有登录
    next({ path : '/'})
  else next()
})

export default router
