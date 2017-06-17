import { basket } from './index'

export function getBasket() {
  return basket.get('')
}

export function purchaseBasket() {
  return basket.delete('')
}

export function addProductToBasket(id, quantity) {
  return basket.post(`product/${id}`, { quantity })
}

export function updateProductInBasket(id, quantity) {
  return basket.patch(`product/${id}`, { quantity })
}

export function removeProductFromBasket(id) {
  return basket.delete(`product/${id}`)
}
