const {Router} = require('express')
const mercadopago = require('mercadopago')
require('dotenv').config()

const payRouter = Router()
let usuarioDB = process.env.ACCES_TOKEN_MP


module.exports = payRouter