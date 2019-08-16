<template>
  <div id="viewHeroes">
    <b-container fluid id="main-container">
      <Header />
      <b-container id="content-container">
        <Profile
          :userData="getUserData"
          :winloss="getUserWL"
        />
        <Navigation />
        <div class="inner-container">
          <div class="inner-data-1">
            <HeroesPlayed
              :userHeroes="getUserHeroes"
              :heroes="getHeroes"
            />
          </div>
        </div>
      </b-container>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import Profile from '@/components/Profile'
import HeroesPlayed from '@/components/HeroesPlayed'

export default {
  name: 'ViewHeroes',
  data () {
    return {
      // profile component
      baseUrl: 'https://api.opendota.com/api',
      userData: {
        steamUrl: '',
        lastLogin: '',
        avatarUrl: '',
        personaName: '',
        rankTier: '',
        soloMmr: '',
        partyMmr: '',
        leaderboardRank: ''
      },
      winloss: '',
      // heroes component
      userHeroes: '',
      heroes: ''
    }
  },
  components: {
    Header,
    Profile,
    Navigation,
    HeroesPlayed
  },
  computed: {
    ...mapGetters({
      // profile component
      getUserData: 'getUserData',
      getUserWL: 'getUserWL',
      // heroes component
      getUserHeroes: 'getUserHeroes',
      getHeroes: 'getHeroes'
    })
  },
  watch: {
    getUserData (val) {
      this.userData.steamUrl = val.steamUrl
      this.userData.lastLogin = val.lastLogin
      this.userData.avatarUrl = val.avatarUrl
      this.userData.personaName = val.personaName
      this.userData.rankTier = val.rankTier
      this.userData.soloMmr = val.soloMmr
      this.userData.partyMmr = val.partyMmr
      this.userData.leaderboardRank = val.leaderboardRank
    },
    getUserWL (val) {
      this.winloss = val
    },
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
</style>
