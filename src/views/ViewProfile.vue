<template>
  <div id="viewProfile">
    <b-container fluid id="main-container">
      <Header />
      <b-container id="content-container">
        <Profile />
        <Navigation />
        <div class="inner-container">
          <div class="inner-data-1">
            <RecentMatches />
          </div>
          <div class="inner-data-2">
            <HeroesPlayed />
            <Friends :friends="getFriends"/>
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
      friends: ''
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
      getFriends: 'getFriends'
    })
  },
  watch: {
    getFriends (val) {
      this.friends = val
    }
  }
}
</script>

<style lang="scss" scoped>
  .inner-container {
    display: flex;
    .inner-data-1, .inner-data-2 {
      width: 100%;
    }
    .inner-data-2 {
      display: grid;
      overflow: hidden;
    }
  }
</style>
