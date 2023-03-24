const routerDash = require('express').Router()
const jwt = require('jsonwebtoken')

routerDash.get('/', (req, res, next) => {
   
    const token = req.header('auth-token')

    if( !token ){
        res.status(401).send('error! acceso denegado')
        return 
    }
    try{
        const verificar = jwt.verify(token, process.env.SECRET_TOKEN )
        res.status(200).send(verificar)
    }catch(err){
        // const verificar = jwt.verify(token, process.env.SECRET_TOKEN )
        res.status(400).send('token invalido')
    }

})

module.exports = routerDash