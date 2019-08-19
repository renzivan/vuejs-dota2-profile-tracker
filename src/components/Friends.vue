<template>
  <div id="friends">
    <h2>Friends</h2>
    <div class="content-data" style="overflow: auto" v-if="Array.isArray(limitFriends)">
      <b-table :fields="fields" :items="limitFriends" class="heroesPlayed-table">
        <template slot="player" slot-scope="data">
          <img :src="`${ data.item.avatar }`" >
          <span>{{ data.item.personaname }}</span>
        </template>
        <template slot="matches" slot-scope="data">
          {{ data.item.games }}
        </template>
        <template slot="winrate" slot-scope="data">
          {{ winrate(data.item.games, data.item.win) }}
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Friends',
  props: {
    friends: Array
  },
  data () {
    return {
      fields: [
        { key: 'player', label: 'Player', thClass: 'header', tdClass: 'friends-data data' },
        { key: 'matches', label: 'Matches', thClass: 'header', tdClass: 'data' },
        { key: 'winrate', label: 'Win %', thClass: 'header', tdClass: 'data' }
      ]
    }
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
      return this.friends !== null ? this.friends.slice(0, 8) : ''
    }
  }
}
</script>

<style lang="scss" scoped>
  @media screen and (max-width: 520px) {
    img {
      display: block;
    }
  }
</style>
