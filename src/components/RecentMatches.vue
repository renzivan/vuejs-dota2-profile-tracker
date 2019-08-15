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
        <!-- <li v-for="(recentMatch, id) of recentMatches" :key="id">
          <div class="hero">
            <img :src="`${imgHeroUrl(parsedHeroes[recentMatch.hero_id].img)}`">
            <p>{{ parsedHeroes[recentMatch.hero_id].localized_name }}</p>
          </div>
          <p class="result">{{ gameResult(`${recentMatch.radiant_win}`,team(`${recentMatch.player_slot}`)) }} Match</p>
          <p>{{ gameModes[recentMatch.game_mode].localized_name }}</p>
          <div class="duration-team">
            <p>{{ durationCalc(recentMatch.duration) }}</p>
            <p>{{ team(`${recentMatch.player_slot}`) }}</p>
          </div>
          <p>{{ recentMatch.kills }}/{{ recentMatch.deaths }}/{{ recentMatch.assists }}</p>
        </li> -->
      </ul>
      <b-table hover :fields="fields" :items="recentMatches" style="color: #fff;">
        <template slot="hero" slot-scope="data">
          {{ data.items.hero_id }}
        </template>
      </b-table>
      <!-- <pre style="color: #fff;">{{ recentMatches }}</pre> -->
    </div>
  </div>
</template>

<script>
import jsonGameMode from '@/json/gameModes.json'

export default {
  name: 'RecentMatches',
  props: {
    recentMatches: Array,
    heroes: Array
  },
  data () {
    return {
      fields: [
        { key: 'hero_id', label: 'Hero' }
      ],
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
  ul {
    padding-left: 10px;
  }
  .content-data {
    margin-right: 7px;
  }
  ul.recentMatches-header {
    display: flex;
    text-transform: uppercase;
    font-size: 13px;
    padding: 15px 10px;
    margin-bottom: 0;
    border-bottom: 1px solid #3a5f67;
    li {
      // flex: 0.5;
      // &:first-child {
      //   flex: 1;
      // }
      // &:last-child {
      //   flex: 0.3;
      // }
      width: 100%;
    }
  }
  ul.recentMatches-data {
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
