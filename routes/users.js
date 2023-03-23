const {Router} = require('express')
const {productos} = require('../db')
const {users} = require('../db')
const bcrypt = require('bcrypt')

const routesUser = Router()


// ---------------------------------------OBTENER TODOS LOS USUARIOS--------------------------------------

routesUser.get('/', async (req, res) => {
    try{
        let data = await users.findAll()
        res.status(200).json(data)
    }
    catch(err){
        res.status(400).send('no')
    }
})

//--------------------------------------------CREAR USUARIO---------------------------------------------------------

routesUser.post('/signup', async (req, res) => {

    const {nombre, apellido, email, contraseña} = req.body

    const usuario_ingresante = await users.findOne({ where: { email }})

    try{
        const hash = await bcrypt.hash(contraseña, 10)

        if(usuario_ingresante == null){
            await users.create({
                nombre: nombre,
                apellido: apellido,
                email: email,
                contraseña: hash,
             })
             res.status(200).send('se ha creado el usuario exitosamente')
        }else{
            res.status(400).send('error! el usuario ya existe, inicia sesion con el mismo o crea una cuenta diferente')
        }
    }catch(err){
         res.status(400).send('error! catch')
    }

 })

 //------------------------------------------OBTENER USUARIO--------------------------------------------------

 routesUser.get('/signin', async (req, res) => {
    const {email, contraseña} = req.body
    //---------buscar email en BDs----------------------
    const usuario_ingresante = await users.findOne({ where: { email }})
    if(usuario_ingresante == null) res.status(400).send("el email ingresado no existe, revise nuevamente o cree un usuario")

    //--------comparar contraseñas----------------------
    const comparar = await bcrypt.compare(contraseña, usuario_ingresante.contraseña)
    if(comparar == false) res.status(400).send('la contraseña que has escrito no es correcta, vuelve a intentarlo')

    res.status(200).json(usuario_ingresante)
 })



module.exports = routesUser