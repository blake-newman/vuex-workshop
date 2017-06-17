const products = require('./_products')
let basket = [{ id: 46, quantity: 1 }, { id: 44, quantity: 4 }]

module.exports = function apiMiddleware(app) {
  // returning products
  app.get('/api/product/list', (req, res) => {
    res.json({ payload: products }).end()
  })

  // get single product by sku
  app.get('/api/product/:id', (req, res) => {
    const id = Number(req.params.id)
    const product = products.find(product => id === product.id)
    if (!product)
      return res
        .status(404)
        .json({ error: { message: 'Product not found' } })
        .end()
    return res.json({ payload: product }).end()
  })

  // get basket for session
  app.get('/api/basket', (req, res) => {
    if (basket.length > 10)
      return res
        .status(500)
        .json({ error: { message: 'Server error' } })
        .end()
    res.json({ payload: basket }).end()
  })

  // add product to basket
  app.post('/api/basket/product/:id', (req, res) => {
    const id = Number(req.params.id)
    const product = products.find(product => id === product.id)
    if (!product)
      return res
        .status(404)
        .json({ error: { message: 'Product not found' } })
        .end()
    if (!product.stocked)
      return res
        .status(409)
        .json({ error: { message: 'Product not in stock' } })
        .end()
    let quantity = Math.floor(Number(req.body.quantity) || 1)
    const index = basket.indexOf(item => item.id === id)
    if (index < 0) basket.push({ id: id, quantity: quantity })
    if (index >= 0) {
      quantity = (basket[index].quantity || 0) + quantity
      basket[index].quantity = quantity
    }
    res
      .status(201)
      .json({ payload: basket })
      .end()
  })

  // remove product from basket
  app.delete('/api/basket/product/:id', (req, res) => {
    const id = Number(req.params.id)
    const index = basket.indexOf(item => item.id === id)
    const product = products.find(product => id === product.id)
    if (!product || index === -1)
      return res
        .status(404)
        .json({ error: { message: 'Product not found' } })
        .end()
    basket.splice(index, 1)
    res.json({ payload: basket }).end()
  })

  // patch quantity of products in basket
  app.patch('/api/basket/product/:id', (req, res) => {
    const id = Number(req.params.id)
    const quantity = Math.floor(Number(req.body.quantity)) || 0
    const index = basket.indexOf(item => item.id === id)
    const product = products.find(product => id === product.id)
    if (!product)
      return res
        .status(404)
        .json({ error: { message: 'Product not found' } })
        .end()
    if (!product.stocked)
      return res
        .status(409)
        .json({ error: { message: 'Product not in stock' } })
        .end()

    if (index >= 0 && quantity) basket[index].quantity = quantity
    if (index === -1 && quantity) basket.push({ id: id, quantity: quantity })
    if (index >= 0) basket.splice(index, 1)

    return res.json({ payload: basket }).end()
  })

  // delete basket
  app.delete('/api/basket', (req, res) => {
    basket = []
    res.json({ payload: basket }).end()
  })

  app.all('/api/*', (req, res) =>
    res
      .status(404)
      .json({ error: { message: 'Not found' } })
      .end(),
  )
}
