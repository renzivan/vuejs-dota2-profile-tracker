<template>
  <div id="app">
   <Header />
   <Profile />
  </div>
</template>

<script>
import Header from './components/Header'
import Profile from './components/Profile'

export default {
  name: 'app',
  components: {
    Header,
    Profile
  }
}
</script>

<style scoped>
</style>
