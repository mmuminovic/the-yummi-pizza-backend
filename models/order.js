const Sequelize = require('sequelize')

const sequelize = require('../database')

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    address: Sequelize.STRING,
    phoneNumber: Sequelize.STRING,
})

module.exports = Order
