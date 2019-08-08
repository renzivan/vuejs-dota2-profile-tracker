<template>
  <div id="viewMatches">
    <b-container fluid id="main-container">
      <Header />
      <b-container id="content-container">
        <Profile />
        <Navigation />
        <b-row class="inner-container">
          <b-col><Matches /></b-col>
        </b-row>
      </b-container>
    </b-container>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import Profile from '@/components/Profile'
import Matches from '@/components/Matches'

export default {
  name: 'ViewMatches',
  components: {
    Header,
    Profile,
    Navigation,
    Matches
  }
}
</script>

<style lang="scss" scoped>
</style>
