<template>
  <div id="app">
    <h1>User Data</h1>
    <input type="text" v-model="dotaId" />
    <button @click="submitDotaId">Submit</button>
    <br>
    <div>
      <img :src="`${avatarUrl}`" >
      <h3>name: {{ personaName }}</h3>
      <p>rank_tier: {{ rankTier }}</p>
      <p>computed rank_tier: {{ splitRankTier }}</p>
      <img src="./assets/images/rank_icons/rank_icon_7.png">
      <img src="./assets/images/rank_icons/rank_star_7.png">
    </div>
    <pre> {{ userData.data }} </pre>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      baseUrl: 'https://api.opendota.com/api',
      dotaId: '131375636', // 131375636
      section: 'players',
      userData: {},
      avatarUrl: '',
      personaName: '',
      rankTier: ''
    }
  },
  methods: {
    submitDotaId () {
      try {
        axios.get(this.baseUrl + '/' + this.section + '/' + this.dotaId)
          .then(res => (
            this.userData = res,
            this.avatarUrl = res.data.profile.avatarfull,
            this.personaName = res.data.profile.personaname,
            this.rankTier = res.data.rank_tier
          ))
      } catch (e) {
        console.error(e)
      }
    }
  },
  computed: {
    splitRankTier () {
      return this.rankTier / 10
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app pre {
  text-align: left;
}
</style>
