// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import jquery from 'jquery'
// import promise from 'promise'

import Axios from 'axios'

import Jsonp from 'vue-jsonp'

Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(Jsonp);

Vue.prototype.axios = Axios;
Vue.prototype.$ = jquery;
// Vue.prototype.jsonp = Jsonp;

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
