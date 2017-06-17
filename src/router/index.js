import Vue from 'vue'
import Router from 'vue-router'
import bus, {
  PROGRESS_START,
  PROGRESS_FINISH
} from '../utils/bus'

Vue.use(Router)

export default function createRouter () {
  const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        name: 'ProductList',
        path: '/',
        component: () => import(/* webpackChunkName: 'ProductList' */ '../views/ProductList.vue')
      },
      {
        name: 'Checkout',
        path: '/checkout',
        component: () => import(/* webpackChunkName: 'Checkout' */ '../views/Checkout.vue')
      }
    ]
  })

  router.beforeEach((to, from, next) => {
    setTimeout(() => bus.$emit(PROGRESS_START))
    next()
  })

  router.afterEach(() => {
    setTimeout(() => bus.$emit(PROGRESS_FINISH))
  })
  return router
}
