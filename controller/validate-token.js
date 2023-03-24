// const jwt = require('jsonwebtoken')
// require('dotenv').config()


// const verificarToken = (req, res, next) => {

//     // const token = req.header('auth-token')
//     const token = req.body

//     if( !token ){
//         res.status(401).send('error! acceso denegado')
//         return 
//     }

//     try{
//         const verificar = jwt.verify(token, process.env.SECRET_TOKEN )
//         res.status(200).send(verificar)
//     }catch(err){
//         res.status(400).send('token invalido')
//     }
    
// }

// module.exports = verificarToken