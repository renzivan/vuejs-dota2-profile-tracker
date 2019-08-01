<template>
  <div id="profile">
    <input type="text" v-model="dotaId" autofocus />
    <button @click="submitDotaId">Submit</button>
    <br>
    <div>
      <img :src="`${avatarUrl}`" >
      <p>Wins: {{ wins }} | Losses: {{ losses }} | Winrate: {{ winrateCalc }} </p>
      <h3>{{ personaName }}</h3>
      <img :src="imgRankUrl">
      <img :src="imgTierUrl">
    </div>
    <pre> {{ userData.data }} </pre>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Profile',
  data () {
    return {
      baseUrl: 'https://api.opendota.com/api',
      section: 'players',
      dotaId: '', // 100715623
      userData: {},
      avatarUrl: '',
      personaName: '',
      rankTier: '',
      wins: '',
      losses: ''
    }
  },
  methods: {
    submitDotaId () {
      axios.get(this.baseUrl + '/' + this.section + '/' + this.dotaId)
        .then((res) => {
          this.userData = res
          this.avatarUrl = res.data.profile.avatarfull
          this.personaName = res.data.profile.personaname
          this.rankTier = res.data.rank_tier
          return axios.get(this.baseUrl + '/' + this.section + '/' + this.dotaId + '/' + 'wl')
        })
        .then((res) => {
          this.wins = res.data.win
          this.losses = res.data.lose
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    splitRankTier () {
      return (this.rankTier / 10).toFixed(1).split('.')
    },
    imgRankUrl () {
      let medal = this.splitRankTier[0]
      let imgRankSrc = require.context('../assets/images/rank_icons/', false, /\.png$/)
      return imgRankSrc('./' + 'rank_icon_' + medal + '.png')
    },
    imgTierUrl () {
      let star = this.splitRankTier[1]
      let imgTierSrc = require.context('../assets/images/rank_icons/', false, /\.png$/)
      return (star < 1 ? false : imgTierSrc('./' + 'rank_star_' + star + '.png'))
    },
    winrateCalc () {
      let totalMatches = this.wins + this.losses
      let rate = ((this.wins / totalMatches) * 100).toFixed(2)
      return totalMatches > 0 ? rate : ''
    }
  }
}
</script>

<style scoped>
#profile {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#profile pre {
  text-align: left;
}
</style>
