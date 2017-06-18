<template>
  <div id="app">
    <progress-bar></progress-bar>
    <header>
      <h1>Vuex Workshop</h1>
      <basket></basket>
    </header>
    <main>
      <router-view v-if="!error"></router-view>
      <Error v-if="error" :message="error.message" :status="error.status"></Error>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Basket from '../components/Basket.vue'
import ProgressBar from '../components/Progress.vue'
import Error from '../components/Error.vue'

export default {
  name: 'App',

  components: {
    Basket,
    ProgressBar,
    Error,
  },

  computed: {
    ...mapState('context', ['error']),
  },
}
</script>

<style src="reset.css">
</style>
<style src="normalize.css">
</style>
<style>
body {
  background: #fff;
  color: #34495e;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 67px;
  background-color: #cfebff;
  text-align: center;
}

h1 {
  padding: 0.55em 0;
  margin: 0;
}

main {
  max-width: 1200px;
  padding-bottom: 140px;
  margin: 67px auto;
}

.button,
button {
  display: inline-block;
  padding: 0.5em 2em;
  border: none;
  background: #517cad;
  border-radius: 1px;
  color: #fff;
  cursor: pointer;
  font-size: 100%;
  font-weight: 700;
  text-decoration: none;
}

.button:hover,
button:hover {
  background: #426a98;
}
</style>
