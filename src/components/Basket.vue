<template>
  <div class="basket" :class="{ active }">
    <a class="toggle" @click="toggle">
      <span class="text">
        <svg class="icon" width="30px" height="30px" viewBox="0 0 35 35">
          <path fill="#fff" d="M33.623,8.004c-0.185-0.268-0.486-0.434-0.812-0.447L12.573,6.685c-0.581-0.025-1.066,0.423-1.091,1.001 c-0.025,0.578,0.423,1.065,1.001,1.091L31.35,9.589l-3.709,11.575H11.131L8.149,4.924c-0.065-0.355-0.31-0.652-0.646-0.785 L2.618,2.22C2.079,2.01,1.472,2.274,1.26,2.812s0.053,1.146 0.591,1.357l4.343,1.706L9.23,22.4c0.092,0.497,0.524,0.857,1.03,0.857 h0.504l-1.15,3.193c-0.096,0.268-0.057,0.565,0.108,0.798c0.163,0.232,0.429,0.37,0.713,0.37h0.807 c-0.5,0.556-0.807,1.288-0.807,2.093c0,1.732,1.409,3.141,3.14,3.141c1.732,0,3.141-1.408,3.141-3.141c0-0.805-0.307-1.537-0.807-2.093h6.847c-0.5,0.556-0.806,1.288-0.806,2.093c0,1.732,1.407,3.141,3.14,3.141 c1.731,0,3.14-1.408,3.14-3.141c0-0.805-0.307-1.537-0.806-2.093h0.98c0.482,0,0.872-0.391,0.872-0.872s-0.39-0.873-0.872-0.873 H11.675l0.942-2.617h15.786c0.455,0,0.857-0.294,0.996-0.727l4.362-13.608C33.862,8.612,33.811,8.272,33.623,8.004z M13.574,31.108c-0.769,0-1.395-0.626-1.395-1.396s0.626-1.396,1.395-1.396c0.77,0,1.396,0.626,1.396,1.396S14.344,31.108,13.574,31.108z M25.089,31.108c-0.771,0-1.396 0.626-1.396-1.396s0.626-1.396,1.396-1.396c0.77,0,1.396,0.626,1.396,1.396 S25.858,31.108,25.089,31.108z"/>
        </svg>
      </span>
    </a>
    <div class="order">
      <div class="order-inner">
        <table v-if="products.length" class="summary">
          <thead>
            <tr>
              <th>Your Order</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody name="table-row" is="transition-group">
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.title }}<span> x{{ product.quantity }}</span></td>
              <td>{{ product.price  * product.quantity | currency }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="2">Total <span class="total">{{ total | currency }}</span></th>
            </tr>
          </tfoot>
        </table>
        <p v-else class="empty">No items in basket</p>
        <button class="button cancel" :class="{ small: products.length }" @click="back">Continue Shopping</button>
        <button v-if="products.length" @click="go" class="button checkout">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Basket',

    model: {
      prop: 'show',
      event: 'toggle'
    },

    props: {
      products: { type: Array, default: () => [] },
      show: { type: Boolean, default: false }
    },

    data () {
      return {
        active: this.show
      }
    },

    computed: {
      total () {
        return this.products
          .map(item => item.price * item.quantity)
          .reduce((total, price) => total + price, 0)
      }
    },

    methods: {
      toggle () {
        this.active = !this.active
      },

      back () {
        this.toggle()
        this.$router.push({ name: 'ProductList' })
      },

      go () {
        this.toggle()
        this.$router.push({ name: 'Checkout' })
      }
    },

    watch: {
      show (value) {
        this.active = value
      },

      active (value) {
        this.$emit('toggle', value)
      }
    }
  }
</script>

<style scoped>
  .basket {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    display: block;
    width: 67px;
    height: 67px;
    text-align: center;
  }

  .basket >>> .toggle {
    position: relative;
    z-index: 10;
    display: block;
    overflow: hidden;
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: transform 0.6s cubic-bezier(0.2, 1, 0.3, 1);
    backface-visibility: hidden;
  }

  .basket.active >>> .toggle {
    cursor: default;
    transform: translate3d(-490%, 0, 0);
  }

  .basket >>> .toggle:focus {
    outline: none;
  }

  .basket >>> .text {
    display: block;
    padding: 0.8em 0 0;
    color: #fff;
    font-weight: 400;
    font-size: 1.25em;
  }

  .basket >>> .icon {
    display: block;
    margin: 0 auto;
  }

  .basket >>> .order {
    position: absolute;
    top: 0;
    right: 0;
    overflow: hidden;
    max-width: 100vw;
    width: 400px;
    text-align: right;
  }

  .basket >>> .order::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #96bbe5;
    transform: translate3d(100%, -100%, 0) translate3d(-67px, 67px, 0);
    transition: transform 0.6s cubic-bezier(0.2, 1, 0.3, 1);
  }

  .basket.active >>> .order::before {
    transform: translate3d(0, 0, 0);
    transition-delay: 0s;
  }

  .basket >>> .order-inner {
    position: relative;
    padding: 2em 1.9em;
    opacity: 0;
  }

  .basket.active >>> .order-inner {
    opacity: 1;
    transition: opacity 0.6s cubic-bezier(0.2, 1, 0.3, 1);
  }

  .basket >>> .summary {
    margin: 2.5em 0 0.75em;
    width: 100%;
    color: #fff;
    text-align: left;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.85em;
    line-height: 1.5;
  }

  .basket >>> .summary tr {
    transform: translate3d(250px, 0, 0);
  }

  .basket.active >>> .summary tr {
    transform: translate3d(0, 0, 0);
    transition: transform 0.6s cubic-bezier(0.2, 1, 0.3, 1);
  }

  .basket.active >>> .summary tbody tr {
    transition-delay: 0.075s;
  }

  .table-row-enter-active {
    transition: all .3s ease;
  }
  .table-row-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .table-row-enter, .table-row-leave-to, .table-row-leave-active {
    transform: translateX(10px);
    opacity: 0;
  }

  .basket >>> .empty {
    font-size: 1.5em;
    color: #fff;
    padding: 60px 0 40px;
    text-align: center;
  }

  .basket.active >>> .summary tfoot tr {
    transition-delay: 0.105s;
  }

  .basket >>> .summary thead th,
  .basket >>> .summary tfoot th {
    color: #517cad;
    line-height: 2.5;
  }

  .basket >>> .total {
    color: #fff;
  }

  .basket >>> .summary tbody tr:first-child td {
    padding-top: 0.5em;
  }

  .basket >>> .summary tbody td {
    padding: 0.25em 0;
    font-weight: 700;
    font-size: 0.85em;
  }

  .basket >>> .summary tbody td:last-child,

  .basket >>> .summary tbody td span {
    color: #cfe6ff;
  }

  .basket >>> .summary th:last-child,
  .basket >>> .summary td:last-child {
    text-align: right;
  }

  .basket >>> .button {
    opacity: 0;
    transform: translate3d(50px, 0, 0);
  }

  .basket >>> .button.cancel:not(.small) {
    width: 100%;
  }

  .basket >>> .button.small {
    background: none;
    color: #517cad;
    font-weight: 500;
    font-size: 0.75em;
  }

  .basket >>> .button.small:hover {
    background: none;
    color: #426a98;
  }

  .basket >>> .button:focus {
    outline: none;
  }

  .basket.active >>> .button {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: transform 0.6s cubic-bezier(0.2, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.2, 1, 0.3, 1);
    transition-delay: 0.18s;
  }
</style>
