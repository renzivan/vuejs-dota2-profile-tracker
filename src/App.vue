<template>
  <div id="app">
    <b-container fluid id="main-container">
      <Header />
      <b-container id="content-container">
        <Profile />
        <Friends />
        <RecentMatches />
        <Matches />
        <HeroesPlayed />
      </b-container>
    </b-container>
  </div>
</template>

<script>
import Header from './components/Header'
import Profile from './components/Profile'
import Friends from './components/Friends'
import RecentMatches from './components/RecentMatches'
import Matches from './components/Matches'
import HeroesPlayed from './components/HeroesPlayed'

export default {
  name: 'app',
  components: {
    Header,
    Profile,
    Friends,
    RecentMatches,
    Matches,
    HeroesPlayed
  }
}
</script>

<style lang="scss" scoped>
  #main-container {
    padding: 0px;
    #content-container {
      padding-top: 100px;
    }
  }
</style>
