const {Router} = require('express')
const { producto } = require('../db')

const route = Router()

//------------------------------------------TODOS LOS PRODUCTOS------------------------------------
route.get('/', async (req, res) => {
    try{
        let data = await producto.findAll()
        res.status(200).json(data)
    }
    catch(err){
        res.status(400).send('no')
    }
})

//------------------------------------------TODOS LOS PRODUCTOS------------------------------------

route.get('/:id', async (req, res) => {
    const {id} = req.params
    try{
        let data = await producto.findOne({where: {id}})
        res.status(200).json(data)
    }
    catch(err){
        res.status(400).send('no')
    }
})

//----------------------------------------CREAR PRODUCTOS---------------------------------------
route.post('/', async (req, res) => {
   const {nombre, precio, descripcion, categoria, marca, stock, img} = req.body

   try{
        let nuevoProd = await producto.create({
            nombre: nombre,
            precio: precio,
            descripcion: descripcion,
            categoria: categoria,
            marca: marca,
            stock: stock,
            img: img
        })
        res.status(200).send('se ha creado el producto exitosamente')
   }catch(err){
        res.status(400).send('cago')
   }
})

//-----------------------------------ELIMINAR PRODUCTOS---------------------------------------

route.delete('/:id', async (req, res) => {
    const {id} = req.params
    producto.destroy({
        where:{
            id: id
        }
    })
    try{
        res.status(200).send('borrado exitoso')
    }catch(err){
        res.status(400).send(err)
    }
})



module.exports = route