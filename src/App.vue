<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Places msg="Your Favorite Places"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import store from './store';
import Places from './components/Places.vue'

export default {
  name: 'app',
  components: {
    Places
  },
  created() {
    this.getCurrentLocation();
  },
  methods: {
    ...mapActions(['getCurrentLocation'])
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}
</style>
