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

    <div class="product" v-for="product in basket" :key="product.id">
      <div class="image">
        <img :src="product.image" :alt="product.title">
      </div>
      <div class="title">{{ product.title }}</div>
      <div class="price">{{ product.price | currency }}</div>
      <div class="quantity">
        <input
          type="number"
          :value="product.quantity"
          min="1"
          @input="updateQuantity({ id: product.id, quantity: $event.target.value })">
      </div>
      <button class="remove" @click="removeProduct(product)">Remove</button>
      <div class="total-price">{{ productTotal(product.id) | currency }}</div>
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CheckoutView',

  fetch: ({ dispatch }) => dispatch('basket/get'),

  computed: {
    ...mapGetters('basket', { basket: 'list' }),
    ...mapGetters('basket', ['productTotal', 'subtotal', 'discount', 'total']),
  },

  watch: {
    basket(value, old) {
      if (!value.length && old.length) this.$router.replace({ name: 'ProductList' })
    },
  },

  beforeMount() {
    if (!this.basket.length) this.$router.replace({ name: 'ProductList' })
  },

  methods: {
    ...mapActions('basket', ['purchase', 'updateQuantity', 'removeProduct']),
  },
}
</script>

<style scoped>
.checkout-view {
  padding-top: 40px;
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

.labels::after,
.product::after,
.product > .details::after {
  display: block;
  clear: both;
  content: '';
}

/* Column headers */
.labels span {
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 15px;
}

/* Product entries */
.product {
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.product >>> img {
  width: 150px;
}

.product >>> .quantity input {
  width: 70px;
}

/* Totals section */
.totals li {
  width: 100%;
  margin-bottom: 10px;
  float: right;
}

.totals >>> li span:first-child {
  min-width: 160px;
  float: right;
  text-align: right;
}

.totals >>> li span:last-child {
  float: right;
  text-align: right;
}

.checkout {
  padding: 6px 25px;
  border: 0;
  margin-top: 20px;
  margin-left: 10px;
  float: right;
}
</style>
