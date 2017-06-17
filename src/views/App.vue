<template>
  <div id="app">
    <progress-bar></progress-bar>
    <header>
      <h1>Vuex Workshop</h1>
      <basket :products="basket.products" v-model="basket.show"></basket>
    </header>
    <main>
      <router-view v-if="loaded" @basket::update="basketUpdate" :basket="basket.products"></router-view>
    </main>
  </div>
</template>

<script>
  import { getBasket } from '../api/basket'
  import { getProductById } from '../api/product'
  import Basket from '../components/Basket.vue'
  import ProgressBar from '../components/Progress.vue'

  export default {
    name: 'App',

    components: {
      Basket,
      ProgressBar
    },

    data () {
      return {
        loaded: false,
        basket: {
          show: false,
          products: []
        }
      }
    },

    methods: {
      basketUpdate ({ products, show = false }) {
        this.basket.products = products
        this.basket.show = show
      }
    },

    mounted () {
      getBasket().then(({ data }) => {
        const ids = data.payload.map(({ id }) => id)
        Promise.all(ids.map(getProductById)).then((response) => {
          const products = response.map(item => {
            const { payload } = item.data
            const { quantity } = data.payload.filter(({ id }) => id === payload.id)[0]
            return Object.assign({ quantity }, payload)
          })
          this.basketUpdate({ products })
          this.loaded = true
        })
      })
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
