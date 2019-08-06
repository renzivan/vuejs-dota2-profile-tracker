import axios from 'axios'
import config from '@/config/config'

export default {
  getUserData (dotaId) {
    let url = `https://api.opendota.com/api/players/${dotaId}?api_key=${config.api_key}`
    return axios.get(url)
  },
  getUserWL (dotaId) {
    let url = `https://api.opendota.com/api/players/${dotaId}/wl?api_key=${config.api_key}`
    return axios.get(url)
  },
  getRecentMatches (dotaId) {
    let url = `https://api.opendota.com/api/players/${dotaId}/recentmatches?api_key=${config.api_key}`
    return axios.get(url)
  },
  getMatches (dotaId) {
    let url = `https://api.opendota.com/api/players/${dotaId}/matches?api_key=${config.api_key}`
    return axios.get(url)
  },
  getHeroes () {
    let url = `https://api.opendota.com/api/heroStats?api_key=${config.api_key}`
    return axios.get(url)
  },
  getFriends (dotaId) {
    let url = `https://api.opendota.com/api/players/${dotaId}/peers?api_key=${config.api_key}`
    return axios.get(url)
  },
  getUserHeroes (dotaId) {
    let url = `https://api.opendota.com/api/players/${dotaId}/heroes?api_key=${config.api_key}`
    return axios.get(url)
  }
}
