import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import cognito from '@/cognito'

Vue.use(Router)

const requireAuth = (to, from, next) => {
  cognito.isAuthenticated()
    .then(session => {
      next()
    })
    .catch(session => {
      console.log(to.fullPath)
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    })
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      component: Dashboard,
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
