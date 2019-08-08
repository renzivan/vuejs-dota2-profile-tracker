<template>
  <div id="nav">
    <h1>Dota ID: {{ $route.params.dotaId }}</h1> <button @click="submitDotaId">refresh</button>
    <b-nav>
      <li class="nav-item"><router-link :to="`/profile/${$route.params.dotaId}`" @click.native="submitDotaId">Overview</router-link></li>
      <li class="nav-item"><router-link :to="`/matches/${$route.params.dotaId}`" @click.native="submitDotaId">Matches</router-link></li>
      <li class="nav-item"><router-link :to="`/heroes/${$route.params.dotaId}`" @click.native="submitDotaId">Heroes</router-link></li>
      <li class="nav-item"><router-link :to="`/friends/${$route.params.dotaId}`" @click.native="submitDotaId">Friends</router-link></li>
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
  .nav-item {
    padding: 5px 0;
    a {
      font-size: 18px;
      color: #fff;
      padding: 5px 1rem;
      padding-bottom: 7px;
      &:hover {
        color: #00ffd2;
        border-bottom: 3px solid #00ffd2;
        text-decoration: none;
      }
    }
    .router-link-active {
      color: #00ffd2;
      border-bottom: 3px solid #00ffd2;
    }
  }
</style>
