<template>
  <div id="viewHeroes">
    <b-container fluid id="main-container">
      <Header />
      <b-container id="content-container">
        <Profile />
        <Navigation />
        <HeroesPlayed />
      </b-container>
    </b-container>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import Profile from '@/components/Profile'
import HeroesPlayed from '@/components/HeroesPlayed'

export default {
  name: 'ViewHeroes',
  components: {
    Header,
    Profile,
    Navigation,
    HeroesPlayed
  }
}
</script>

<style lang="scss" scoped>

</style>
