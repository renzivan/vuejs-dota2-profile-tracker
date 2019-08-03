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
      let res = payload.data
      state.userData = {
        steamUrl: res.profile.profileurl,
        lastLogin: res.profile.last_login,
        avatarUrl: res.profile.avatarfull,
        personaName: res.profile.personaname,
        rankTier: res.rank_tier,
        soloMmr: res.solo_competitive_rank,
        partyMmr: res.competitive_rank,
        leaderboardRank: res.leaderboard_rank
      }
    },
    getUserWL (state, payload) {
      let res = payload.data
      state.winloss = {
        win: res.win,
        lose: res.lose
      }
    },
    getRecentMatches (state, payload) {
      state.recentMatches = payload.data
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
