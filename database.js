require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize('pizzadelivery', 'muhamed', 'muhamed123', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false,
})

module.exports = sequelize
