const express = require('express')
const {database} = require('./db')
const route = require('./routes/products')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

const app = express()


app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser('es un secretoooo tu mirada y la mia un presentimiento'))
app.use(session({
  secret: 'es un secretoooo tu mirada y la mia un presentimiento',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/', route )

database
.sync({alter: true})
.then(() => {
    app.listen(3001, () => {
      console.log('se esta escuchando todo bien'); 
    });
  });
  