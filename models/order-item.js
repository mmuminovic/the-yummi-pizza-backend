const Sequelize = require('sequelize')

const sequelize = require('../database')

const OrderItem = sequelize.define('orderItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    orderId: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        unique: false,
    },
    productId: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        unique: false,
    },
    quantity: { type: Sequelize.INTEGER, allowNull: false },
})

module.exports = OrderItem
