require('./config/config');

const express = require('express');
// Using Node.js `require()`
const mongoose = require('mongoose');
 

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(require('./routers/usuarios'))

mongoose.connect(process.env.urlDB,
{userNewUrlOarser : true, useCreateIndex : true},(err, res)=>{
    if (err) throw err;
    console.log("Base de datos Online")
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});