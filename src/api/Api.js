import axios from 'axios'

export default {
  getUserData (dotaId) {
    let url = `https://api.opendota.com/api/players/${dotaId}`
    return axios.get(url)
  },
  getUserWL (dotaId) {
    let url = `https://api.opendota.com/api/players/${dotaId}/wl`
    return axios.get(url)
  },
  getRecentMatches (dotaId) {
    let url = `https://api.opendota.com/api/players/${dotaId}/recentmatches`
    return axios.get(url)
  }
}
