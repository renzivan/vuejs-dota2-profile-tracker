<template>
  <div id="home">
    <b-container fluid id="main-container">
      <Header />
      <b-container id="content-container">
        <Profile />
        <Navigation />
        <Friends />
        <RecentMatches />
        <Matches />
        <HeroesPlayed />
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
import Matches from '@/components/Matches'
import HeroesPlayed from '@/components/HeroesPlayed'

export default {
  name: 'app',
  components: {
    Header,
    Profile,
    Navigation,
    Friends,
    RecentMatches,
    Matches,
    HeroesPlayed
  }
}
</script>

<style lang="scss" scoped>
</style>
