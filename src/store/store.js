import Vue from 'vue'
import Vuex from 'vuex'

import httpReq from '@/api/Api'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userData: null,
    winloss: null,
    matches: null,
    recentMatches: null,
    heroes: null,
    friends: null,
    userHeroes: null
  },
  getters: {
    getUserData: state => state.userData,
    getUserWL: state => state.winloss,
    getMatches: state => state.matches,
    getRecentMatches: state => state.recentMatches,
    getHeroes: state => state.heroes,
    getFriends: state => state.friends,
    getUserHeroes: state => state.userHeroes
  },
  mutations: {
    getUserData (state, payload) {
      state.userData = payload.data
      console.log('request userdata')
    },
    getUserWL (state, payload) {
      state.winloss = payload.data
      console.log('request winloss')
    },
    getMatches (state, payload) {
      state.matches = payload.data
      console.log('request matches')
    },
    getRecentMatches (state, payload) {
      state.recentMatches = payload.data
      console.log('request recent matches')
    },
    getHeroes (state, payload) {
      state.heroes = payload.data
      console.log('request heroes')
    },
    getFriends (state, payload) {
      state.friends = payload.data
      console.log('request friends')
    },
    getUserHeroes (state, payload) {
      state.userHeroes = payload.data
      console.log('request heroes played')
    }
  },
  actions: {
    getUserData ({ commit, dispatch }, dotaId) {
      let xhr = httpReq.getUserData(dotaId)
      xhr.then((res) => {
        commit('getUserData', res)
        dispatch('getUserWL', dotaId)
        dispatch('getMatches', dotaId)
        dispatch('getRecentMatches', dotaId)
        dispatch('getFriends', dotaId)
        dispatch('getUserHeroes', dotaId)
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
    getMatches ({ commit }, dotaId) {
      let xhr = httpReq.getMatches(dotaId)
      xhr.then((res) => {
        commit('getMatches', res)
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
    },
    getHeroes ({ commit }) {
      let xhr = httpReq.getHeroes()
      xhr.then((res) => {
        commit('getHeroes', res)
      }).catch((err) => {
        console.log(err)
      })
    },
    getFriends ({ commit }, dotaId) {
      let xhr = httpReq.getFriends(dotaId)
      xhr.then((res) => {
        commit('getFriends', res)
      }).catch((err) => {
        console.log(err)
      })
    },
    getUserHeroes ({ commit }, dotaId) {
      let xhr = httpReq.getUserHeroes(dotaId)
      xhr.then((res) => {
        commit('getUserHeroes', res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
})
export default store
