import firebase from 'firebase';
import Vue from 'vue';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

let app = '';

// Your web app's Firebase configuration
const config = firebase.initializeApp({
  apiKey: "AIzaSyDxMRazrz1DpgfvaZpKJ9GON9YStwnMfGA",
  authDomain: "chimera-e8803.firebaseapp.com",
  databaseURL: "https://chimera-e8803.firebaseio.com",
  projectId: "chimera-e8803",
  storageBucket: "",
  messagingSenderId: "788713293552",
  appId: "1:788713293552:web:132e4a08046a9ea3"
});

let db = config.database();

firebase.auth().onAuthStateChanged(() => {
  var auth = firebase.auth();

  if(!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }

  if(auth) {
    db.ref('published').once('value').then(function(snapshot) {
      app.publicDirectory = snapshot.val();
      console.log(app.publicDirectory);
    });
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
