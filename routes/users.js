const {Router} = require('express')
const {productos} = require('../db')
const {users} = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

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

 //------------------------------------------LOGEAR USUARIO--------------------------------------------------

 routesUser.post('/signin', async (req, res) => {
    
    const {email, contraseña} = req.body
    //---------buscar email en BDs----------------------
    const usuario_ingresante = await users.findOne({ where: { email: email }})
    if(usuario_ingresante == null) {
        res.status(400).send("el email ingresado no existe, revise nuevamente o cree un usuario")
        return 
    }
    //--------comparar contraseñas----------------------
    const comparar = await bcrypt.compare(contraseña, usuario_ingresante.contraseña)
    if(comparar == false){ 
        res.status(401).send('la contraseña que has escrito no es correcta, vuelve a intentarlo')
        return
    }
    //--------creacion del token-------------------------------------------
    const info = {
        id : usuario_ingresante.id,
        name: usuario_ingresante.nombre
    }
    const token = jwt.sign(info, process.env.SECRET_TOKEN)

    res.status(200).json({...usuario_ingresante.dataValues, token})

})

//--------------------------CONTROLLER QUE VERIFICA EL TOKEN--------------------------------

const verifyToken = (req, res, next) => {
    const authheader = req.headers['authorization']

    const token = authheader && authheader.split(' ')[1];
    console.log(authheader)

    if(token == null) return res.status(401).send('token requerido')

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {

        if(err) return res.status(403).send('token invalido')

        console.log(user)
        req.user = user
        next();
    })
    
}

// -----------------------------OBTENER PERFIL DE USUARIO------------------------------

routesUser.get('/profile', verifyToken, async (req, res) => { 

    let idusuario = req.user.id
    try{
        let usuario = await users.findByPk(idusuario)
        res.send(usuario)
    }catch(err){
        res.status(401).send('error de acceso')
    }

})



module.exports = routesUser