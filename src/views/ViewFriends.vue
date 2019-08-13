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
        <b-row class="inner-container">
          <b-col>
            <Friends
              :friends="getFriends"
            />
          </b-col>
        </b-row>
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
      this.userData.steamUrl = val.steamUrl
      this.userData.lastLogin = val.lastLogin
      this.userData.avatarUrl = val.avatarUrl
      this.userData.personaName = val.personaName
      this.userData.rankTier = val.rankTier
      this.userData.soloMmr = val.soloMmr
      this.userData.partyMmr = val.partyMmr
      this.userData.leaderboardRank = val.leaderboardRank
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
