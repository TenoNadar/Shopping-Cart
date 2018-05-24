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
     product.save().then(result => {
         console.log(result);
         res.status(200).json({
            message:'Handling POST request',
            createdProduct: product
        });
     })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });   
});

router.get('/:productId',(req , res , next) => {
    const id = req.params.productId;
    Product.findById(id).exec().then(
        doc => {
            console.log(doc);
          if(doc) {
              res.status(500).json(doc);
          } else{
              res.status(404).json({
                  message:'no valid Id'
              })
          }
            
        }
    ).catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        });
    });
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