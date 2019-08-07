<template>
  <div id="recentMatches">
    <div style="overflow: auto">
      <h2>Recent Matches:</h2>
      <ul style="display: flex">
        <li v-for="(recentMatch, id) of recentMatches" :key="id">
          <p>match_id: {{ recentMatch.match_id }} | party: {{ recentMatch.party_size }} </p>
          <!-- ##<p>Solo or Party: {{ soloParty(`${match.party_size}`) }}</p> -->
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import jsonGameMode from '@/json/gameModes.json'

export default {
  name: 'RecentMatches',
  data () {
    return {
      matches: '',
      recentMatches: '',
      gameModes: jsonGameMode,
      heroes: '',
      userHeroes: ''
    }
  },
  methods: {
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
      getRecentMatches: 'getRecentMatches',
      getHeroes: 'getHeroes'
    }),
    parsedHeroes () {
      return this.objectParser(this.heroes)
    }
  },
  watch: {
    getRecentMatches (val) {
      this.recentMatches = val
    },
    getHeroes (val) {
      this.heroes = val
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
