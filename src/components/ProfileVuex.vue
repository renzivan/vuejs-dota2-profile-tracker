<template>
  <div id="profileVuex">
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
    <pre> {{ userData }} </pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProfileVuex',
  data () {
    return {
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
      this.$store.dispatch('getPlayer', this.dotaId)
    }
  },
  computed: {
    ...mapGetters({
      getPlayer: 'getPlayer',
      getUserData: 'getUserData'
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
    getPlayer (nv, ov) {
      this.avatarUrl = nv.avatarUrl
      this.personaName = nv.personaName
      this.rankTier = nv.rankTier
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
