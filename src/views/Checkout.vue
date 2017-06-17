<template>
  <div class="checkout-view">
    <div class="labels">
      <span class="image">Image</span>
      <span class="details">Product</span>
      <span class="price">Price</span>
      <span class="quantity">Quantity</span>
      <span class="remove">Remove</span>
      <span class="total-price">Total</span>
    </div>

    <div class="product" v-for="product in basket">
      <div class="image">
        <img :src="product.image" :alt="product.title">
      </div>
      <div class="title">{{ product.title }}</div>
      <div class="price">{{ product.price | currency }}</div>
      <div class="quantity">
        <input type="number" :value="product.quantity" min="1" @input="modify(product.id, $event)">
      </div>
      <button class="remove" @click="remove(product.id)">Remove</button>
      <div class="total-price">{{ product.price * product.quantity | currency }}</div>
    </div>

    <ul class="totals">
      <li v-if="discount">
        <span>{{ subtotal | currency }}</span>
        <span>Subtotal:</span>
      </li>
      <li v-if="discount">
        <span>{{ discount | currency }}</span>
        <span>Discount:</span>
      </li>
      <li>
        <span>{{ total | currency }}</span>
        <span>Total:</span>
      </li>
    </ul>
        
    <button class="checkout" @click="purchase">Purchase</button>
    <router-link :to="{ name: 'ProductList' }" class="checkout" tag="button">Continue shopping</router-link>
  </div>
</template>

<script>
  import {
    removeProductFromBasket,
    updateProductInBasket,
    purchaseBasket
  } from '../api/basket'

  export default {
    name: 'CheckoutView',

    props: {
      basket: { type: Array, default: () => [] }
    },

    computed: {
      subtotal () {
        return this.basket
          .map(({ basePrice, quantity }) => basePrice * quantity)
          .reduce((baskePrice, price) => baskePrice + price, 0)
      },

      total () {
        return this.basket
          .map(({ price, quantity }) => price * quantity)
          .reduce((total, price) => total + price, 0)
      },

      discount () {
        return this.total - this.subtotal
      }
    },

    methods: {
      remove (id) {
        removeProductFromBasket(id).then(() => {
          const products = this.basket.filter(product => id !== product.id)
          this.$emit('basket::update', { products })
        })
      },

      modify (id, event) {
        const quantity = event.target.value
        if (quantity === '') return
        updateProductInBasket(id, { quantity }).then(() => {
          const products = this.basket.map(item => {
            if (item.id === id) item.quantity = quantity
            return item
          })
          this.$emit('basket::update', { products })
        })
      },

      purchase () {
        purchaseBasket().then(() => {
          this.$emit('basket::update', { products: [] })
        })
      }
    },

    watch: {
      basket (value, old) {
        if (!value.length && old.length) this.$router.replace({ name: 'ProductList' })
      }
    },

    beforeMount () {
      if (!this.basket.length) this.$router.replace({ name: 'ProductList' })
    }
  }
</script>

<style scoped>
  .checkout-view {
    padding-top: 40px
  }

  .labels span,
  .product > * {
    float: left;
  }
  
  .labels span:nth-child(1),
  .product > *:nth-child(1) {
    width: 20%;
  }
  
  .labels span:nth-child(2),
  .product > *:nth-child(2) {
    width: 36%;
  }
  
  .labels span:nth-child(3),
  .product > *:nth-child(3) {
    width: 12%;
  }
  
  .labels span:nth-child(4),
  .product > *:nth-child(4) {
    width: 10%;
  }
  
  .labels span:nth-child(5),
  .product > *:nth-child(5) {
    width: 10%;
  }
  
  .labels span:nth-child(6),
  .product > *:nth-child(6) {
    width: 12%;
    text-align: right;
  }

  .labels:after,
  .product:after,
  .product > .details:after {
    display: block;
    content: "";
    clear: both;
  }

  /* Column headers */
  .labels span {
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
  }

  /* Product entries */
  .product {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }

  .product >>> img {
    width: 150px;
  }

  .product >>> .quantity input {
    width: 70px;
  }

  /* Totals section */
  .totals li {
    float: right;
    width: 100%;
    margin-bottom: 10px;
  }

  .totals >>> li span:first-child {
    float: right;
    min-width: 160px;
    text-align: right;
  }

  .totals >>> li span:last-child {
    float: right;
    text-align: right;
  }

  .checkout {
    float: right;
    border: 0;
    margin-top: 20px;
    margin-left: 10px;
    padding: 6px 25px;
  }
</style>
