const Product = require('../models/product')
const Order = require('../models/order')

exports.getAllProducts = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            res.json(products)
        })
        .catch((err) => console.log(err))
}

exports.getProduct = (req, res, next) => {
    const { productId } = req.params
    Product.findByPk(productId)
        .then((product) => {
            res.json(product)
        })
        .catch((err) => console.log(err))
}

exports.postCart = (req, res, next) => {
    const { productId } = req.body
    let fetchedCart
    let newQuantity = 1
    req.user
        .getCart()
        .then((cart) => {
            fetchedCart = cart
            return cart.getProducts({ where: { id: productId } })
        })
        .then((products) => {
            let product
            if (products.length > 0) {
                product = products[0]
            }

            if (product) {
                const oldQuantity = product.cartItem.quantity
                newQuantity = oldQuantity + 1
                return product
            }
            return Product.findByPk(productId)
        })
        .then((product) => {
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity },
            })
        })
        .then((result) => {
            res.json(result)
        })
        .catch((err) => console.log(err))
}

exports.postCartDeleteProduct = (req, res, next) => {
    const { productId } = req.body
    req.user
        .getCart()
        .then((cart) => {
            return cart.getProducts({ where: { id: productId } })
        })
        .then((products) => {
            const product = products[0]
            return product.cartItem.destroy()
        })
        .then((result) => {
            res.json(result)
        })
        .catch((err) => console.log(err))
}

exports.postOrder = (req, res, next) => {
    let fetchedCart
    req.user
        .getCart()
        .then((cart) => {
            fetchedCart = cart
            return cart.getProducts()
        })
        .then((products) => {
            return req.user
                .createOrder()
                .then((order) => {
                    return order.addProducts(
                        products.map((product) => {
                            product.orderItem = {
                                quantity: product.cartItem.quantity,
                            }
                            return product
                        })
                    )
                })
                .catch((err) => console.log(err))
        })
        .then((result) => {
            return fetchedCart.setProducts(null)
        })
        .then((result) => {
            res.json(result)
        })
        .catch((err) => console.log(err))
}