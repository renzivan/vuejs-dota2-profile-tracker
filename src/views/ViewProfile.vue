<template>
  <div id="viewProfile">
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
            <RecentMatches
              :recentMatches="getRecentMatches"
              :heroes="getHeroes"
            />
          </div>
          <div class="inner-data-2">
            <HeroesPlayed
              :userHeroes="getUserHeroes"
              :heroes="getHeroes"
            />
            <Friends
              :friends="getFriends"
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
import Profile from '@/components/Profile'
import Navigation from '@/components/Navigation'
import Friends from '@/components/Friends'
import RecentMatches from '@/components/RecentMatches'
import HeroesPlayed from '@/components/HeroesPlayed'

export default {
  name: 'ViewProfile',
  data () {
    return {
      // profile component
      baseUrl: 'https://api.opendota.com/api',
      userData: '',
      winloss: '',
      // friends component
      friends: '',
      // heroes component
      userHeroes: '',
      heroes: '',
      // recentMatches component
      recentMatches: ''
    }
  },
  components: {
    Header,
    Profile,
    Navigation,
    Friends,
    RecentMatches,
    HeroesPlayed
  },
  computed: {
    ...mapGetters({
      // profile component
      getUserData: 'getUserData',
      getUserWL: 'getUserWL',
      // friends component
      getFriends: 'getFriends',
      // heroes component
      getUserHeroes: 'getUserHeroes',
      getHeroes: 'getHeroes',
      // recentMatches component
      getRecentMatches: 'getRecentMatches'
    })
  },
  watch: {
    getUserData (val) {
      this.userData = val
    },
    getUserWL (val) {
      this.winloss = val
    },
    getFriends (val) {
      this.friends = val
    },
    getUserHeroes (val) {
      this.userHeroes = val
    },
    getHeroes (val) {
      this.heroes = val
    },
    getRecentMatches (val) {
      this.recentMatches = val
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
