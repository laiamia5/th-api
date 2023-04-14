const express = require('express')
const {database} = require('./db')
const route = require('./routes/products')
const routesUser = require('./routes/users')
const bodyParser = require('body-parser')
const routeCompras = require('./routes/compras')
const payRouter = require('./routes/mp')
const cors = require("cors");

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());
// app.use((req, res, next) => {
//   const allowedOrigins = ['http://localhost:3000', 'https://www.mercadopago.com.ar']
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader('Access-Control-Allow-Origin', origin);
//   }
//   // res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
// });

app.use('/productos', route )
app.use('/usuarios', routesUser )
app.use('/carrito', routeCompras)
app.use('/pagar', payRouter)

database
.sync({alter: true})
.then(() => {
    app.listen(3001, () => {
      console.log('se esta escuchando todo bien'); 
    });
});
  