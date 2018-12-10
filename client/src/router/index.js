import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn'
import Survey from '@/components/Survey'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/survey',
      name: 'Survey',
      component: Survey
    }
  ]
})
