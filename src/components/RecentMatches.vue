<template>
  <div id="recentMatches">
    <h2>Recent Matches</h2>
    <div class="content-data" style="overflow: auto">
      <b-table :fields="fields" :items="recentMatches" style="color: #fff;" class="recentMatches-table">
        <template slot="hero" slot-scope="data">
          <img :src="`${imgHeroUrl(parsedHeroes[data.item.hero_id].img)}`">
          <span>{{ parsedHeroes[data.item.hero_id].localized_name }}</span>
        </template>
        <template slot="result" slot-scope="data">
          <p v-bind:class="{'won': gameResult(`${data.item.radiant_win}`,team(`${data.item.player_slot}`)) === 'Won', 'lost': gameResult(`${data.item.radiant_win}`,team(`${data.item.player_slot}`)) === 'Lost'}">
            {{ gameResult(`${data.item.radiant_win}`,team(`${data.item.player_slot}`)) }}
          </p>
        </template>
        <template slot="mode" slot-scope="data">
          {{ gameModes[data.item.game_mode].localized_name }}
        </template>
        <template slot="duration" slot-scope="data">
          <p>{{ durationCalc(data.item.duration) }}</p>
          <p>{{ team(`${data.item.player_slot}`) }}</p>
        </template>
        <template slot="kda" slot-scope="data">
          {{ data.item.kills }}/{{ data.item.deaths }}/{{ data.item.assists }}
        </template>
      </b-table>
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
        { key: 'hero', label: 'Hero', thClass: 'header', tdClass: 'data' },
        { key: 'result', label: 'Result', thClass: 'header', tdClass: 'data' },
        { key: 'mode', label: 'Mode', thClass: 'header', tdClass: 'data' },
        { key: 'duration', label: 'Mode', thClass: 'header', tdClass: 'data' },
        { key: 'kda', label: 'KDA', thClass: 'header', tdClass: 'data' }
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
  //
  @media screen and (max-width: 991px) {
    .content-data {
      margin-right: 0px;
    }
  }
  @media screen and (max-width: 520px) {
    img {
      display: block;
    }
  }
</style>
