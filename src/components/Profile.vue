<template>
  <div id="profile">
    <input type="text" v-model="dotaId" @keyup.enter="submitDotaId" autofocus />
    <button @click="submitDotaId">Submit</button>
    <br>
    <div style="overflow: auto; display: flex">
      <h2>Profile:</h2>
      <img :src="`${userData.avatarUrl}`" >
      <p>Wins: {{ winloss.win }} | Losses: {{ winloss.lose }} | Winrate: {{ winrateCalc }} </p>
      <p>Steam URL: {{ userData.steamUrl }} </p>
      <p>Last Login: {{ userData.lastLogin }}</p>
      <h3>{{ userData.personaName }}</h3>
      <p>Solo MMR: {{ userData.soloMmr }}</p>
      <p>Party MMR: {{ userData.partyMmr }}</p>
      <p>Leaderboard: {{ userData.leaderboardRank }}</p>
      <img :src="imgRankUrl">
      <img :src="imgTierUrl">
    </div>
    <hr>
    <div style="overflow: auto">
      <h2>Friends</h2>
      <ul style="display: flex">
        <li v-for="(friend, id) of friends" :key="id">
          <p>{{ friend.personaname }}</p>
          <img :src="`${ friend.avatar }`" >
          <p>last_played: {{ friend.last_played }}</p>
          <p>games: {{ friend.games }}</p>
          <p>wins: {{ friend.wins }}</p>
        </li>
      </ul>
    </div>
    <hr>
    <div style="overflow: auto">
      <h2>Recent Matches:</h2>
      <ul style="display: flex">
        <li v-for="(recentMatch, id) of recentMatches" :key="id">
          <p>match_id: {{ recentMatch.match_id }} | party: {{ recentMatch.party_size }} </p>
          <!-- <p>Solo or Party: {{ soloParty(`${match.party_size}`) }}</p> -->
          <p>Duration: {{ durationCalc(`${recentMatch.duration}`) }}</p>
          <p>Hero: {{ parsedHeroes[recentMatch.hero_id].localized_name }}</p>
          <p>Game Mode: {{ gameModes[recentMatch.game_mode].localized_name }}</p>
          <p>KDA: {{ recentMatch.kills }}/{{ recentMatch.deaths }}/{{ recentMatch.assists }}</p>
          <p>Team: {{ team(`${recentMatch.player_slot}`) }}</p>
          <p>Result: {{ gameResult(`${recentMatch.radiant_win}`,team(`${recentMatch.player_slot}`)) }}</p>
          <img :src="`${imgHeroUrl(parsedHeroes[recentMatch.hero_id].img)}`" >
        </li>
      </ul>
    </div>
    <hr>
    <div style="overflow: auto">
      <h2>Matches:</h2>
      <ul style="display: flex">
        <li v-for="(match, id) of matches" :key="id">
          <p>{{ match }}</p>
        </li>
      </ul>
    </div>
    <hr>
    <div style="overflow: auto">
      <h2>Heroes Played:</h2>
      <ul style="display: flex">
        <li v-for="(userHero, id) of userHeroes" :key="id">
          <p>{{ userHero }}</p>
        </li>
      </ul>
      <!-- <pre>{{ userHeroes }}</pre> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import jsonGameMode from '@/json/gameModes.json'

export default {
  name: 'Profile',
  data () {
    return {
      baseUrl: 'https://api.opendota.com/api',
      dotaId: '', // rank 58 100594231  ... rank 8 91369376
      userData: {
        steamUrl: '',
        lastLogin: '',
        avatarUrl: '',
        personaName: '',
        rankTier: '',
        soloMmr: '',
        partyMmr: '',
        leaderboardRank: ''
      },
      winloss: '',
      matches: '',
      recentMatches: '',
      gameModes: jsonGameMode,
      heroes: '',
      friends: '',
      userHeroes: ''
    }
  },
  methods: {
    submitDotaId () {
      this.$store.dispatch('getUserData', this.dotaId)
      this.$store.dispatch('getHeroes')
    },
    objectParser (val) { // needed if array index != array[].id
      let parsedObject = val
      let arrayToObj = (array, keyField) =>
        array.reduce((obj, item) => {
          obj[item[keyField]] = item
          return obj
        }, {})
      parsedObject = arrayToObj(parsedObject, 'id')
      return parsedObject
    },
    imgHeroUrl (img) {
      let x = 'https://api.opendota.com' + img
      return x
    },
    team (val) {
      return (val > 127 ? 'Dire' : 'Radiant')
    },
    gameResult (val, team) {
      return ((team === 'Radiant' && val === 'true') || (team === 'Dire' && val === 'false') ? 'Won' : 'Lost')
    },
    durationCalc (val) {
      val /= 60
      let m = Math.floor(val)
      let s = Math.ceil((val - Math.floor(val)) * 60)
      return m + ':' + s
    }
    // soloParty (val) {
    //   return (val == 1 || val == null ? 'Solo' : 'Party')
    // },
  },
  computed: {
    ...mapGetters({
      getUserData: 'getUserData',
      getUserWL: 'getUserWL',
      getMatches: 'getMatches',
      getRecentMatches: 'getRecentMatches',
      getHeroes: 'getHeroes',
      getFriends: 'getFriends',
      getUserHeroes: 'getUserHeroes'
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
      let totalMatches = this.wins + this.losses
      let rate = ((this.wins / totalMatches) * 100).toFixed(2)
      return totalMatches > 0 ? rate : ''
    },
    parsedHeroes () {
      return this.objectParser(this.heroes)
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
      this.winloss = val
    },
    getMatches (val) {
      this.matches = val
    },
    getRecentMatches (val) {
      this.recentMatches = val
    },
    getHeroes (val) {
      this.heroes = val
    },
    getFriends (val) {
      this.friends = val
    },
    getUserHeroes (val) {
      this.userHeroes = val
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
