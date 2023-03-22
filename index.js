const express = require('express')
const {database} = require('./db')
const route = require('./routes/products')
const routesUser = require('./routes/users')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/products', route )
app.use('/users', routesUser )

database
.sync({alter: true})
.then(() => {
    app.listen(3001, () => {
      console.log('se esta escuchando todo bien'); 
    });
  });
  