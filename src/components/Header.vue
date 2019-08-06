<template>
  <div id="header">
    <b-container>
      <b-row>
        <b-col>
          <h1>DOTA<span>NERF</span></h1>
        </b-col>
        <b-col>
        <b-form-input id="searchInput" type="text" v-model="dotaId" @keyup.enter="submitDotaId" autofocus placeholder="Search players, matches..." />
        <button @click="submitDotaId">Submit</button>
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
    }
  }
}
</script>

<style scoped>
  #header {
    height: 100px;
    background: rgba(0, 0, 0, .4);
  }
  h1 {
    font-size: 40px;
    font-weight: bold;
  }
  h1 span {
    font-weight: 100;
  }
  #searchInput {
    background: #3a5f67;
    border-radius: 0;
    border: 0;
    color: #ccc;
  }
</style>
