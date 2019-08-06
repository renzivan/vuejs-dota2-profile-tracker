<template>
    <b-container fluid id="main-container">
        <Header />
      <b-container>
        <Profile />
      </b-container>
    </b-container>
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
  #main-container {
    padding: 0px;
  }
</style>
