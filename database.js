require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    'dcmi9rvni02bxqhf',
    'jqmkriuz0w29vqd9',
    'ogvw0c5d25y1pdmg',
    {
        dialect: 'mysql',
        host: 'eporqep6b4b8ql12.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
        logging: false,
    }
)

module.exports = sequelize
