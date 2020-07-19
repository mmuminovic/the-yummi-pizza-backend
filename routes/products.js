const express = require('express')
const { body } = require('express-validator')
const {
    postEditProduct,
    postAddProduct,
    postDeleteProduct,
} = require('../controllers/products')
const isAuth = require('../middlewares/isAuth')

const router = express.Router()

router.post(
    '/create',
    isAuth,
    [
        body('title').isString().notEmpty().withMessage('Enter product title'),
        body('description')
            .isString()
            .notEmpty()
            .withMessage('Enter product description'),
        body('price').isNumeric().notEmpty().withMessage('Enter product price'),
        body('products').isArray().notEmpty(),
        body('imageUrl').isURL().notEmpty().withMessage('Enter valid url'),
    ],
    postAddProduct
)

router.patch(
    '/:productId',
    isAuth,
    [
        body('title').isString().notEmpty().withMessage('Enter product title'),
        body('description')
            .isString()
            .notEmpty()
            .withMessage('Enter product description'),
        body('price').isNumeric().notEmpty().withMessage('Enter product price'),
        body('products').isArray().notEmpty(),
        body('imageUrl').isURL().notEmpty().withMessage('Enter valid url'),
    ],
    postEditProduct
)

router.delete('/:productId', isAuth, postDeleteProduct)

module.exports = router
