<template>
  <div id="profile">
    <div id="profile-wrap">
      <div class="left" v-if="user && user.profile && winloss">
        <b-img rounded :src="`${user.profile.avatarfull}`" id="profile-avatar"/>
        <div class="left-inner">
          <p class="profile-name">{{ user.profile.personaname }}</p>
          <a class="profile-steamurl" :href="`${user.profile.profileurl}`" target="_blank">Steam profile</a>
          <div class="mmr">
            <p class="profile-solo">Solo MMR<span>{{ user.solo_competitive_rank }}</span></p>
            <p class="profile-party">Party MMR<span>{{ user.competitive_rank }}</span></p>
          </div>
          <div class="wl">
            <p class="wl-win">Wins<span>{{ winloss.win }}</span></p>
            <p class="wl-loss">Losses<span>{{ winloss.lose }}</span></p>
            <p class="wl-rate">Winrate<span>{{ winrateCalc }}%</span></p>
          </div>
          <!-- <p class="profile-lastlogin">Last Login: {{ user.profile.last_login }}</p> -->
        </div>
      </div>
      <div class="right">
        <img v-if="splitRankTier[0] < 8 && user.rank_tier !== null" :src="imgTierUrl" class="stars">
        <img :src="imgRankUrl" class="medal">
        <p v-show="user.leaderboard_rank !== null" class="leaderboard">{{ user.leaderboard_rank }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Profile',
  props: {
    userData: Object,
    winloss: Object
  },
  computed: {
    user () {
      return { ...this.userData }
    },
    splitRankTier () {
      return (this.user.rank_tier / 10).toFixed(1).split('.')
    },
    imgRankUrl () {
      let medal = this.splitRankTier[0].toString()
      let imgRankSrc = require.context('../assets/images/rank_icons/', false, /\.png$/)
      if (this.user.leaderboard_rank > 10 && this.user.leaderboard_rank < 101) {
        medal = '8b'
      } else if (this.user.leaderboard_rank > 0 && this.user.leaderboard_rank < 11) {
        medal = '8c'
      }// eslint-disable-next-line
      return medal === undefined || medal === null || medal == 'NaN' ? false : imgRankSrc('./' + 'rank_icon_' + medal + '.png')
    },
    imgTierUrl () {
      let star = this.splitRankTier[1]
      let imgTierSrc = require.context('../assets/images/rank_icons/', false, /\.png$/)
      return star !== undefined ? imgTierSrc('./' + 'rank_star_' + star + '.png') : false
    },
    winrateCalc () {
      let totalMatches = this.winloss.win + this.winloss.lose
      let rate = ((this.winloss.win / totalMatches) * 100).toFixed(2)
      return totalMatches > 0 ? rate : ''
    }
  }
}
</script>

<style lang="scss" scoped>
#profile {
  background: #23393e;
  margin-top: 15px;
  padding: 35px;
  height: 220px;
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
        top: -45px;
        text-align: center;
        font-size: 24px;
      }
    }
  }
  .left-inner {
    line-height: 1;
    margin-left: 40px;
    display: grid;
    height: 150px;
    .profile-name {
      font-size: 28px;
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
    width: 150px;
    height: 150px;
  }
}

@media screen and (max-width: 767px) {
/* start of medium tablet styles */
  #profile {
    height: auto;
    padding-bottom: 0;
    #profile-wrap {
      display: block;
      .left {
        display: grid;
        .left-inner > * {
          margin: 0 auto;
        }
      }
      .right {
        text-align: center;
      }
      .profile-name {
        text-align: center;
      }
    }
    img,
    .left-inner {
      margin: auto;
    }
  }
}
</style>
