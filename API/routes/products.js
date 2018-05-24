const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');
const Product = require('../models/products')
router.get('/',(req , res , next) =>{
    res.status(200).json({
        message:'Handling GET request'
    });
});

router.post('/',(req , res , next) =>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price:req.body.price
    });
     product.save().exec()
    
    res.status(200).json({
        message:'Handling POST request',
        createdProduct: product
    });
});

router.get('/:productId',(req , res , next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
           message:'You discovered a new ID',
           id: id
        });
    }else{
        res.status(200).json({
            message:'You passed a ID'
        });
    }
});

router.patch('/:productId',(req , res , next) => {
    res.status(200).json({
        message:'Updated Product'
    });
});

router.delete('/:productId',(req , res , next) => {
   res.status(200).json({
       message:'Delete product'
   });
});
module.exports = router;