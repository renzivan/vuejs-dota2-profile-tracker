<template>
  <div id="viewFriends">
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
import Navigation from '@/components/Navigation'
import Profile from '@/components/Profile'
import Friends from '@/components/Friends'

export default {
  name: 'ViewFriends',
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
      // friends component
      friends: ''
    }
  },
  components: {
    Header,
    Profile,
    Navigation,
    Friends
  },
  computed: {
    ...mapGetters({
      // profile component
      getUserData: 'getUserData',
      getUserWL: 'getUserWL',
      // friends component
      getFriends: 'getFriends'
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
