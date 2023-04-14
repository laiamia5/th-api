const {Router} = require('express')
const mercadopago = require('mercadopago')
const { compra, usuario, producto } = require('../db')
require('dotenv').config()

const payRouter = Router()
let token = process.env.ACCES_TOKEN_MP

payRouter.post('/', async (req, res) => {
    
    mercadopago.configure({
        access_token: token
    })
    let preferenceId;

    //declaro la preferencia
    let preference = {
        items: [
            {
                title: "Dummy Item",
                description: "Multicolor Item",
                currency_id: "$",
                quantity: 1,
                unit_price: 10
            }
        ],
        back_urls: {
			"success": "http://localhost:3001/pagar/feedback",
			"failure": "http://localhost:3001/pagar/feedback",
			"pending": "http://localhost:3001/pagar/feedback"
		},
		auto_return: "approved",
    }

    //traigo todo de la BDD
    // let cliente = await compra.findAll({
    //     where: {usuarioId: "6f7b03c4-7d83-4114-9ab0-d8e1aedf621b"},
    //     include: [
    //         { model: usuario },
    //         { model: producto }
    //     ]
    // })

    //recorro para hacer llenar los datos de la preferencia
    // await cliente.forEach((co) => {
    //     preference.items.push({
    //         title: co.dataValues.producto.dataValues.nombre,
    //         quantity: co.dataValues.cantidad !== 0 ? co.dataValues.cantidad : 1,
    //         unit_price: co.dataValues.producto.dataValues.precio
    //     })
    // })

    //creo la prefencia
    await mercadopago.preferences.create(preference)
    .then((r) =>  {
        console.log(r.body)
        preferenceId = r.body.id
        res.status(200).send(preferenceId)
    }) 
    .catch((err) => console.log(err))

})

payRouter.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});


module.exports = payRouter