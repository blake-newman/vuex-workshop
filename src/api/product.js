import { product } from './index'

export function getProducts () {
  return product.get('/list')
}

export function getProductById (id) {
  return product.get(`${id}`)
}
