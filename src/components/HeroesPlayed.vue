<template>
  <div id="heroesPlayed">
    <div style="overflow: auto">
      <h2>Heroes Played:</h2>
      <ul style="display: flex">
        <li v-for="(userHero, id) of userHeroes" :key="id">
          <p>{{ userHero }}</p>
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
      userHeroes: ''
    }
  },
  computed: {
    ...mapGetters({
      getUserHeroes: 'getUserHeroes'
    })
  },
  watch: {
    getUserHeroes (val) {
      this.userHeroes = val
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
