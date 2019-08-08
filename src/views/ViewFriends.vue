<template>
  <div id="viewFriends">
    <b-container fluid id="main-container">
      <Header />
      <b-container id="content-container">
        <Profile />
        <Navigation />
        <b-row class="inner-container">
          <b-col><Friends /></b-col>
        </b-row>
      </b-container>
    </b-container>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import Profile from '@/components/Profile'
import Friends from '@/components/Friends'

export default {
  name: 'ViewFriends',
  components: {
    Header,
    Profile,
    Navigation,
    Friends
  }
}
</script>

<style lang="scss" scoped>
</style>
