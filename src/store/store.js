import Vue from 'vue'
import Vuex from 'vuex'

import httpReq from '@/api/Api'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userData: null,
    winloss: null,
    recentMatches: null
  },
  getters: {
    getUserData: state => state.userData,
    getUserWL: state => state.winloss,
    getRecentMatches: state => state.recentMatches
  },
  mutations: {
    getUserData (state, payload) {
      state.userData = {}
      state.userData.steamUrl = payload.data.profile.profileurl
      state.userData.lastLogin = payload.data.profile.last_login
      state.userData.avatarUrl = payload.data.profile.avatarfull
      state.userData.personaName = payload.data.profile.personaname
      state.userData.rankTier = payload.data.rank_tier
    },
    getUserWL (state, payload) {
      state.winloss = {}
      state.winloss = payload
      state.winloss.win = payload.data.win
      state.winloss.lose = payload.data.lose
    },
    getRecentMatches (state, payload) {
      state.recentMatches = {}
      // state.recentMatches = payload.data[0].match_id
      state.recentMatches = payload.data
      console.log(state.recentMatches)
    }
  },
  actions: {
    getUserData ({ commit, dispatch }, dotaId) {
      let xhr = httpReq.getUserData(dotaId)
      xhr.then((res) => {
        commit('getUserData', res)
        dispatch('getUserWL', dotaId)
        dispatch('getRecentMatches', dotaId)
      }).catch((err) => {
        console.log(err)
      })
    },
    getUserWL ({ commit }, dotaId) {
      let xhr = httpReq.getUserWL(dotaId)
      xhr.then((res) => {
        commit('getUserWL', res)
      }).catch((err) => {
        console.log(err)
      })
    },
    getRecentMatches ({ commit }, dotaId) {
      let xhr = httpReq.getRecentMatches(dotaId)
      xhr.then((res) => {
        commit('getRecentMatches', res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
})
export default store
