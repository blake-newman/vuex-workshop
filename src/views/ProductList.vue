<template>
  <div class="product-list">
    <div class="filter">
      <select v-model="filter">
        <option value="all">All</option>
        <option value="discounted">Discounted</option>
        <option value="stocked">In stock</option>
      </select>
    </div>
    <ul class="list">
      <li v-for="product in products" :key="product.id" >
        <img :src="product.image" :alt="product.title" >
        <h2>{{ product.title }}</h2>
        <p class="description">{{ product.desc }}</p>
        <button v-if="product.stocked" @click="buy(product.id)">Buy now</button>
        <span v-if="!product.stocked" class="no-stock">Out of stock</span>
        <p class="price">
          {{ product.price | currency }}
          <span v-if="product.basePrice > product.price">{{ product.basePrice | currency }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
  import { getProducts } from '../api/product'
  import { addProductToBasket } from '../api/basket'

  export default {
    name: 'ProductListView',

    data () {
      return {
        data: [],
        filter: 'all'
      }
    },

    computed: {
      stockedProducts () {
        return this.data.filter(product => product.stocked)
      },

      discountedProducts () {
        return this.data.filter(product => product.price < product.basePrice)
      },
  
      products () {
        if (this.filter === 'all') return this.data
        return this[`${this.filter}Products`]
      }
    },

    methods: {
      buy (id) {
        addProductToBasket(id).then(({ data }) => {
          const products = data.payload.map(({ id, quantity }) => {
            const product = this.data.filter(product => product.id === id)[0]
            return Object.assign({ quantity }, product)
          })
          this.$emit('basket::update', { products, show: true })
        })
      }
    },

    mounted () {
      getProducts().then(({ data }) => {
        this.data = data.payload
      })
    }
  }
</script>


<style scoped>
  .filter {
    margin: 0 auto;
    padding: 30px 150px;
  }

  .filter >>> select {
    width: 100%;
  }

  .list {
    list-style:none;
    margin: 0 auto;
    text-align: center;
    padding: 0;
  }

  .list >>> li {
    box-sizing:border-box;
    display: inline-block;

    text-align:left;
    font:normal 12px sans-serif;

    background-color:#ffffff;
    border:1px solid #dbe3e7;
    border-radius: 3px;
    box-shadow: 1px 3px 1px rgba(0, 0, 0, 0.08);

    margin: 0 12px 14px 0;
    padding: 25px;
  }

  /* The product image */

  .list >>> img {
    display: block;
    text-align: center;
    box-shadow : 0 0 20px 8px #f3f3f3 inset;

    width: 275px;
    margin-bottom: 25px;
    box-sizing: border-box;
  }

  /* The product name */

  .list >>> h2 {
    display: block;
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
    max-width: 200px;
    margin:0;
  }

  /* Product description */

  .list >>> .description {
    margin-top: 20px;

    color: #5d5d5d;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;

    max-width: 260px;
    margin-bottom: 20px;
  }

  /* Price and order button */
  .list >>> .no-stock {
    color: #c15017;
    font-weight: bold;
    line-height: 32px;

    width: 95px;
    height: 32px;
  }

  .list >>> .price {
    float: right;

    color:  #4e4e4e;
    font-weight: bold;
    font-size: 20px;

    padding-top: 6px;
    margin: 0;
  }

  .list >>> .price span {
    font-size: 15px;
    text-decoration: line-through;
  }
</style>
