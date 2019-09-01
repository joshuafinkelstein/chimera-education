import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebaseConfig.js')

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      currentUser: null,
      userProfile: {},
      publicDirectory: {},
      privateDirectory: {}
    },
    actions: {
      clearData({ commit }) {
        commit('setCurrentUser', null)
        commit('setUserProfile', null)
        commit('setPublicDirectory', null)
        commit('setPrivateDirectoy', null)
      },
      fetchPublicDirectory({ commit }) {
        fb.db.ref('published').once('value').then(function(snapshot) {
          commit('setPublicDirectory', snapshot.val())
        }).catch(function(err) {
          console.log(err);
        })
      },
      fetchPrivateDirectory({ commit }) {
        fb.db.ref('users/'+fb.auth.currentUser.uid+'/').once('value').then(function(snapshot) {
          commit('setPrivateDirectory', snapshot.val())
        }).catch(function(err) {
          console.log(err);
        })
      }
    },
    mutations: {
      setCurrentUser(state, val) {
        state.currentUser = val
      },
      setUserProfile(state, val) {
        state.userProfile = val
      },
      setPublicDirectory(state, val) {
        state.publicDirectory = val
      },
      setPrivateDirectory(state, val) {
        state.privateDirectory = val
      }
    }
})
