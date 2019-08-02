import axios from 'axios'

export default {
  getPlayer (dotaId) {
    let url = `https://api.opendota.com/api/players/${dotaId}`
    return axios.get(url)
  },
  getPlayerWL (dotaId) {
    let url = `https://api.opendota.com/api/players/${dotaId}/wl`
    return axios.get(url)
  }
}
