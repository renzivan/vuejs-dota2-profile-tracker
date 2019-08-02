import Vue from 'vue'
import Vuex from 'vuex'

import httpReq from '@/api/Api'

Vue.use(Vuex)

export const store = new Vuex.Store({
  namespaced: true,
  state: {
    player: null,
    userData: null
  },
  getters: {
    getPlayer: state => state.player,
    getUserData: state => state.userData
  },
  mutations: {
    getPlayer (state, payload) {
      state.player = {}

      state.userData = payload.data.rank_tier
      state.player.avatarUrl = payload.data.profile.avatarfull
      state.player.personaName = payload.data.profile.personaName
      state.player.rankTier = payload.data.rank_tier
      console.log(payload.data)
    }
  },
  actions: {
    getPlayer ({ commit }, dotaId) {
      let xhr = httpReq.getPlayer(dotaId)
      xhr.then((res) => {
        commit('getPlayer', res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
})
export default store
