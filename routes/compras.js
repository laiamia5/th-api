const {Router} = require('express')
const {usuario, compra, producto} = require('../db')

const routeCompras = Router()

routeCompras.post('/comprar', async (req, res) => {
    const {usuarioId, productoId, cantidad, direccion, envio } = req.body
    try{
        let pedido = await compra.create({
            cantidad: cantidad,
            direccion: direccion,
            envio: envio,
        })
        await pedido.setUsuario(usuarioId)
        await pedido.setProducto(productoId)
        res.status(200).json(pedido)

    }catch(err){
        res.status(400).json({message: err})
    }
})

routeCompras.get('/comprar', async (req, res) => {
    let jaja = await compra.findAll({
        include: [
            { model: usuario },
            { model: producto }
        ]})
    res.send(jaja)
})


module.exports = routeCompras
