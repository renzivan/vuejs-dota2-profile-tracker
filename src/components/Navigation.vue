<template>
  <div id="nav">
    <b-nav>
      <b-nav-item><router-link to="/">Overview</router-link></b-nav-item>
      <b-nav-item><router-link to="/matches">Matches</router-link></b-nav-item>
      <b-nav-item>Heroes</b-nav-item>
      <b-nav-item>Friends</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style lang="scss" scoped>
  .nav {
    .nav-item {
      a {
        font-size: 18px;
        color: #fff;
        &:hover {
          color: #00ffd2;
          text-decoration: none;
        }
      }
    }
    .active {
      border-bottom: 3px solid #00ffd2;
    }
  }
</style>
