<template>
  <div id="friends">
      <h2>Friends</h2>
    <div class="content-data" style="overflow: auto">
      <ul style="display: flex">
        <li v-for="(friend, id) of friends" :key="id">
          <p>{{ friend.personaname }}</p>
          <img :src="`${ friend.avatar }`" >
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

</style>
