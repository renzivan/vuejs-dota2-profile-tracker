<template>
  <div id="header">
    <h1>DOTA<span>NERF</span></h1>
    <input type="text" v-model="dotaId" @keyup.enter="submitDotaId" autofocus />
    <button @click="submitDotaId">Submit</button>
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
