const express = require('express');
const bodyParser = require('body-parser');
const app = express();


require('dotenv').config()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const port = process.env.PORT || 3000;

//conexion a DB
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.fegsl.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('Base de datos conectada')) 
  .catch(e => console.log('error de conexión', e))

//plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')


app.use(express.static(__dirname + "/public"));

//router
app.use('/', require('./router/Router'));
app.use('/blog', require('./router/Blog'));

app.use((req, res, next) => {
    res.status(404).render("404")
})


app.listen(3000, () => {
    console.log('Servidor a su servicio en el puerto', port)
})

