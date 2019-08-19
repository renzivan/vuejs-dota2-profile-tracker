<template>
  <div id="header">
    <b-container>
      <b-row>
        <b-col>
          <router-link to="/" id="logo"><h1 class="align-middle">DOTA<span>NERF</span></h1></router-link>
        </b-col>
        <b-col id="search-wrap">
          <b-form-input id="searchInput" type="text" v-model="dotaId" @keyup.enter="submitDotaId" placeholder="Search by Dota id..." autocomplete="off"/>
          <button @click="submitDotaId"></button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      windowWidth: 0,
      dotaId: '' // rank 58 100594231  ... rank 8 91369376
    }
  },
  mounted () {
    // on resize
    window.addEventListener('resize', this.getWindowWidth)

    // init
    this.getWindowWidth()
  },
  methods: {
    getWindowWidth (event) {
      this.windowWidth = document.documentElement.clientWidth
    },
    submitDotaId () {
      if (this.windowWidth <= 479) {
        let searchbox = document.getElementById('search-wrap')
        let searchinput = document.getElementById('searchInput')
        if (searchbox.classList.contains('show-search-box')) {
          searchbox.classList.remove('show-search-box')
        } else {
          searchbox.classList.add('show-search-box')
          searchinput.focus()
        }
        if (this.dotaId.length > 0) {
          this.$store.dispatch('getUserData', this.dotaId)
          this.$store.dispatch('getHeroes')
          this.$router.push('/profile/' + this.dotaId)
          searchinput.value = ''
        }
      } else {
        this.$store.dispatch('getUserData', this.dotaId)
        this.$store.dispatch('getHeroes')
        this.$router.push('/profile/' + this.dotaId)
      }
    },
    sendReq () {
      this.$store.dispatch('getUserData', this.dotaId)
      this.$store.dispatch('getHeroes')
      this.$router.push('/profile/' + this.dotaId)
    }
  },
  beforeMount () {
    if (this.$route.params.dotaId > 0) {
      this.$store.dispatch('getUserData', this.$route.params.dotaId)
      this.$store.dispatch('getHeroes')
    }
  }
}
</script>

<style lang="scss" scoped>
  #header {
    height: 100px;
    /* background: rgba(0, 0, 0, .4); */
    z-index: 9999;
    background: #23393e;
    position: absolute;
    width: 100%;
    #logo {
      &:hover {
        text-decoration: none;
      }
    }
    h1 {
      font-size: 50px;
      font-weight: bold;
      color: #3b5f67;
      padding-top: 20px;
      span {
        font-weight: 100;
        color: #fff;
      }
    }
    #searchInput {
      background: #3a5f67;
      border-radius: 0;
      border: 0;
      color: #ccc;
      height: 50px;
      margin-top: 25px;
      padding-right: 60px;
    }
    button {
      background: #152225;
      background-image: url('../assets/images/search-white.png');
      background-repeat: no-repeat;
      background-size: 25px 25px;
      background-position: center;
      border: 0;
      width: 50px;
      height: 50px;
      margin-top: -50px;
      position: absolute;
      right: 15px;
    }
  }

@media screen and (max-width: 479px) {
/* start of phone styles */
  #header {
    h1 {
      padding-top: 24px;
      font-size: 40px;
    }
    button {
      margin-top: 25px;
    }
    #searchInput {
      display: none;
    }
    .show-search-box {
      position: absolute;
      #searchInput {
        display: inline;
      }
      button {
        // background-image: url('../assets/images/x-white.png');
        // background-size: 15px;
      }
    }
  }
}
</style>
