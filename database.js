require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize('sql7356161', 'sql7356161', 'kMFTc4dlZD', {
    dialect: 'mysql',
    host: 'sql7.freemysqlhosting.net',
    logging: false,
})

module.exports = sequelize
