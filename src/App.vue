<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss" scoped>
  #main-container {
    padding: 0px;
    #content-container {
      padding-top: 100px;
    }
  }
</style>
