<template>
  <div id="matches">
    <div style="overflow: auto">
      <h2>Matches:</h2>
      <ul style="display: flex">
        <li v-for="(match, id) of matches" :key="id">
          <p>{{ match }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import jsonGameMode from '@/json/gameModes.json'

export default {
  name: 'Matches',
  data () {
    return {
      matches: '',
      gameModes: jsonGameMode,
      heroes: ''
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
      getMatches: 'getMatches',
      getHeroes: 'getHeroes'
    }),
    parsedHeroes () {
      return this.objectParser(this.heroes)
    }
  },
  watch: {
    getMatches (val) {
      this.matches = val
    },
    getHeroes (val) {
      this.heroes = val
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
