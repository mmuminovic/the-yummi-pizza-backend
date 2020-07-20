const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const sequelize = require('./database')
const Product = require('./models/product')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

const shopRoutes = require('./routes/shop')
const adminRoutes = require('./routes/products')
const userRoutes = require('./routes/user')

const error404 = require('./controllers/error')

const app = express()

const dotenv = require('dotenv')
dotenv.config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/v1/products', adminRoutes)
app.use('/v1/shop', shopRoutes)
app.use('/v1/auth', userRoutes)

app.use(error404)

Order.belongsToMany(Product, { through: { model: OrderItem, unique: false } })

sequelize
    .sync()
    .then(() => {
        app.listen(process.env.PORT)
    })
    .catch((err) => {
        console.log(err)
    })
