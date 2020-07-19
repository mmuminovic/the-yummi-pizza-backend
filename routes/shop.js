const express = require('express')
const { body } = require('express-validator')
const {
    getAllProducts,
    getOrders,
    getProduct,
    postOrder,
} = require('../controllers/shop')

const router = express.Router()

router.get('/products', getAllProducts)

router.get('/orders', getOrders)

router.get('/:productId', getProduct)

router.post(
    '/orders',
    [
        body('name').isString().notEmpty().withMessage('Enter your name'),
        body('address').isString().notEmpty().withMessage('Enter your address'),
        body('phoneNumber')
            .isString()
            .notEmpty()
            .withMessage('Enter your phone number'),
        body('products').isArray().notEmpty(),
    ],
    postOrder
)

module.exports = router
