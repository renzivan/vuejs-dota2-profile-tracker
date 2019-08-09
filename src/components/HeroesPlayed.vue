<template>
  <div id="heroesPlayed">
    <h2>Most Played Heroes</h2>
    <div class="content-data" style="overflow: auto">
      <ul class="matches-header">
        <li>Hero</li>
        <li>Matches</li>
        <li>Win %</li>
      </ul>
      <ul class="matches-data">
        <li v-for="(userHero, id) of userHeroes.slice(0, 10)" :key="id">
          <img :src="`${imgHeroUrl(parsedHeroes[userHero.hero_id].icon)}`">
          <p>{{ userHero.games }}</p>
          <p>{{ winrate(`${userHero.games}`,`${userHero.win}`) }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HeroesPlayed',
  data () {
    return {
      userHeroes: '',
      heroes: ''
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
    ...mapGetters({
      getUserHeroes: 'getUserHeroes',
      getHeroes: 'getHeroes'
    }),
    parsedHeroes () {
      let parsedObject = this.heroes
      let arrayToObj = (array, keyField) =>
        array.reduce((obj, item) => {
          obj[item[keyField]] = item
          return obj
        }, {})
      parsedObject = arrayToObj(parsedObject, 'id')
      return parsedObject
    }
  },
  watch: {
    getUserHeroes (val) {
      this.userHeroes = val
    },
    getHeroes (val) {
      this.heroes = val
    }
  }
}
</script>

<style lang="scss" scoped>
  .matches-header {
    display: flex;
  }
  .matches-data {
    li {
      display: flex;
    }
  }
</style>
