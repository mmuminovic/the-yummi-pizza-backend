const Product = require('../models/product')

exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body

    Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
    })
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.postEditProduct = (req, res, next) => {
    const { title, price, imageUrl, description } = req.body
    const { productId } = req.params
    Product.findByPk(productId)
        .then((product) => {
            product.title = title
            product.price = price
            product.imageUrl = imageUrl
            product.description = description
            return product.save()
        })
        .then((result) => {
            res.json(result)
        })
        .catch((err) => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
    const { productId } = req.params
    Product.findByPk(productId)
        .then((product) => {
            return product.destroy()
        })
        .then((result) => {
            res.json(result)
        })
        .catch((err) => console.log(err))
}
