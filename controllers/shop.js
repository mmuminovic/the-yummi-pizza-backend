const Product = require('../models/product')
const Order = require('../models/order')
const OrderItem = require('../models/order-item')

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

exports.getOrders = (req, res, next) => {
    Order.findAll({
        include: [
            {
                model: Product,
                required: true,
            },
        ],
    })
        .then((result) => {
            console.log(result)
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
            res.json(err)
        })
}

exports.postOrder = (req, res, next) => {
    const { name, address, phoneNumber, products } = req.body
    Order.create({
        name,
        address,
        phoneNumber,
    })
        .then((order) => {
            const orderItems = products.map((product) => ({
                productId: product.id,
                orderId: order.id,
                quantity: product.quantity,
            }))
            return OrderItem.bulkCreate(orderItems, { returning: true })
        })
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        })
}
