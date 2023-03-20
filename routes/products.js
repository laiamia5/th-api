const {Router} = require('express')
const route = Router()
const {productos} = require('../db')

//------------------------------------------TODOS LOS PRODUCTOS------------------------------------
route.get('/', async (req, res) => {
    try{
        let data = await productos.findAll()
        res.status(200).json(data)
    }
    catch(err){
        res.status(400).send('no')
    }
})

//----------------------------------------CREAR PRODUCTOS---------------------------------------
route.post('/', async (req, res) => {
   const {nombre, precio, descripcion, categoria, marca, stock} = req.body

   try{
        let nuevoProd = await productos.create({
            nombre: nombre,
            precio: precio,
            descripcion: descripcion,
            categoria: categoria,
            marca: marca,
            stock: stock
        })
        res.status(200).send('se ha creado el producto exitosamente')
   }catch(err){
        res.status(400).send('cago')
   }
})

//-----------------------------------FILTRAR PRODUCTOS---------------------------------------

module.exports = route