<template>
  <div class="product-list">
    <div class="filter">
      <select v-model="filter">
        <option value="all">All</option>
        <option value="discounted">Discounted</option>
        <option value="stocked">In stock</option>
      </select>
    </div>
    <ul class="list" v-if="products.length">
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

  data() {
    return {
      data: [],
      filter: 'all',
    }
  },

  computed: {
    productsStocked() {
      return this.data.filter(({ stocked }) => !!stocked)
    },

    productsDiscounted() {
      return this.data.filter(({ price, basePrice }) => price < basePrice)
    },

    products() {
      if (this.filter === 'stocked') return this.productsStocked
      if (this.filter === 'discounted') return this.productsDiscounted
      return this.data
    },
  },

  mounted() {
    getProducts().then(response => {
      const { payload } = response.data
      this.data = payload
    })
  },

  methods: {
    buy(id) {
      addProductToBasket(id).then(response => {
        const { payload } = response.data
        const products = response.data.payload.map(({ id, quantity }) => {
          const product = this.data.find(product => product.id === id)
          return { ...product, quantity }
        })
        this.$emit('basket::update', { products, show: true })
      })
    },
  },
}
</script>


<style scoped>
.filter {
  padding: 30px 150px;
  margin: 0 auto;
}

.filter >>> select {
  width: 100%;
}

.list {
  padding: 0;
  margin: 0 auto;
  list-style: none;
  text-align: center;
}

.list >>> li {
  display: inline-block;
  box-sizing: border-box;
  padding: 25px;
  border: 1px solid #dbe3e7;

  margin: 0 12px 14px 0;

  background-color: #fff;
  border-radius: 3px;
  box-shadow: 1px 3px 1px rgba(0, 0, 0, 0.08);
  font: normal 12px sans-serif;

  text-align: left;
}

/* The product image */

.list >>> img {
  display: block;

  width: 275px;
  box-sizing: border-box;
  margin-bottom: 25px;
  box-shadow: 0 0 20px 8px #f3f3f3 inset;
  text-align: center;
}

/* The product name */

.list >>> h2 {
  display: block;
  overflow: hidden;
  max-width: 200px;
  margin: 0;
  font-size: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Product description */

.list >>> .description {
  overflow: hidden;

  max-width: 260px;
  margin-top: 20px;
  margin-bottom: 20px;

  color: #5d5d5d;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Price and order button */
.list >>> .no-stock {
  width: 95px;
  height: 32px;
  color: #c15017;
  font-weight: bold;
  line-height: 32px;
}

.list >>> .price {
  padding-top: 6px;
  margin: 0;

  color: #4e4e4e;
  float: right;
  font-size: 20px;
  font-weight: bold;
}

.list >>> .price span {
  font-size: 15px;
  text-decoration: line-through;
}
</style>
