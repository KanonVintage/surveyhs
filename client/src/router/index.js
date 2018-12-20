import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Survey from '@/components/Survey'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/survey/:id_survey',
      name: 'Survey',
      component: Survey
    }
  ]
})
