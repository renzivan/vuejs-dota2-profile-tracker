<template>
  <div id="app">
   <Header />
   <!-- <Profile /> -->
   <ProfileVuex />
  </div>
</template>

<script>
import Header from './components/Header'
// import Profile from './components/Profile'
import ProfileVuex from './components/ProfileVuex'

export default {
  name: 'app',
  components: {
    Header,
    // Profile,
    ProfileVuex
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app pre {
  text-align: left;
}
</style>
