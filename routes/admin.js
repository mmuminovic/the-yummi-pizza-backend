const express = require('express')

const adminController = require('../controllers/admin')

const router = express.Router()

router.post('/', adminController.postAddProduct)

router.patch('/:productId', adminController.postEditProduct)

router.delete('/:productId', adminController.postDeleteProduct)

module.exports = router
