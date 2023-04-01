const {Sequelize} = require('sequelize')
const product = require('./models/productos')
const celular = require('./models/celulares')
const user = require('./models/users')
require('dotenv').config()

let usuario = process.env.DB_USER
let contraseña = process.env.DB_PASSWORD
let host = process.env.DB_HOST

const database = new Sequelize(`postgres://${usuario}:${contraseña}@${host}/totalhogar`,  {logging: false} )

product(database)
celular(database)
user(database)


const { productos } = database.models
const { celulares } = database.models
const { users } = database.models

users.belongsToMany(productos, {through: "carrito"})
productos.belongsToMany(users, {through: "carrito"})


module.exports = {database, productos, celulares, users} 
