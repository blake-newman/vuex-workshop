import Vue from 'vue'
import Router from 'vue-router'
import bus, { PROGRESS_START, PROGRESS_FINISH } from '../utils/bus'

Vue.use(Router)

const ProductList = () => import(/* webpackChunkName: 'ProductList' */ '../views/ProductList.vue')
const Checkout = () => import(/* webpackChunkName: 'Checkout' */ '../views/Checkout.vue')

export function createRouter() {
  const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        name: 'ProductList',
        path: '/',
        component: ProductList,
      },
      {
        name: 'Checkout',
        path: '/checkout',
        component: Checkout,
      },
    ],
  })

  return router
}
