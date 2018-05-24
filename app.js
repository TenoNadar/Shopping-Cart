const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const productRoutes = require('./API/routes/products');
const orderRoutes = require('./API/routes/order');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req , res , next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With,Content-Type,Accept,Authorization');

   if(req.method === 'OPTIONS'){
       res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,PATCH,DELETE');
       res.status(200).json({});
   }
   next();
})

app.use('/products', productRoutes);
app.use('/orders', orderRoutes );


app.use((req , res , next) => {
    const error = new Error('Hi hello');
    error.status = 404;
    next(error); 
})

app.use((error,req , res , next) => {
    
    res.status(error.status || 500);
    res.json({
        error:{
           message:error.message 
        }
    });
     
});

 module.exports = app;