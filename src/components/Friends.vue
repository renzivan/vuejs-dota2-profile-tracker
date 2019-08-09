<template>
  <div id="friends">
      <h2>Recent Friends Played With</h2>
    <div class="content-data" style="overflow: auto">
      <ul class="friends-header">
        <li>Player</li>
        <li>Matches</li>
        <li>Win %</li>
      </ul>
      <ul class="friends-data">
        <li v-for="(friend, id) of friends.slice(0,6)" :key="id">
          <img :src="`${ friend.avatar }`" >
          <p>{{ friend.personaname }}</p>
          <p>last_played: {{ friend.last_played }}</p>
          <p>games: {{ friend.games }}</p>
          <p>wins: {{ friend.wins }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Friends',
  data () {
    return {
      friends: ''
    }
  },
  computed: {
    ...mapGetters({
      getFriends: 'getFriends'
    })
  },
  watch: {
    getFriends (val) {
      this.friends = val
    }
  }
}
</script>

<style lang="scss" scoped>
  .friends-header {
    display: flex;
  }
  .friends-data {
    li {
      display: flex;
    }
  }
</style>
