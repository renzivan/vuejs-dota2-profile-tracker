<template>
  <div id="profileVuex">
    <input type="text" v-model="dotaId" autofocus />
    <button @click="submitDotaId">Submit</button>
    <br>
    <div>
      <img :src="`${avatarUrl}`" >
      <p>Wins: {{ wins }} | Losses: {{ losses }} | Winrate: {{ winrateCalc }} </p>
      <p>Steam URL: {{ steamUrl }} | Last Login: {{ lastLogin }}</p>
      <h3>{{ personaName }}</h3>
      <img :src="imgRankUrl">
      <img :src="imgTierUrl">
      <pre>Recent Matches: {{ recentMatches }}</pre>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProfileVuex',
  data () {
    return {
      dotaId: '', // 100715623
      steamUrl: '',
      lastLogin: '',
      avatarUrl: '',
      personaName: '',
      rankTier: '',
      wins: '',
      losses: '',
      recentMatches: ''
    }
  },
  methods: {
    submitDotaId () {
      this.$store.dispatch('getUserData', this.dotaId)
    }
  },
  computed: {
    ...mapGetters({
      getUserData: 'getUserData',
      getUserWL: 'getUserWL',
      getRecentMatches: 'getRecentMatches'
    }),
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
  },
  watch: {
    getUserData (val) {
      this.steamUrl = val.steamUrl
      this.lastLogin = val.lastLogin
      this.avatarUrl = val.avatarUrl
      this.personaName = val.personaName
      this.rankTier = val.rankTier
    },
    getUserWL (val) {
      this.wins = val.win
      this.losses = val.lose
    },
    getRecentMatches (val) {
      this.recentMatches = val
    }
  }
}
</script>

<style scoped>
#profileVuex {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#profileVuex pre {
  text-align: left;
}
</style>
