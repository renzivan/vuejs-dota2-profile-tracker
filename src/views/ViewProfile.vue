<template>
  <div id="viewProfile">
    <b-container fluid id="main-container">
      <Header />
      <b-container id="content-container">
        <Profile />
        <Navigation />
        <b-row class="inner-container">
          <b-col cols="6"><RecentMatches /></b-col>
          <b-col cols="3"><HeroesPlayed /></b-col>
          <b-col cols="3"><Friends /></b-col>
        </b-row>
      </b-container>
    </b-container>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Profile from '@/components/Profile'
import Navigation from '@/components/Navigation'
import Friends from '@/components/Friends'
import RecentMatches from '@/components/RecentMatches'
import HeroesPlayed from '@/components/HeroesPlayed'

export default {
  name: 'ViewProfile',
  components: {
    Header,
    Profile,
    Navigation,
    Friends,
    RecentMatches,
    HeroesPlayed
  }
}
</script>

<style lang="scss" scoped>
</style>
