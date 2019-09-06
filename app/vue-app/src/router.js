import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '@/views/Dashboard';
import Login from '@/views/Login';
import SignUp from '@/views/SignUp';
import Player from '@/views/Player';

const fb = require('./firebaseConfig.js');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/player',
      name: 'Player',
      component: Player,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  fb.auth.onAuthStateChanged((currentUser) => {
    
    // specified path requires sign in and the user is not signed in
    // redirect to login
    if(requiresAuth && !currentUser) {
      next('login');
    }
    // specified path does not require sign in and the user is signed in
    // do not redirect to login if the user is already signed in
    else if(!requiresAuth && currentUser) {
      next('dashboard');
    } else {
      next();
    }

  });

});

export default router;
