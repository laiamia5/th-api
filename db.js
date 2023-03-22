const {Sequelize} = require('sequelize')
const product = require('./models/productos')
const celular = require('./models/celulares')
const user = require('./models/users')

const database = new Sequelize(`postgres://postgres:admin@localhost:5432/totalhogar`,  {logging: false} )

product(database)
celular(database)
user(database)


const { productos } = database.models
const { celulares } = database.models
const { users } = database.models

module.exports = {database, productos, celulares, users} 
