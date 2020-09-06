<template>
  <div id="viewMatches">
    <b-container fluid id="main-container">
      <Header />
      <div class="home-msg">
        <p>
          Example Dota ID: 131375636
        </p>
        <p>
          <a href="https://github.com/renzivan/vuejs-dota2-profile-tracker" target="_blank">
            Source Code Repository
          </a>
        </p>
      </div>
    </b-container>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'ViewMatches',
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>

</style>
