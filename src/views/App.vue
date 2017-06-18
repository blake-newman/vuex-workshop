<template>
  <div id="app">
    <progress-bar></progress-bar>
    <header>
      <h1>Vuex Workshop</h1>
      <basket></basket>
    </header>
    <main>
      <router-view v-if="!error"></router-view>
      <Error v-if="error"></Error>
    </main>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Basket from '../components/Basket.vue'
  import ProgressBar from '../components/Progress.vue'

  export default {
    name: 'App',

    components: {
      Basket,
      ProgressBar,
      Error
    },
  
    computed: {
      ...mapState(['error'])
    }
  }
</script>

<style src="reset.css"></style>
<style src="normalize.css"></style>
<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    color: #34495e;
    background: #fff;
  }

  header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 67px;
    text-align: center;
    background-color: #cfebff;
  }

  h1 { 
    margin: 0;
    padding: 0.55em 0;
  }

  main {
    margin: 67px auto;
    padding-bottom: 140px;
    max-width: 1200px;
  }

  .button,
  button {
    display: inline-block;
    padding: 0.5em 2em;
    border: none;
    border-radius: 1px;
    background: #517cad;
    color: #fff;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    font-size: 100%;
  }

  .button:hover,
  button:hover {
    background: #426a98;
  }
</style>
