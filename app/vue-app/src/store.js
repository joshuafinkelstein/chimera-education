import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      currentUser: null,
      userProfile: {}
    },
    actions: {
      clearData({ commit }) {
        commit('setCurrentUser', null)
        commit('setUserProfile', null)
      }
    },
    mutations: {
      setCurrentUser(state, val) {
        state.currentUser = val
      },
      setUserProfile(state, val) {
        state.userProfile = val
      }
    }
})
