<template>
  <div id="nav">
    <h1>Dota ID: {{ $route.params.dotaId }}</h1> <button @click="submitDotaId">refresh</button>
    <b-nav>
      <b-nav-item><router-link :to="`/profile/${$route.params.dotaId}`" @click.native="submitDotaId">Profile</router-link></b-nav-item>
      <b-nav-item><router-link :to="`/matches/${$route.params.dotaId}`" @click.native="submitDotaId">Matches</router-link></b-nav-item>
      <b-nav-item><router-link :to="`/heroes/${$route.params.dotaId}`" @click.native="submitDotaId">Heroes</router-link></b-nav-item>
      <b-nav-item><router-link :to="`/friends/${$route.params.dotaId}`" @click.native="submitDotaId">Friends</router-link></b-nav-item>
    </b-nav>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'Navigation',
  data () {
    return {
      dotaId: this.$route.params.dotaId
    }
  },
  methods: {
    submitDotaId () {
      this.$store.dispatch('getUserData', this.dotaId)
      this.$store.dispatch('getHeroes')
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav {
    .nav-item {
      a {
        font-size: 18px;
        color: #fff;
        &:hover {
          color: #00ffd2;
          text-decoration: none;
        }
      }
    }
    .active {
      border-bottom: 3px solid #00ffd2;
    }
  }
</style>
