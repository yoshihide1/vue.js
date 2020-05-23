import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'
// import Gmap from '../components/Gmap'
// import Gnavi from '../components/Gnavi'
import Sign from '../components/sign'
// import Signup from '../components/Signup'
// import Signin from '../components/Signin'
import firebase from 'firebase'

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [//link元App.vue
    {
      path: '*',
      redirect: '/sign'
    },
    {
      path: '/',
      name: 'App',
      component: App
    },
    // {
    //   path: '/gnavi',
    //   name: 'Gnavi',
    //   component: Gnavi
    // },
    // {
    //   path: '/gmap',
    //   name: 'Gmap',
    //   component: Gmap
    // },
    
    // {
    //   path: '/signup',
    //   name: 'Signup',
    //   component: Signup
    // },
    // {

    //   path: '/signin',
    //   name: 'Signin',
    //   component: Signin
    // },
    {
      path: '/sign',
      name: 'Sign',
      component: Sign
    }
      ]

})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {//userの認証確認
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        next()
      } else {
        next({
          path: '/sign',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next()
  }
})


export default router