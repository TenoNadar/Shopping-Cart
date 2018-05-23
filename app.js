const express = require('express');

const app = express();

const productRoutes = require('./API/routes/products');
const orderRoutes = require('./API/routes/order');


app.use('/products', productRoutes);
app.use('/orders', orderRoutes );


 module.exports = app;