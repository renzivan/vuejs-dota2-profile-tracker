<template>
  <div id="recentMatches">
    <h2>Recent Matches</h2>
    <div class="content-data" style="overflow: auto">
      <ul class="recentMatches-header">
        <li>Hero</li>
        <li>Result</li>
        <li>Mode</li>
        <li>Duration</li>
        <li>KDA</li>
      </ul>
      <ul class="recentMatches-data">
        <li v-for="(recentMatch, id) of recentMatches" :key="id">
          <img :src="`${imgHeroUrl(parsedHeroes[recentMatch.hero_id].img)}`" >
          <p>{{ parsedHeroes[recentMatch.hero_id].localized_name }}</p>
          <p>{{ gameResult(`${recentMatch.radiant_win}`,team(`${recentMatch.player_slot}`)) }}</p>
          <p>{{ gameModes[recentMatch.game_mode].localized_name }}</p>
          <p>{{ durationCalc(`${recentMatch.duration}`) }}</p>
          <p>{{ team(`${recentMatch.player_slot}`) }}</p>
          <!-- <p>match_id: {{ recentMatch.match_id }} | party: {{ recentMatch.party_size }} </p> -->
          <p>{{ recentMatch.kills }}/{{ recentMatch.deaths }}/{{ recentMatch.assists }}</p>
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
      return s < 10 ? m + ':0' + s : m + ':' + s
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
  .recentMatches-header {
    display: flex;
  }
  .recentMatches-data {
    li {
      display: flex;
      img {
        width: 56px;
        height: 32px;
      }
    }
  }
</style>
