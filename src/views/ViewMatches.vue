<template>
  <div id="viewMatches">
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
            <Matches
              :matches="getMatches"
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
import Matches from '@/components/Matches'

export default {
  name: 'ViewMatches',
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
      // matches component
      matches: '',
      heroes: ''
    }
  },
  components: {
    Header,
    Profile,
    Navigation,
    Matches
  },
  computed: {
    ...mapGetters({
      // profile component
      getUserData: 'getUserData',
      getUserWL: 'getUserWL',
      getMatches: 'getMatches',
      getHeroes: 'getHeroes'
    })
  },
  watch: {
    getUserData (val) {
      this.userData = val
    },
    getUserWL (val) {
      this.winloss = val
    },
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
