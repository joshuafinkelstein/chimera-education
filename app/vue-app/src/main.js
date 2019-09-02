import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store.js';
const fb = require('./firebaseConfig.js')
import VueYoutube from 'vue-youtube'

Vue.use(VueYoutube)

Vue.config.productionTip = false;

let app = '';

fb.auth.onAuthStateChanged(() => {
  // label vue instance
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
