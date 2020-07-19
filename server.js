const express = require('express')
const bodyParser = require('body-parser')

const sequelize = require('./database')
const Product = require('./models/product')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

const shopRoutes = require('./routes/shop')
const adminRoutes = require('./routes/products')
const userRoutes = require('./routes/user')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/v1/products', adminRoutes)
app.use('/v1/shop', shopRoutes)
app.use('/v1/auth', userRoutes)

Order.belongsToMany(Product, { through: { model: OrderItem, unique: false } })

sequelize
    .sync()
    .then(() => {
        app.listen(5000)
    })
    .catch((err) => {
        console.log(err)
    })
