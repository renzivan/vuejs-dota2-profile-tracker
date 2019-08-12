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
        <!-- <li v-for="(friend, id) of friends.slice(0,6)" :key="id"> -->
        <li v-for="(friend, id) of limitFriends" :key="id">
          <img :src="`${ friend.avatar }`" >
          <p>{{ friend.personaname }}</p>
          <p>{{ convertTime(friend.last_played) }}</p>
          <p>{{ friend.games }}</p>
          <p>{{ winrate(friend.games, friend.win) }}</p>
        </li>
      </ul>
      <!-- <pre style="color: #fff;">{{ friends }}</pre> -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'Friends',
  props: {
    friends: Array
  },
  methods: {
    winrate (games, wins) {
      return ((wins / games) * 100).toFixed(2)
    },
    convertTime (lastPlayed) {
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var date = new Date(lastPlayed * 1000)
      // Hours part from the timestamp
      var hours = date.getHours()
      // Minutes part from the timestamp
      var minutes = '0' + date.getMinutes()
      // Seconds part from the timestamp
      var seconds = '0' + date.getSeconds()

      return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
    }
  },
  computed: {
    limitFriends () {
      return this.friends !== null ? this.friends.slice(0, 5) : ''
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
