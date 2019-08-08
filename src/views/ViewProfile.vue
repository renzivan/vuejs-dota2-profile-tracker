<template>
  <div id="viewProfile">
    <b-container fluid id="main-container">
      <Header />
      <b-container id="content-container">
        <Profile />
        <Navigation />
        <RecentMatches />
        <HeroesPlayed />
        <Friends />
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
