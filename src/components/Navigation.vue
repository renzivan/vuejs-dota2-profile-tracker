<template>
  <div id="nav">
    <b-nav>
      <li class="nav-item"><router-link :to="`/profile/${$route.params.dotaId}`">Overview</router-link></li>
      <li class="nav-item"><router-link :to="`/matches/${$route.params.dotaId}`">Matches</router-link></li>
      <li class="nav-item"><router-link :to="`/heroes/${$route.params.dotaId}`">Heroes</router-link></li>
      <li class="nav-item"><router-link :to="`/friends/${$route.params.dotaId}`">Friends</router-link></li>
    </b-nav>
  </div>
</template>

<script>

export default {
  name: 'Navigation',
  data () {
    return {
      dotaId: this.$route.params.dotaId
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav-item {
    padding: 5px 0;
    a {
      font-size: 18px;
      color: #fff;
      padding: 5px 1rem;
      padding-bottom: 7px;
      &:hover {
        color: #29af97;
        text-decoration: none;
      }
    }
    .router-link-active {
      color: #00ffd2;
      border-bottom: 3px solid #00ffd2;
    }
  }
</style>
