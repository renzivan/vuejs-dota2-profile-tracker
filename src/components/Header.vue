<template>
  <div id="header">
    <b-container>
      <b-row>
        <b-col>
          <router-link to="/" id="logo"><h1 class="align-middle">DOTA<span>NERF</span></h1></router-link>
        </b-col>
        <b-col>
          <b-form-input id="searchInput" type="text" v-model="dotaId" @keyup.enter="submitDotaId" autofocus placeholder="Search player dota id..."/>
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
      dotaId: '' // rank 58 100594231  ... rank 8 91369376
    }
  },
  methods: {
    submitDotaId () {
      this.$store.dispatch('getUserData', this.dotaId)
      this.$store.dispatch('getHeroes')
      this.$router.push('/profile/' + this.dotaId)
    },
    sendRequest () {
      this.$store.dispatch('getUserData', this.$route.params.dotaId)
      this.$store.dispatch('getHeroes')
    }
  },
  beforeMount () {
    if (this.$route.params.dotaId > 0) {
      this.sendRequest()
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
</style>
