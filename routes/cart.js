const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');



  router.get('/addtocart/:id/:price/:name', (req, res, next) => {
 
    const cartId = req.user._id;
  
    const newproduct = {
      _id: req.params.id,
      price: req.params.price,
      name: req.params.name,
      quantity: 1,
    }
  
    cart.findById(cartId, (err, result) => {
      if (err) {
        console.log(err);
      }
      //no user cart
      if (!result) {
        const newcart = new cart({
          _id: cartId,
          totalquantity: 1,
          totalprice: parseInt(req.params.price, 10),
          selectedproduct: [newproduct],
        })
        newcart.save((err, doc) => {
          if (err) {
            console.log(err);
          } else {
            console.log(doc);
          }
        })
      }
      //cart user exists --> update
      if (result) {
        //get products is already exist in user cart and compare to new product
        let indexOfProduct = -1;
        for (var i = 0; i < result.selectedproduct.length; i++) {
          if (req.params.id === result.selectedproduct[i]._id) {
            indexOfProduct = i;
            break;
          }
        }
  
        //product exists
        if (indexOfProduct >= 0) {
          console.log(indexOfProduct);
          //update product
          result.selectedproduct[indexOfProduct].quantity = result.selectedproduct[indexOfProduct].quantity + 1;
  
          price = parseInt(result.selectedproduct[indexOfProduct].price);
          result.selectedproduct[indexOfProduct].price = price + parseInt(req.params.price);
  
  
          // update cart
          result.totalquantity = result.totalquantity + 1;
          result.totalprice = result.totalprice + parseInt(req.params.price, 10);
  
          cart.updateOne({ _id: cartId }, { $set: result }, (err, doc) => {
            if (err) {
              console.log(err)
            } else {
              console.log(doc);
  
            }
  
          })
        }
        //product not exists
        else {
          //update cart
          result.totalquantity = result.totalquantity + 1;
          result.totalprice = result.totalprice + parseInt(req.params.price, 10);
  
          //add new product
          result.selectedproduct.push(newproduct);
  
          cart.updateOne({ _id: cartId }, { $set: result }, (err, doc) => {
            if (err) {
              console.log(err)
            } else {
              console.log(doc);
  
            }
  
          })
  
        }
  
      }
  
    })
  })