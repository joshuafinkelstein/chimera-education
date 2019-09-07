import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store.js';
const fb = require('./firebaseConfig.js')
import VueYoutube from 'vue-youtube'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueYoutube)
Vue.use(VueAxios, axios)

import VueMathjax from 'vue-mathjax'
Vue.use(VueMathjax)

Vue.config.productionTip = false;

let app = '';

fb.auth.onAuthStateChanged((currentUser) => {

  if(currentUser) {
    store.commit('setCurrentUser', currentUser);
    store.commit('setUserProfile', currentUser.providerData[0]);
    store.dispatch('fetchPublicDirectory');
    store.dispatch('fetchPrivateDirectory');
  }

  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
