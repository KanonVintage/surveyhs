// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import 'vue-material-design-icons/styles.css'
import Vuetify from 'vuetify'
import vueResource from 'vue-resource'
import VueSession from 'vue-session'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'



Vue.use(Vuetify);
Vue.use(vueResource);
Vue.use(VueSession);
Vue.use(Viewer, {defaultOptions: {
  toolbar: 0,
  navbar: 0,
  title: 0
}});


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
