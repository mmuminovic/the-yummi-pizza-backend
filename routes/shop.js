const path = require('path')

const express = require('express')

const shopController = require('../controllers/shop')

const router = express.Router()

router.get('/', shopController.getAllProducts)

router.get('/:productId', shopController.getProduct)

router.post('/cart', shopController.postCart)

router.patch('/cart/remove', shopController.postCartDeleteProduct)

router.post('/order', shopController.postOrder)

module.exports = router
