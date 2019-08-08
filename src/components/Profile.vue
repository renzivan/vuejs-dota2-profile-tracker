<template>
  <div id="profile">
    <div id="profile-wrap">
      <div class="left">
        <b-img rounded :src="`${userData.avatarUrl}`" id="profile-avatar"/>
        <div class="left-inner">
          <p class="profile-name">{{ userData.personaName }}</p>
          <a class="profile-steamurl" :href="`${userData.steamUrl}`">Steam profile</a>
          <div class="mmr">
            <p class="profile-solo">Solo MMR<span>{{ userData.soloMmr }}</span></p>
            <p class="profile-party">Party MMR<span>{{ userData.partyMmr }}</span></p>
          </div>
          <div class="wl">
            <p class="wl-win">Wins<span>{{ winloss.win }}</span></p>
            <p class="wl-loss">Losses<span>{{ winloss.lose }}</span></p>
            <p class="wl-rate">Winrate<span>{{ winrateCalc }}%</span></p>
          </div>
          <!-- <p class="profile-lastlogin">Last Login: {{ userData.lastLogin }}</p> -->
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
      let totalMatches = this.winloss.win + this.winloss.lose
      let rate = ((this.winloss.win / totalMatches) * 100).toFixed(2)
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
  .left-inner {
    line-height: 1;
    margin-left: 40px;
    display: grid;
    .profile-name {
      font-size: 60px;
    }
    .profile-steamurl {
      background-image: url('../assets/images/steam.png');
      background-repeat: no-repeat;
      background-size: 18px;
      padding-left: 20px;
      font-size: 13px;
      text-transform: uppercase;
      color: #fff;
      margin-top: -5px;
      padding-top: 3px;
    }
    .mmr, .wl {
      display: flex;

      .profile-solo, .profile-party, .wl-win, .wl-loss, .wl-rate {
        font-size: 13px;
        text-transform: uppercase;
        display: grid;
        span {
          font-size: 22px;
          margin-top: -7px;
        }
      }
      .profile-party, .wl-loss, .wl-rate {
        margin-left: 20px;
      }
      .wl-win span {
        color: #50a654;
      }
      .wl-loss span {
        color: #e3323a;
      }
    }
  }
  img {
    width: 200px;
    height: 200px;
  }
}
</style>
