<template>
  <div id="profile">
    <input type="text" v-model="dotaId" @keyup.enter="submitDotaId" autofocus />
    <button @click.prevent="submitDotaId">Submit</button>
    <br>
    <div>
      <img :src="`${userData.avatarUrl}`" >
      <p>Wins: {{ userData.wins }} | Losses: {{ userData.losses }} | Winrate: {{ winrateCalc }} </p>
      <p>Steam URL: {{ userData.steamUrl }} </p>
      <p> Last Login: {{ userData.lastLogin }}</p>
      <h3>{{ userData.personaName }}</h3>
      <p>Solo MMR: {{ userData.soloMmr }}</p>
      <p>Party MMR: {{ userData.partyMmr }}</p>
      <p>Leaderboard: {{ userData.leaderboardRank }}</p>
      <img :src="imgRankUrl">
      <img :src="imgTierUrl">
      <h2>Recent Matches: (Player Slot: 0-127 are Radiant, 128-255 are Dire) </h2>
      <p>Heroes: {{ heroes[11].localized_name }}</p>
      <ul>
        <li v-for="(match, id) of recentMatches" :key="id">
          <p>match_id: {{ match.match_id }} | result: {{ match.radiant_win }} | duration: {{ match.duration }} | kda: {{ match.kills }} {{ match.deaths }} {{ match.assists }} | party: {{ match.party }} | player_slot: {{ match.player_slot }} ~ </p>
          <p>Hero: {{ match.hero_id }} ~ {{ parsedHeroes[match.hero_id].localized_name }}</p>
          <p>Game Mode: {{ match.game_mode }} ~ {{ gameModes[match.game_mode].localized_name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import jsonGameMode from '@/json/gameModes.json'
import jsonHeroes from '@/json/heroes.json'

export default {
  name: 'Profile',
  data () {
    return {
      dotaId: '', // rank 58 100594231  ... rank 8 91369376
      userData: {
        steamUrl: '',
        lastLogin: '',
        avatarUrl: '',
        personaName: '',
        rankTier: '',
        wins: '',
        losses: '',
        soloMmr: '',
        partyMmr: '',
        leaderboardRank: ''
      },
      recentMatches: {},
      gameModes: jsonGameMode,
      heroes: jsonHeroes
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
      return (this.userData.rankTier / 10).toFixed(1).split('.')
    },
    imgRankUrl () {
      let medal = this.splitRankTier[0].toString()
      let imgRankSrc = require.context('../assets/images/rank_icons/', false, /\.png$/)
      if (this.leaderboardRank > 10 && this.leaderboardRank < 101) {
        medal = '8b'
      } else if (this.leaderboardRank > 0 && this.leaderboardRank < 11) {
        medal = '8c'
      }
      return imgRankSrc('./' + 'rank_icon_' + medal + '.png')
    },
    imgTierUrl () {
      let star = this.splitRankTier[1]
      let imgTierSrc = require.context('../assets/images/rank_icons/', false, /\.png$/)
      return (star < 1 ? false : imgTierSrc('./' + 'rank_star_' + star + '.png'))
    },
    winrateCalc () {
      let totalMatches = this.userData.wins + this.userData.losses
      let rate = ((this.userData.wins / totalMatches) * 100).toFixed(2)
      return totalMatches > 0 ? rate : ''
    },
    parsedHeroes () {
      let heroesObject = this.heroes
      let arrayToObj = (array, keyField) =>
        array.reduce((obj, item) => {
          obj[item[keyField]] = item
          return obj
        }, {})
      heroesObject = arrayToObj(heroesObject, 'id')
      return heroesObject
    }
  },
  watch: {
    getUserData (val) {
      this.userData.steamUrl = val.steamUrl
      this.userData.lastLogin = val.lastLogin
      this.userData.avatarUrl = val.avatarUrl
      this.userData.personaName = val.personaName
      this.userData.rankTier = val.rankTier
      this.userData.soloMmr = val.soloMmr
      this.userData.partyMmr = val.partyMmr
      this.userData.leaderboardRank = val.leaderboardRank
    },
    getUserWL (val) {
      this.userData.wins = val.win
      this.userData.losses = val.lose
    },
    getRecentMatches (val) {
      this.recentMatches = val
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
