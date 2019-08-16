<template>
  <div id="heroesPlayed">
    <h2>Most Played Heroes</h2>
    <div class="content-data" style="overflow: auto" v-if="Array.isArray(limitHeroesPlayed)">
      <b-table :fields="fields" :items="limitHeroesPlayed" style="color: #fff;" class="heroesPlayed-table">
        <template slot="hero" slot-scope="data">
          <img :src="`${imgHeroUrl(parsedHeroes[data.item.hero_id].icon)}`">
          {{ parsedHeroes[data.item.hero_id].localized_name }}
        </template>
        <template slot="matches" slot-scope="data">
          {{ data.item.games }}
        </template>
        <template slot="winrate" slot-scope="data">
          {{ winrate(`${data.item.games}`,`${data.item.win}`) }}
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HeroesPlayed',
  props: {
    userHeroes: Array,
    heroes: Array
  },
  data () {
    return {
      fields: [
        { key: 'hero', label: 'Hero', thClass: 'header', tdClass: 'heroesplayed-data data' },
        { key: 'matches', label: 'Matches', thClass: 'header', tdClass: 'data' },
        { key: 'winrate', label: 'Win %', thClass: 'header', tdClass: 'data' }
      ]
    }
  },
  methods: {
    winrate (games, wins) {
      let x = ((wins / games) * 100).toFixed(2)
      return x
    },
    imgHeroUrl (img) {
      let x = 'https://api.opendota.com' + img
      return x
    }
  },
  computed: {
    parsedHeroes () {
      let parsedObject = this.heroes
      let arrayToObj = (array, keyField) =>
        array.reduce((obj, item) => {
          obj[item[keyField]] = item
          return obj
        }, {})
      parsedObject = arrayToObj(parsedObject, 'id')
      return parsedObject
    },
    limitHeroesPlayed () {
      return this.userHeroes !== null ? this.userHeroes.slice(0, 10) : ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
