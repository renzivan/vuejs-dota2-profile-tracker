<template>
  <div id="matches">
    <h2>Matches</h2>
    <div class="content-data" style="overflow: auto">
      <ul class="matches-header">
        <li>Hero</li>
        <li>Result</li>
        <li>Mode</li>
        <li>Duration</li>
        <li>KDA</li>
      </ul>
      <ul class="matches-data">
        <li v-for="(match, id) of limiteMatches" :key="id">
          <!-- <p>{{ match }}</p> -->
          <img :src="`${imgHeroUrl(parsedHeroes[match.hero_id].img)}`">
          <p>{{ parsedHeroes[match.hero_id].localized_name }}</p>
          <p>{{ gameResult(`${match.radiant_win}`,team(`${match.player_slot}`)) }}</p>
          <p>{{ gameModes[match.game_mode].localized_name }}</p>
          <p>{{ durationCalc(match.duration) }}</p>
          <p>{{ team(`${match.player_slot}`) }}</p>
          <p>{{ match.kills }}/{{ match.deaths }}/{{ match.assists }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import jsonGameMode from '@/json/gameModes.json'

export default {
  name: 'Matches',
  props: {
    matches: Array,
    heroes: Array
  },
  data () {
    return {
      gameModes: jsonGameMode
    }
  },
  methods: {
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
    limiteMatches () {
      return this.matches !== null ? this.matches.slice(0, 20) : ''
    },
    parsedHeroes () { // needed if array index != array[].id
      let parsedObject = this.heroes
      let arrayToObj = (array, keyField) =>
        array.reduce((obj, item) => {
          obj[item[keyField]] = item
          return obj
        }, {})
      parsedObject = arrayToObj(parsedObject, 'id')
      return parsedObject
    }
  }
}
</script>

<style lang="scss" scoped>
  ul.matches-header {
    display: flex;
    text-transform: uppercase;
    font-size: 13px;
    padding: 15px 10px;
    margin-bottom: 0;
    border-bottom: 1px solid #3a5f67;
  }
  ul.matches-data {
    li {
      display: flex;
      padding-bottom: 10px;
      border-bottom: 1px solid #22393f;
      img {
        width: 56px;
        height: 32px;
      }
    }
  }
</style>
