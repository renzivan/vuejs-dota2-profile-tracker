<template>
  <div id="profile">
    <div id="profile-wrap">
      <div class="left">
        <b-img rounded :src="`${userData.avatarUrl}`" id="profile-avatar"/>
        <div class="left-inner">
          <p>{{ userData.personaName }}</p>
          <a :href="`${userData.steamUrl}`">Steam URL</a>
          <p>Wins: {{ winloss.win }} | Losses: {{ winloss.lose }} | Winrate: {{ winrateCalc }} </p>
          <p>Last Login: {{ userData.lastLogin }}</p>
          <p>Solo MMR: {{ userData.soloMmr }} Party MMR: {{ userData.partyMmr }}</p>
        </div>
      </div>
      <div class="right">
        <img v-show="splitRankTier[0] < 8" :src="imgTierUrl" class="stars">
        <img :src="imgRankUrl" class="medal">
        <p v-show="userData.leaderboardRank !== null" class="leaderboard">{{ userData.leaderboardRank }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  data () {
    return {
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
      winloss: ''
    }
  },
  computed: {
    ...mapGetters({
      getUserData: 'getUserData',
      getUserWL: 'getUserWL'
    }),
    splitRankTier () {
      return (this.userData.rankTier / 10).toFixed(1).split('.')
    },
    imgRankUrl () {
      let medal = this.splitRankTier[0].toString()
      let imgRankSrc = require.context('../assets/images/rank_icons/', false, /\.png$/)
      if (this.leaderboardRank > 10 && this.leaderboardRank < 101) {
        medal = '8b'
      } else if (this.leaderboardRank > 0 && this.leaderboardRank < 11) {
        medal = '8c'
      }
      return imgRankSrc('./' + 'rank_icon_' + medal + '.png')
    },
    imgTierUrl () {
      let star = this.splitRankTier[1]
      let imgTierSrc = require.context('../assets/images/rank_icons/', false, /\.png$/)
      return (star < 1 ? false : imgTierSrc('./' + 'rank_star_' + star + '.png'))
    },
    winrateCalc () {
      let totalMatches = this.wins + this.losses
      let rate = ((this.wins / totalMatches) * 100).toFixed(2)
      return totalMatches > 0 ? rate : ''
    }
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
    }
  }
}
</script>

<style lang="scss" scoped>
#profile {
  background: #23393e;
  margin-top: 15px;
  padding: 35px;
  height: 270px;
  #profile-wrap {
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
    }
    .right {
      .stars {
        position: absolute;
      }
      .leaderboard {
        position: relative;
        top: -52px;
        text-align: center;
        font-size: 24px;
      }
    }
  }
  img {
    width: 200px;
    height: 200px;
  }
}
</style>
