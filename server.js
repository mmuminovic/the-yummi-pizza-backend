const express = require('express')
const bodyParser = require('body-parser')

const sequelize = require('./database')
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

const shopRoutes = require('./routes/shop')
const adminRoutes = require('./routes/admin')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/v1/admin', adminRoutes)
app.use('/v1/shop', shopRoutes)

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem })

sequelize
    .sync()
    .then(() => {
        app.listen(5000)
    })
    .catch((err) => {
        console.log(err)
    })