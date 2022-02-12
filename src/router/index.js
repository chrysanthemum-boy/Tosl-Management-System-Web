import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import User from "@/views/system/user"
import {getToken} from "@/utils/auth";


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/Home'),
    children:[
      {
        path: 'system/user',
        name: 'User',
        component: User,
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to ,from,next)=>{
  if (getToken() !== undefined && getToken()){// 已登录
    if(to.name === 'Login') next('/')
    else next()
  }else if(to.name !== 'Login')
      // 没有登录
    next({ name : 'Login'})
  else next()
})

export default router
