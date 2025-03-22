'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const config = require('./config');

require('dotenv').config();

const app = express();

console.log(process.env.CONNECTIONSTRING)
//conecetando a base dados
mongoose.connect(process.env.CONNECTIONSTRING);

// carrega os models
const Product = require('./models/product');
const Cusromer = require('./models/customer');
const Order = require('./models/order');

// carrega as routas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const costumerRoute = require('./routes/costumer-route');
const orderRoute = require('./routes/order-route');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Habilita o CORS
app.use( function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-type, Accept, x-access-token');
    res.header('Access-Control-Allow-Origin', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.use('/', indexRoute);
app.use('/products', productRoute); // todas as rotas do product serao usadas apartir deste ponto
app.use('/costumers', costumerRoute);
app.use('/orders', orderRoute);

module.exports = app;